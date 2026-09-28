"""Builds the TVOnair+ bootup animation as a Lottie (Bodymovin) JSON file.

Every value here comes from measurements of the original MP4 (see data/*.json,
produced frame-by-frame at 30 fps): stroke geometry fitted to the logo, per-frame
draw-on lengths, bounce / squash-and-stretch transforms, letter slide + fade,
comet and spark shapes, the "+" pop and the final slow zoom-out.

    python3 tvonair-lottie/build.py   ->  tvonair-lottie/tvonair-plus-bootup.json
"""
import json
import math
import os

HERE = os.path.dirname(os.path.abspath(__file__))
D = lambda name: json.load(open(os.path.join(HERE, "data", name)))

FPS, FRAMES, W, H = 30, 150, 1080, 1920
TOTAL = 304.28  # length of each icon stroke path (px)

# ---------------------------------------------------------------- colours
def rgb(r, g, b):
    return [round(r / 255, 4), round(g / 255, 4), round(b / 255, 4)]

WHITE = rgb(255, 255, 255)
YELLOW = rgb(249, 211, 8)
BLUE = rgb(87, 88, 208)
PURPLE_LIGHT = rgb(148, 0, 198)
PURPLE_DARK = rgb(102, 0, 170)
HILITE_DARK = rgb(124, 27, 185)  # thin centre line on the TV body, in the dark / light zones
HILITE_LIGHT = rgb(167, 6, 213)

# World-space radial gradient the purple strokes sit in (fitted: centre, full-light radius, falloff edge)
GRAD_C, GRAD_R0, GRAD_R1 = (578.84, 227.42), 704.85, 802.52

# ---------------------------------------------------------------- keyframe helpers
SHIFT = 1  # measurements use the MP4's 1-based frame numbers; Lottie frames are 0-based
LIN = {"i": {"x": [1], "y": [1]}, "o": {"x": [0], "y": [0]}}


def static(v):
    return {"a": 0, "k": v}


def anim(keys, hold=False):
    """keys: list of (frame, value). Linear between consecutive keys (data is per-frame)."""
    keys = sorted(keys, key=lambda k: k[0])
    if len(keys) == 1:
        return static(keys[0][1])
    out = []
    for n, (t, v) in enumerate(keys):
        k = {"t": t - SHIFT, "s": v if isinstance(v, list) else [v]}
        if n < len(keys) - 1:
            if hold:
                k["h"] = 1
            else:
                k.update(LIN)
        out.append(k)
    return {"a": 1, "k": out}


def shape_anim(keys):
    out = []
    for n, (t, shp) in enumerate(keys):
        k = {"t": t - SHIFT, "s": [shp]}
        if n < len(keys) - 1:
            k.update(LIN)
        out.append(k)
    return {"a": 1, "k": out}


def tr():
    return {"ty": "tr", "p": static([0, 0]), "a": static([0, 0]), "s": static([100, 100]),
            "r": static(0), "o": static(100), "sk": static(0), "sa": static(0), "nm": "Transform"}


def group(name, items):
    return {"ty": "gr", "nm": name, "it": items + [tr()]}


def path(v, closed=False, i=None, o=None):
    return {"c": closed, "v": [[round(x, 3), round(y, 3)] for x, y in v],
            "i": i or [[0, 0]] * len(v), "o": o or [[0, 0]] * len(v)}


def sh(p):
    return {"ty": "sh", "nm": "Path", "ks": p if "a" in p else static(p)}


def stroke(color, width, opacity=100):
    return {"ty": "st", "nm": "Stroke", "c": static(color + [1]), "o": static(opacity),
            "w": static(width), "lc": 2, "lj": 2, "ml": 4}


def fill(color, opacity=100, rule=2):
    return {"ty": "fl", "nm": "Fill", "c": static(color + [1]), "o": opacity if isinstance(opacity, dict) else static(opacity), "r": rule}


def trim(s, e):
    return {"ty": "tm", "nm": "Trim", "s": s if isinstance(s, dict) else static(s),
            "e": e if isinstance(e, dict) else static(e), "o": static(0), "m": 1}


def ks(p=(0, 0), a=(0, 0), s=(100, 100, 100), o=100):
    f = lambda v: v if isinstance(v, dict) else static(list(v) + [0] if len(v) == 2 else list(v))
    return {"o": o if isinstance(o, dict) else static(o), "r": static(0), "p": f(p), "a": f(a), "s": f(s)}


LAYERS = []


def layer(name, shapes, ind, parent=None, ip=0, op=FRAMES, transform=None, ty=4):
    L = {"ddd": 0, "ind": ind, "ty": ty, "nm": name, "sr": 1, "ks": transform or ks(), "ao": 0,
         "ip": max(ip - SHIFT, 0), "op": FRAMES if op == FRAMES else op - SHIFT, "st": 0, "bm": 0}
    if ty == 4:
        L["shapes"] = shapes
    if parent:
        L["parent"] = parent
    LAYERS.append(L)
    return L


# ---------------------------------------------------------------- icon geometry (fitted)
P = D("icon_params.json")
ax, ay, th, hw, yb, rb, rs, SW, LA, LB = P


def arcpts(cx, cy, R, a0, a1, n=16):
    return [(cx + R * math.cos(a0 + (a1 - a0) * k / n), cy + R * math.sin(a0 + (a1 - a0) * k / n)) for k in range(n + 1)]


def half(sgn):
    d = (math.cos(th), math.sin(th))
    t = hw / d[0]
    shy = ay + t * d[1]
    v1 = (sgn * d[0], d[1])
    ang = math.acos(max(-1, min(1, v1[1])))
    tl = rs * math.tan(ang / 2)
    shx = ax + sgn * hw
    p1 = (shx - v1[0] * tl, shy - v1[1] * tl)
    p2 = (shx, shy + tl)
    cxf, cyf = shx - sgn * rs, p2[1]
    a0 = math.atan2(p1[1] - cyf, p1[0] - cxf)
    a1 = math.atan2(p2[1] - cyf, p2[0] - cxf)
    if sgn > 0 and a1 < a0:
        a1 += 2 * math.pi
    if sgn < 0 and a1 > a0:
        a1 -= 2 * math.pi
    pts = [(ax, ay), p1] + arcpts(cxf, cyf, rs, a0, a1)[1:]
    pts.append((shx, yb - rb))
    cxb, cyb = shx - sgn * rb, yb - rb
    pts += (arcpts(cxb, cyb, rb, 0, math.pi / 2) if sgn > 0 else arcpts(cxb, cyb, rb, math.pi, math.pi / 2))[1:]
    pts.append((ax, yb))
    return pts


d0 = (math.cos(th), math.sin(th))
TIP_A = (ax - d0[0] * LA, ay - d0[1] * LA)
TIP_B = (ax + d0[0] * LB, ay - d0[1] * LB)
PATH_A = [TIP_A] + half(1)
PATH_B = [TIP_B] + half(-1)
APEX_PCT = LA / TOTAL * 100
ANCHOR = (293.0, 1069.5)  # icon bottom-centre, scale/squash pivot

# ---------------------------------------------------------------- measured animation data
draw = D("draw_fit.json")
xf = D("xform.json")
zoom = D("zoom.json")


def icon_xform(f):
    """(dx, dy, sx, sy) of the icon for frame f (ref = static logo position)."""
    if f <= 2:
        return 241.1, 64.8, 1, 1
    if f < 19:
        p = draw[str(f)]
        return p[2], p[3], p[4], p[4]
    if f <= 79:
        dx, dy, sx, sy = xf[str(f)]
        if f >= 46:
            dy = 0.0
            sx, sy = (1, 1) if f >= 47 else (sx, sy)
        if f >= 70:
            dx = 0.0
        return dx, dy, sx, sy
    return 0.0, 0.0, 1, 1


def icon_rot(f):
    """Early antenna frames rotate into place (degrees, about the icon anchor)."""
    return draw[str(f)][5] if 3 <= f < 19 else 0.0


def zoom_s(f):
    return 1.0 if f < 106 else zoom[str(min(f, 150))]


def draw_len(f):
    if f <= 2:
        return 0.0, 0.0
    if f >= 19:
        return TOTAL, TOTAL
    p = draw[str(f)]
    return min(p[0], TOTAL), min(p[1], TOTAL)


# ---------------------------------------------------------------- layer: ZOOM null (whole logo)
IND = {"zoom": 1, "icon": 2}
layer("ZOOM", None, IND["zoom"], ty=3, transform=ks(
    p=(540, 960), a=(540, 960),
    s=anim([(f, [zoom_s(f) * 100] * 2 + [100]) for f in range(105, 151)])))

# ---------------------------------------------------------------- layer: ICON null (bounce, squash, slide)
layer("ICON", None, IND["icon"], parent=IND["zoom"], ty=3, transform=ks(
    a=ANCHOR,
    p=anim([(f, [ANCHOR[0] + icon_xform(f)[0], ANCHOR[1] + icon_xform(f)[1], 0]) for f in range(2, 81)]),
    s=anim([(f, [icon_xform(f)[2] * 100, icon_xform(f)[3] * 100, 100]) for f in range(2, 81)])))
LAYERS[-1]["ks"]["r"] = anim([(f, round(icon_rot(f), 3)) for f in range(2, 11)])

# ---------------------------------------------------------------- world-fixed radial gradient, expressed in icon space per frame
def world_to_local(f, wx, wy):
    z = zoom_s(f)
    qx, qy = 540 + (wx - 540) / z, 960 + (wy - 960) / z
    dx, dy, sx, sy = icon_xform(f)
    vx, vy = qx - ANCHOR[0] - dx, qy - ANCHOR[1] - dy
    c, s = math.cos(math.radians(-icon_rot(f))), math.sin(math.radians(-icon_rot(f)))
    vx, vy = c * vx - s * vy, s * vx + c * vy
    return ANCHOR[0] + vx / sx, ANCHOR[1] + vy / sy


def grad_points():
    s_keys, e_keys = [], []
    for f in range(0, 151):
        c = world_to_local(f, *GRAD_C)
        dx, dy, sx, sy = icon_xform(f)
        r = GRAD_R1 / (zoom_s(f) * (sx + sy) / 2)
        s_keys.append((f, [round(c[0], 2), round(c[1], 2)]))
        e_keys.append((f, [round(c[0], 2), round(c[1] + r, 2)]))
    return anim(s_keys), anim(e_keys)


GS, GE = grad_points()
k0 = GRAD_R0 / GRAD_R1


def radial_purple(width, light=PURPLE_LIGHT, dark=PURPLE_DARK, opacity=None, name="Purple (world radial)"):
    return {"ty": "gs", "nm": name, "o": opacity or static(100), "w": static(width),
            "g": {"p": 3, "k": static([0] + light + [round(k0, 4)] + light + [1] + dark)},
            "s": GS, "e": GE, "t": 2, "h": static(0), "a": static(0), "lc": 2, "lj": 2, "ml": 4}


def blue_overlay(width):
    # Blue tint on stroke A, fading out along the antenna/roof (alpha measured from the green channel)
    ux, uy = d0
    s = (TIP_A[0] + ux * 30, TIP_A[1] + uy * 30)
    e = (TIP_A[0] + ux * 132, TIP_A[1] + uy * 132)
    return {"ty": "gs", "nm": "Blue tint", "o": static(100), "w": static(width),
            "g": {"p": 2, "k": static([0] + BLUE + [1] + BLUE + [0, 1, 1, 0])},
            "s": static([round(s[0], 2), round(s[1], 2)]), "e": static([round(e[0], 2), round(e[1], 2)]),
            "t": 1, "h": static(0), "a": static(0), "lc": 2, "lj": 2, "ml": 4}


def pct_keys(which):
    keys = []
    for f in range(2, 20):
        a, b = draw_len(f)
        keys.append((f, round((a if which == "A" else b) / TOTAL * 100, 3)))
    return keys


END_A, END_B = anim(pct_keys("A")), anim(pct_keys("B"))
HL_START = APEX_PCT + 3
HL_END_A = anim([(f, max(v, HL_START)) for f, v in pct_keys("A")])
HL_END_B = anim([(f, max(v, HL_START)) for f, v in pct_keys("B")])


def stroke_group(name, pts, end, hl_end, blue):
    items = [
        group("Highlight", [sh(path(pts)), trim(HL_START, hl_end),
                            radial_purple(2.6, HILITE_LIGHT, HILITE_DARK, anim([(17, 0), (20, 100)]), "Highlight")]),
    ]
    if blue:
        items.append(group("Blue", [sh(path(pts)), trim(0, end), blue_overlay(SW)]))
    items.append(group("Purple", [sh(path(pts)), trim(0, end), radial_purple(SW)]))
    return items


# ---------------------------------------------------------------- icon children (top to bottom)
g = D("glyphs.json")


def glyph_shapes(name):
    return [sh(path([tuple(v) for v in p["v"]], True, p["i"], p["o"])) for p in g[name]]


TV_ANCHOR = (292.0, 1024.5)
TV_SCALE = {35: 0, 36: 18.5, 37: 38.5, 38: 58.5, 39: 78.9, 40: 99.5, 41: 101.2, 42: 104.2, 43: 104.3, 44: 104.6,
            45: 103.1, 46: 102.1, 47: 101.4, 48: 100.6, 49: 100}
layer("TV", [group("TV", glyph_shapes("TV") + [fill(WHITE)])], 3, parent=IND["icon"], ip=36,
      transform=ks(p=TV_ANCHOR, a=TV_ANCHOR, s=anim([(f, [v, v, 100]) for f, v in TV_SCALE.items()])))

layer("Flash", [group("A", [sh(path(PATH_A)), stroke(WHITE, SW)]),
                group("B", [sh(path(PATH_B)), stroke(WHITE, SW)])], 4, parent=IND["icon"], ip=39, op=42)

layer("Stroke A", stroke_group("A", PATH_A, END_A, HL_END_A, True), 5, parent=IND["icon"], ip=2)

layer("Yellow tip", [group("Tip", [sh(path(PATH_B)), trim(0, APEX_PCT), stroke(YELLOW, SW)])], 6,
      parent=IND["icon"], ip=42)

layer("Stroke B", stroke_group("B", PATH_B, END_B, HL_END_B, False), 7, parent=IND["icon"], ip=2)

# ---------------------------------------------------------------- "onair" letters: staggered slide-in + fade
letters = D("letters.json")
for n, ch in enumerate("onair"):
    start = 50 + 4 * n
    data = letters[ch]
    pos, op = [], []
    first = data[str(start)]
    pos.append((start - 1, [round(first[0] * 1.2, 2), 0, 0]))
    op.append((start - 1, 0))
    for f in range(start, 108):
        dx, br, _ = data[str(f)]
        pos.append((f, [dx, 0, 0]))
        op.append((f, round(min(br, 1.0) * 100, 1)))
        if dx == 0 and br >= 0.995:
            break
    layer(f"Letter {ch}", [group(ch, glyph_shapes(ch) + [fill(WHITE)])], 10 + n, parent=IND["zoom"],
          ip=start - 1, transform=ks(p=anim(pos), o=anim(op)))

# ---------------------------------------------------------------- teardrop builder (comet + spark)
def teardrop(head, direction, r, L, n=10, cap=8):
    """Closed outline: round head of radius r at `head`, tail of length L behind it along `direction` (unit)."""
    hx, hy = head
    ux, uy = direction
    nx, ny = -uy, ux
    tail_len = max(L, 0.01)
    left, right = [], []
    for k in range(n + 1):
        u = k / n  # 0 = tail tip, 1 = head centre
        w = r * u ** 0.9
        cx, cy = hx - ux * tail_len * (1 - u), hy - uy * tail_len * (1 - u)
        left.append((cx + nx * w, cy + ny * w))
        right.append((cx - nx * w, cy - ny * w))
    base = math.atan2(ny, nx)
    arc = [(hx + r * math.cos(base - math.pi * k / cap), hy + r * math.sin(base - math.pi * k / cap)) for k in range(1, cap)]
    return path(left + arc + right[::-1][:-1], True)


def curved_teardrop(traj, s_head, r, L, n=12, cap=8):
    """Teardrop whose tail follows the polyline `traj` (list of points, with cumulative lengths)."""
    pts, cum = traj

    def at(s):
        s = min(max(s, 0), cum[-1])
        for i in range(len(cum) - 1):
            if cum[i + 1] >= s:
                seg = cum[i + 1] - cum[i] or 1e-6
                f = (s - cum[i]) / seg
                x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f
                y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f
                dx, dy = pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]
                m = math.hypot(dx, dy) or 1
                return x, y, dx / m, dy / m
        return pts[-1][0], pts[-1][1], 0, 1

    tail = max(L, 0.01)
    left, right = [], []
    for k in range(n + 1):
        u = k / n
        x, y, dx, dy = at(s_head - tail * (1 - u))
        w = r * u ** 0.9
        left.append((x - dy * w, y + dx * w))
        right.append((x + dy * w, y - dx * w))
    hx, hy, ux, uy = at(s_head)
    base = math.atan2(ux, -uy)
    arc = [(hx + r * math.cos(base - math.pi * k / cap), hy + r * math.sin(base - math.pi * k / cap)) for k in range(1, cap)]
    return path(left + arc + right[::-1][:-1], True)


# ---------------------------------------------------------------- comet: from the antenna tip, arcing onto the "+"
comet = D("comet.json")
launch = (340.0, 846.0)
heads = [launch] + [tuple(comet[str(f)]["h"]) for f in range(77, 104)]
# Catmull-Rom smoothing of the head trajectory
smooth = []
for i in range(len(heads) - 1):
    p0 = heads[max(i - 1, 0)]; p1 = heads[i]; p2 = heads[i + 1]; p3 = heads[min(i + 2, len(heads) - 1)]
    for k in range(8):
        t = k / 8
        smooth.append(tuple(0.5 * ((2 * p1[j]) + (-p0[j] + p2[j]) * t + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * t * t
                                   + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * t ** 3) for j in (0, 1)))
smooth.append(heads[-1])
cum = [0.0]
for i in range(1, len(smooth)):
    cum.append(cum[-1] + math.dist(smooth[i - 1], smooth[i]))
head_s = {77 + i: cum[8 * (i + 1)] for i in range(27)}

comet_keys = []
for f in range(77, 104):
    c = comet[str(f)]
    comet_keys.append((f, curved_teardrop((smooth, cum), head_s[f], c["r"], max(c["L"], c["r"] + 0.5))))
layer("Comet", [group("Comet", [sh(shape_anim(comet_keys)), fill(WHITE, rule=1)])], 20, ip=77, op=104)

# ---------------------------------------------------------------- spark: rises inside the TV, becomes the dot, falls into "TV"
spark = D("spark.json")
sp_keys, sp_op = [], []
for f in range(21, 35):
    s = spark[str(f)]
    sp_keys.append((f, teardrop(tuple(s["h"]), (0, -1), max(s["r"], 2.45), max(s["L"], s["r"] + 0.4))))
    sp_op.append((f, round(min(s["peak"] / 255, 1) * 100, 1)))
layer("Spark", [group("Spark", [sh(shape_anim(sp_keys)), fill(WHITE, rule=1)])], 21, ip=21, op=35,
      transform=ks(o=anim(sp_op)))

# ---------------------------------------------------------------- "+": pops out oversized then settles (screen space)
plus = D("plus.json")
h_rect, v_rect = {"p": [], "s": []}, {"p": [], "s": []}
for f in range(103, 151):
    m = plus[str(f)]
    cx, cy = m["vcx"], m["hcy"]
    half_w = m["hx"][1] + 0.5 - cx
    h_rect["p"].append((f, [round(cx, 2), round(cy, 2)]))
    h_rect["s"].append((f, [round(2 * half_w, 2), round(m["hth"], 2)]))
    vy0, vy1 = m["vy"][0] - 0.5, m["vy"][1] + 0.5
    v_rect["p"].append((f, [round(cx, 2), round((vy0 + vy1) / 2, 2)]))
    v_rect["s"].append((f, [round(m["vth"], 2), round(vy1 - vy0, 2)]))
rect = lambda R: {"ty": "rc", "nm": "Rect", "d": 1, "p": anim(R["p"]), "s": anim(R["s"]), "r": static(2.5)}
layer("Plus", [group("Plus", [rect(h_rect), rect(v_rect), fill(WHITE, rule=1)])], 22, ip=103)

# ---------------------------------------------------------------- write
LAYERS.sort(key=lambda L: {1: 99, 2: 98}.get(L["ind"], 0))  # nulls at the bottom of the stack
order = ["Plus", "Comet", "Letter o", "Letter n", "Letter a", "Letter i", "Letter r",
         "TV", "Flash", "Stroke A", "Yellow tip", "Stroke B", "Spark", "ICON", "ZOOM"]
LAYERS.sort(key=lambda L: order.index(L["nm"]))
anim_json = {"v": "5.12.2", "fr": FPS, "ip": 0, "op": FRAMES, "w": W, "h": H, "nm": "TVOnair+ Bootup",
             "ddd": 0, "assets": [], "layers": LAYERS, "markers": []}
out = os.path.join(HERE, "tvonair-plus-bootup.json")
with open(out, "w") as fh:
    json.dump(anim_json, fh, separators=(",", ":"))
print(out, os.path.getsize(out) // 1024, "KB")

# Variant with the original's solid black background baked in
bg = {"ddd": 0, "ind": 99, "ty": 4, "nm": "Background", "sr": 1, "ks": ks(), "ao": 0, "ip": 0, "op": FRAMES, "st": 0, "bm": 0,
      "shapes": [group("BG", [{"ty": "rc", "nm": "Rect", "d": 1, "p": static([W / 2, H / 2]), "s": static([W, H]), "r": static(0)},
                              fill([0, 0, 0])])]}
anim_json["layers"] = LAYERS + [bg]
out_bg = os.path.join(HERE, "tvonair-plus-bootup-black-bg.json")
with open(out_bg, "w") as fh:
    json.dump(anim_json, fh, separators=(",", ":"))
print(out_bg, os.path.getsize(out_bg) // 1024, "KB")
