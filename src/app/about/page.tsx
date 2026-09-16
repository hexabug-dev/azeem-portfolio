import Reveal from "@/components/Reveal";

const skills = [
  "Product Design & Prototyping",
  "Motion design (AE & Lottie)",
  "Presentation Design",
  "UX Research & Testing",
  "HTML, CSS & Javascript",
  "Branding, visual identity design",
];

const tools = [
  "Figma",
  "Framer",
  "Photoshop",
  "Aftereffects",
  "ChatGPT & Generative AI Tools",
  "Visual Studio Code",
];

const experience = [
  {
    period: "Sept. 2017 - Present",
    company: "TAZ Creative",
    role: "UX & Design Lead",
    points: [
      "Spearheaded the UX design of an e-service web app for a Nigerian government MDA, leading to a streamlined application process, enhanced online engagement, and a significant boost in the department's revenue.",
      "Revamped the onboarding UX of AnyWorkX Africa to achieve 45% more completions in the first year of launch.",
      "0 to 500 member growth in my digital creator community, organizing virtual events and courses to support creative development.",
    ],
  },
  {
    period: "Aug. 2020 - Dec. 2023",
    company: "Prixon & DonTV.eu",
    role: "Interaction Designer (Smart TV Boxes)",
    points: [
      "Redesigned system UIs for Prixon's LINUX and ANDROID OTT boxes and overhauled the UX Design for the company's on-demand app, DonTV, resulting in lower churn rates on subscriptions and higher viewership over one year.",
    ],
  },
  {
    period: "Jan. 2020 - Jan. 2024",
    company: "Creat! Naija",
    role: "Head of Design & Media Director",
    points: [
      "40% savings on advert costs and 98% achievement of the seat reservation target for the AFEC 2022 Conference.",
      "Co-led a successful launch of VIVO Mobile's V27 Series and played a pivotal role in orchestrating the launch event for Nigeria's first Oracle® Exadata Cloud@Customer in collaboration with 21st Century Technologies.",
    ],
  },
];

const education = [
  {
    year: "2023",
    degree: "MSc. Human-Computer Interaction",
    school: "Tallinn University",
    detail:
      "Gaining proficiency in cutting-edge disciplines including design thinking, generative research, design fiction, and end-user computing. Drove knowledge dissemination by organizing Figma design workshops for fellow HCI practitioners.",
  },
  {
    year: "2020",
    degree: "BSc. Agric. Extension (Sociology & Communication)",
    school: "FUNAAB",
    detail:
      "Spearheaded a comprehensive Needs and Problem Assessment initiative employing the Pairwise Ranking Tool and demonstrated leadership as Batch Coordinator for my research team.",
  },
];

export const metadata = { title: "About — Azeem Gbadamosi" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Reveal>
        <p className="text-sm font-medium text-[var(--accent)]">
          Azeem Gbadamosi
        </p>
        <h1 className="mt-2 text-3xl font-bold md:text-5xl">
          Interaction Designer
        </h1>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 space-y-4 text-[var(--fg-muted)]">
        <p>
          I am a Visual and Interaction Designer with a successful history of
          turning ideas into captivating digital experiences in blockchain,
          fintech, retail, education, and entertainment industries. My
          expertise lies in engineering user-centered solutions for smart
          display systems, TV, web, and mobile platforms.
        </p>
        <p>
          My proficiency in using cutting-edge tools and technologies help me
          improve engagement and build trust with users through design.
          Currently pursuing an MSc. in Human-Computer Interaction and looking
          to incorporate advanced design thinking methodologies into your
          project.
        </p>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="text-xl font-bold md:text-2xl">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <h2 className="text-xl font-bold md:text-2xl">Tools</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tools.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-xl font-bold md:text-2xl">Experience</h2>
        </Reveal>
        <div className="mt-6 space-y-10">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.06} className="card p-6">
              <p className="text-xs text-[var(--fg-muted)]">{e.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{e.company}</h3>
              <p className="text-sm text-[var(--accent)]">{e.role}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--fg-muted)]">
                {e.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <Reveal>
          <h2 className="text-xl font-bold md:text-2xl">Education</h2>
        </Reveal>
        <div className="mt-6 space-y-8">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.06} className="card p-6">
              <p className="text-xs text-[var(--fg-muted)]">{e.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{e.degree}</h3>
              <p className="text-sm text-[var(--accent)]">{e.school}</p>
              <p className="mt-3 text-sm text-[var(--fg-muted)]">{e.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>

      <footer className="mt-24 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--fg-muted)]">
        © 2026 Azeem
      </footer>
    </main>
  );
}
