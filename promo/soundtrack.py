"""Synthesises the promo soundtrack (music bed + UI sound design) as promo/soundtrack.wav.

Pure standard library so it runs anywhere: python3 promo/soundtrack.py
Cue times mirror the CLICKS / scene timings in index.html.
"""
import math
import os
import random
import struct
import wave

SR = 44100
DUR = 20.0
N = int(SR * DUR)
BEAT = 0.5  # 120 bpm
L = [0.0] * N
R = [0.0] * N
rnd = random.Random(7)


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def add(start, samples, pan=0.0, gain=1.0):
    i0 = int(start * SR)
    gl, gr = gain * math.cos((pan + 1) * math.pi / 4), gain * math.sin((pan + 1) * math.pi / 4)
    for j, v in enumerate(samples):
        i = i0 + j
        if 0 <= i < N:
            L[i] += v * gl
            R[i] += v * gr


def tone(freq, dur, attack, decay, harmonics=((1, 1.0),), detune=0.0):
    n = int(dur * SR)
    out = [0.0] * n
    tau = 2 * math.pi / SR
    for j in range(n):
        t = j / SR
        env = min(1.0, t / attack) if attack else 1.0
        env *= math.exp(-t / decay) if decay else 1.0
        env *= min(1.0, (dur - t) / 0.08)  # release to avoid clicks
        v = 0.0
        for h, a in harmonics:
            v += a * math.sin(tau * freq * h * j)
            if detune:
                v += a * math.sin(tau * freq * h * (1 + detune) * j)
        out[j] = v * env
    return out


# Chord progression, one chord per 2 bars (4 s): Fmaj9, Am7, Dm9, Bbmaj7, Fmaj9 (resolve on end card)
CHORDS = [
    [53, 60, 64, 67, 69],
    [57, 60, 64, 67, 71],
    [50, 57, 60, 64, 65],
    [46, 57, 62, 65, 69],
    [53, 60, 64, 67, 69],
]

for c, notes in enumerate(CHORDS):
    start = c * 4.0
    dur = 4.6 if c < 4 else 4.0
    # Warm pad (upper voices)
    for k, n in enumerate(notes[1:]):
        pad = tone(midi(n), dur, 0.9, 0, harmonics=((1, 1.0), (2, 0.18), (3, 0.05)), detune=0.003)
        add(start, pad, pan=(-0.5 + k / 3), gain=0.035)
    # Sub bass on each beat, entering at 5 s
    for b in range(8):
        tb = start + b * BEAT
        if tb >= 5.0 and tb < 19.0:
            add(tb, tone(midi(notes[0] - 12), 0.45, 0.005, 0.18, harmonics=((1, 1.0), (2, 0.25))), gain=0.22)
    # Pluck arpeggio on 8ths
    arp = [notes[1] + 12, notes[2] + 12, notes[3] + 12, notes[4] + 12, notes[3] + 12, notes[2] + 12, notes[4] + 12, notes[1] + 24]
    for s in range(16):
        ts = start + s * BEAT / 2
        if ts < 19.0:
            vel = 0.05 if ts < 5.0 else 0.075
            add(ts, tone(midi(arp[s % 8]), 0.4, 0.003, 0.09, harmonics=((1, 1.0), (2, 0.3), (4, 0.08))), pan=(0.35 if s % 2 else -0.35), gain=vel)


def kick():
    n = int(0.35 * SR)
    out, ph = [], 0.0
    for j in range(n):
        t = j / SR
        f = 45 + 110 * math.exp(-t / 0.03)
        ph += 2 * math.pi * f / SR
        out.append(math.sin(ph) * math.exp(-t / 0.12))
    return out


def noise_burst(dur, decay, lp=0.5):
    n = int(dur * SR)
    out, y = [], 0.0
    for j in range(n):
        x = rnd.uniform(-1, 1)
        y = x - lp * y  # simple high-pass-ish tilt
        out.append(y * math.exp(-(j / SR) / decay))
    return out


# Drums from 5 s (kick on 1 & 3), hats on off-beats from 9.6 s
K = kick()
t = 5.0
while t < 19.0:
    add(t, K, gain=0.32)
    t += BEAT * 2
t = 9.75
while t < 19.0:
    add(t, noise_burst(0.06, 0.012, 0.9), pan=0.2, gain=0.05)
    t += BEAT


# UI clicks synced to the cursor in index.html
def click():
    n = int(0.05 * SR)
    return [(math.sin(2 * math.pi * 2400 * j / SR) * 0.6 + rnd.uniform(-0.4, 0.4)) * math.exp(-(j / SR) / 0.008) for j in range(n)]


for ct in [1.0, 1.7, 2.4, 6.05, 8.55, 18.9]:
    add(ct - 0.01, click(), gain=0.28)
# Toggle "snap", slider tick, heart "pop"
add(6.2, tone(1320, 0.12, 0.002, 0.03), gain=0.12)
for i in range(9):
    add(7.1 + i * 0.09, tone(3000, 0.03, 0.001, 0.006), gain=0.06)
add(8.58, tone(880, 0.3, 0.002, 0.08, harmonics=((1, 1.0), (1.5, 0.5))), gain=0.12)
add(8.62, tone(1320, 0.3, 0.002, 0.08), gain=0.08)


# Whooshes into each scene transition (filtered noise swell)
def whoosh(dur):
    n = int(dur * SR)
    out, y = [], 0.0
    for j in range(n):
        k = j / n
        a = 0.02 + 0.25 * math.sin(math.pi * k)  # filter opens then closes
        y += a * (rnd.uniform(-1, 1) - y)
        out.append(y * math.sin(math.pi * k) ** 2)
    return out


for wt in [4.75, 9.2, 13.2, 16.85]:
    add(wt, whoosh(0.7), gain=0.9)

# End-card shimmer
add(17.4, tone(midi(81), 2.4, 0.4, 1.2, detune=0.004), gain=0.05)
add(17.4, tone(midi(88), 2.4, 0.5, 1.2, detune=0.004), gain=0.03)

# Master: fade-in, fade-out, soft clip, normalise
peak = 0.0
for i in range(N):
    t = i / SR
    g = min(1.0, t / 0.3) * min(1.0, (DUR - t) / 1.0)
    L[i] = math.tanh(L[i] * g * 1.2)
    R[i] = math.tanh(R[i] * g * 1.2)
    peak = max(peak, abs(L[i]), abs(R[i]))
scale = 0.89 / peak

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "soundtrack.wav")
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(b"".join(struct.pack("<hh", int(L[i] * scale * 32767), int(R[i] * scale * 32767)) for i in range(N)))
print(out)
