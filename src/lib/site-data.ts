import {
  Activity,
  BarChart3,
  BrainCircuit,
  Braces,
  CalendarClock,
  Code2,
  DatabaseZap,
  Gauge,
  GraduationCap,
  LockKeyhole,
  Medal,
  Network,
  Rocket,
  ShieldCheck,
  Trophy,
  Users
} from "lucide-react";

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "Platform", href: "/platform" },
  { label: "Contests", href: "#contests" },
  { label: "Editor", href: "#editor" },
  { label: "Problems", href: "#problems" }
];

export const stats = [
  { label: "Submissions judged", value: "28.4M", detail: "p95 verdict under 1.8s" },
  { label: "Active coders", value: "312K", detail: "across 74 countries" },
  { label: "Problems curated", value: "18K", detail: "tagged by skill path" },
  { label: "Live contests", value: "146", detail: "weekly official + virtual" }
];

export const features = [
  {
    title: "Contest engine",
    description: "Live, virtual, private, and team contests with freeze windows and penalty-aware scoreboards.",
    icon: Trophy
  },
  {
    title: "Production judge",
    description: "Redis-backed queue, Docker sandboxes, resource limits, and scalable worker pools.",
    icon: ShieldCheck
  },
  {
    title: "Learning intelligence",
    description: "Hints, complexity analysis, code review, and recommendations built around the user journey.",
    icon: BrainCircuit
  },
  {
    title: "Deep analytics",
    description: "Heatmaps, language trends, accuracy, contest history, and rating movement at a glance.",
    icon: BarChart3
  },
  {
    title: "Problem studio",
    description: "Author statements, examples, tags, hidden tests, public tests, and editorials from one workflow.",
    icon: GraduationCap
  },
  {
    title: "Secure identity",
    description: "JWT sessions, refresh rotation, OAuth, verification, validation, and rate-limited auth endpoints.",
    icon: LockKeyhole
  }
];

export const contestRows = [
  { name: "Nimble Round 128", type: "Rated", starts: "19:30 UTC", users: "18,420", status: "Open" },
  { name: "Data Structures Sprint", type: "Virtual", starts: "Anytime", users: "4,912", status: "Live" },
  { name: "University Team Cup", type: "Private", starts: "Sat 14:00", users: "1,208", status: "Invite" }
];

export const problems = [
  { title: "Median Patrol", difficulty: "Medium", tags: ["binary search", "prefix"], solves: "12.8K", icon: Activity },
  { title: "Graph Relay", difficulty: "Hard", tags: ["flows", "dp"], solves: "3.1K", icon: Network },
  { title: "Compiler Garden", difficulty: "Easy", tags: ["strings", "maps"], solves: "41.2K", icon: Braces }
];

export const testimonials = [
  {
    quote: "The judge feels instant and the editor is good enough that I stopped opening a second IDE.",
    name: "Mira Chen",
    role: "ICPC World Finalist"
  },
  {
    quote: "It has the contest discipline of Codeforces with the onboarding polish I wish every platform had.",
    name: "Rafi Karim",
    role: "Staff SWE"
  },
  {
    quote: "The analytics made practice feel structured instead of random. That changed my weekly routine.",
    name: "Elena Park",
    role: "University Coach"
  }
];

export const architecturePillars = [
  { label: "Next.js", icon: Rocket },
  { label: "Spring Boot", icon: DatabaseZap },
  { label: "Redis queue", icon: Gauge },
  { label: "Monaco", icon: Code2 },
  { label: "Community", icon: Users },
  { label: "Contests", icon: CalendarClock },
  { label: "Ratings", icon: Medal }
];
