import {
  Activity,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  FileCode2,
  Gauge,
  GraduationCap,
  KeyRound,
  LockKeyhole,
  Medal,
  MessageSquareText,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
  Timer,
  Trophy,
  User,
  Users
} from "lucide-react";

export const productModules = [
  {
    title: "Profile",
    href: "/profile",
    description: "Manage your professional developer profile, track submission statistics, ratings, solved categories and configure account preferences.",
    icon: User,
    status: "Implemented surface"
  },
  {
    title: "Problemset",
    href: "/problems",
    description: "Curated problems, smart filters, topic tracks, editorials, submissions, and focused practice.",
    icon: FileCode2,
    status: "Implemented surface"
  },
  {
    title: "Contest Engine",
    href: "/contests",
    description: "Live, virtual, private, and team contests with penalty scoring, freeze mode, and live rankings.",
    icon: Trophy,
    status: "Implemented surface"
  },
  {
    title: "Community",
    href: "/platform",
    description: "Users, teams, discussions, notifications, badges, and moderation are represented across the platform surfaces.",
    icon: Users,
    status: "Implemented surface"
  },
  {
    title: "Judge Workspace",
    href: "/workspace",
    description: "Monaco editor, language controls, custom input, output console, verdict trace, and sandbox metadata.",
    icon: Terminal,
    status: "Implemented surface"
  },
  {
    title: "Analytics",
    href: "/dashboard",
    description: "Heatmap, solved counts, language usage, accuracy, rating history, and contest performance.",
    icon: Activity,
    status: "Implemented surface"
  },
  {
    title: "Rating System",
    href: "/ratings",
    description: "Codeforces-like performance estimates, rating deltas, rank titles, volatility damping, and contest history.",
    icon: Medal,
    status: "Implemented surface"
  },
  {
    title: "AI Learning",
    href: "/ai",
    description: "Hints, complexity analysis, code review, debugging support, and learning recommendations.",
    icon: BrainCircuit,
    status: "Implemented surface"
  },
  {
    title: "Admin Studio",
    href: "/admin",
    description: "Problem creation, test case management, contest setup, moderation, and production readiness checks.",
    icon: ShieldCheck,
    status: "Implemented surface"
  },
  {
    title: "Architecture",
    href: "/architecture",
    description: "Service boundaries, database design, security model, deployment map, rating formula, and API contracts.",
    icon: Network,
    status: "Documented"
  }
];

export const authFlows = [
  { label: "Signup", detail: "Handle, email, password strength, captcha-ready rate limit" },
  { label: "Login", detail: "JWT access token plus rotating refresh token" },
  { label: "Forgot password", detail: "Single-use reset token with expiry and audit event" },
  { label: "Email verification", detail: "Required before contests, discussions, and admin actions" },
  { label: "Google OAuth", detail: "Account linking with verified email enforcement" },
  { label: "GitHub OAuth", detail: "Developer-friendly provider with unique handle reservation" }
];

export const sampleProblems = [
  {
    slug: "median-patrol",
    title: "Median Patrol",
    difficulty: "Medium",
    acceptance: "47.2%",
    timeLimit: "1.5s",
    memoryLimit: "256 MB",
    tags: ["binary search", "prefix sums", "greedy"],
    solved: 12842,
    statement:
      "Given an array of patrol checkpoints, maximize the minimum median score after at most k upgrades.",
    constraints: ["1 <= n <= 200000", "0 <= k <= 10^9", "1 <= ai <= 10^9"],
    source: "Nimble Round 128",
    category: "Practice",
    examples: [
      { input: "5 2\n1 3 2 6 4", output: "4" },
      { input: "4 1\n2 2 2 9", output: "3" }
    ]
  },
  {
    slug: "graph-relay",
    title: "Graph Relay",
    difficulty: "Hard",
    acceptance: "18.6%",
    timeLimit: "3s",
    memoryLimit: "512 MB",
    tags: ["max flow", "shortest path", "dp"],
    solved: 3147,
    statement:
      "Route relay packets through a weighted directed graph while preserving bandwidth guarantees.",
    constraints: ["1 <= n <= 500", "1 <= m <= 5000", "1 <= capacity <= 10^6"],
    source: "Graph Practice Cup",
    category: "Contest",
    examples: [{ input: "3 3\n1 2 4\n2 3 5\n1 3 7", output: "9" }]
  },
  {
    slug: "compiler-garden",
    title: "Compiler Garden",
    difficulty: "Easy",
    acceptance: "73.4%",
    timeLimit: "1s",
    memoryLimit: "128 MB",
    tags: ["strings", "maps", "implementation"],
    solved: 41205,
    statement:
      "Normalize a stream of compiler warnings and count each unique warning category.",
    constraints: ["1 <= n <= 100000", "1 <= warning length <= 64"],
    source: "Beginner Arena",
    category: "Practice",
    examples: [{ input: "3\nunused\nshadow\nunused", output: "2" }]
  },
  {
    slug: "matrix-beacon",
    title: "Matrix Beacon",
    difficulty: "Medium",
    acceptance: "39.8%",
    timeLimit: "2s",
    memoryLimit: "256 MB",
    tags: ["matrix", "prefix sums", "implementation"],
    solved: 9021,
    statement:
      "Given a grid of signal strengths, answer rectangular beacon queries after a sequence of row boosts.",
    constraints: ["1 <= n, m <= 1000", "1 <= q <= 200000", "0 <= grid[i][j] <= 10^6"],
    source: "Data Structures Sprint",
    category: "Practice",
    examples: [{ input: "2 2 1\n1 2\n3 4\n1 1 2 2", output: "10" }]
  },
  {
    slug: "string-forge",
    title: "String Forge",
    difficulty: "Easy",
    acceptance: "68.9%",
    timeLimit: "1s",
    memoryLimit: "128 MB",
    tags: ["strings", "hashing", "two pointers"],
    solved: 23784,
    statement:
      "Transform one string into another using prefix reversals and count the minimum number of operations.",
    constraints: ["1 <= |s| <= 200000", "lowercase latin letters only"],
    source: "Weekly Warmup",
    category: "Practice",
    examples: [{ input: "abca\ncaba", output: "2" }]
  },
  {
    slug: "tree-teleport",
    title: "Tree Teleport",
    difficulty: "Hard",
    acceptance: "21.5%",
    timeLimit: "4s",
    memoryLimit: "512 MB",
    tags: ["trees", "lca", "rerooting"],
    solved: 2880,
    statement:
      "On a weighted tree, choose teleport anchors so that the maximum travel distance between query pairs is minimized.",
    constraints: ["1 <= n <= 200000", "1 <= q <= 200000", "1 <= edge weight <= 10^9"],
    source: "Nimble Round 126",
    category: "Contest",
    examples: [{ input: "3 1\n1 2 4\n2 3 5\n1 3", output: "5" }]
  },
  {
    slug: "cache-race",
    title: "Cache Race",
    difficulty: "Expert",
    acceptance: "9.7%",
    timeLimit: "5s",
    memoryLimit: "1024 MB",
    tags: ["dp", "optimization", "segment tree"],
    solved: 624,
    statement:
      "Schedule memory cache updates across competing processors to maximize completed jobs before deadline.",
    constraints: ["1 <= n <= 300000", "1 <= deadline <= 10^9"],
    source: "Championship Finals",
    category: "Contest",
    examples: [{ input: "3\n1 4\n2 5\n3 6", output: "3" }]
  },
  {
    slug: "probability-lab",
    title: "Probability Lab",
    difficulty: "Medium",
    acceptance: "44.1%",
    timeLimit: "2s",
    memoryLimit: "256 MB",
    tags: ["probability", "dp", "math"],
    solved: 7522,
    statement:
      "Compute the expected score after repeatedly choosing experiments with changing success probabilities.",
    constraints: ["1 <= n <= 5000", "0 <= pi <= 1"],
    source: "Math Practice",
    category: "Practice",
    examples: [{ input: "2\n0.5 0.25", output: "0.875000" }]
  }
];

export const contests = [
  {
    slug: "nimble-round-128",
    name: "Nimble Round 128",
    type: "Rated",
    startsAt: "Today 19:30 UTC",
    duration: "2h 15m",
    registered: 18420,
    freeze: "Last 30m",
    status: "Open"
  },
  {
    slug: "university-team-cup",
    name: "University Team Cup",
    type: "Team",
    startsAt: "Saturday 14:00 UTC",
    duration: "5h",
    registered: 1208,
    freeze: "Last 60m",
    status: "Invite"
  },
  {
    slug: "ds-sprint",
    name: "Data Structures Sprint",
    type: "Virtual",
    startsAt: "Anytime",
    duration: "90m",
    registered: 4912,
    freeze: "None",
    status: "Live"
  }
];

export const standings = [
  { rank: 1, handle: "tourist_mode", solved: 6, penalty: 312, ratingDelta: 87 },
  { rank: 2, handle: "bitwiseMira", solved: 6, penalty: 349, ratingDelta: 72 },
  { rank: 3, handle: "rafi_dp", solved: 5, penalty: 284, ratingDelta: 41 },
  { rank: 4, handle: "graphsmith", solved: 5, penalty: 391, ratingDelta: 33 }
];

export const submissions = [
  { id: "S-10492", problem: "Median Patrol", language: "C++20", verdict: "AC", runtime: "84 ms", memory: "18.4 MB" },
  { id: "S-10491", problem: "Graph Relay", language: "Python 3.12", verdict: "TLE", runtime: "3000 ms", memory: "71.0 MB" },
  { id: "S-10490", problem: "Compiler Garden", language: "Java 21", verdict: "WA", runtime: "190 ms", memory: "44.8 MB" },
  { id: "S-10489", problem: "Median Patrol", language: "C++20", verdict: "CE", runtime: "-", memory: "-" }
];

export const verdictConfig = {
  AC: { label: "Accepted", className: "border-mint-300/20 bg-mint-300/10 text-mint-300" },
  WA: { label: "Wrong Answer", className: "border-amberline-300/20 bg-amberline-300/10 text-amberline-300" },
  TLE: { label: "Time Limit", className: "border-coral-400/20 bg-coral-400/10 text-coral-300" },
  MLE: { label: "Memory Limit", className: "border-coral-400/20 bg-coral-400/10 text-coral-300" },
  RE: { label: "Runtime Error", className: "border-coral-400/20 bg-coral-400/10 text-coral-300" },
  CE: { label: "Compile Error", className: "border-coral-400/20 bg-coral-400/10 text-coral-300" },
  QUEUED: { label: "Queued", className: "border-white/10 bg-white/[0.06] text-white/62" }
} as const;

export const analytics = {
  solved: 428,
  streak: 23,
  accuracy: "71.8%",
  rating: 1842,
  languages: [
    { label: "C++", value: 58 },
    { label: "Python", value: 24 },
    { label: "Java", value: 11 },
    { label: "JavaScript", value: 7 }
  ],
  ratingHistory: [1420, 1488, 1512, 1610, 1594, 1711, 1842],
  heatmap: Array.from({ length: 42 }, (_, index) => (index * 7 + 3) % 5)
};

export const judgePipeline = [
  { label: "Receive submission", icon: Code2, detail: "Validate problem, language, contest window, and user rate limit." },
  { label: "Queue job", icon: Database, detail: "Push Redis job with source key, limits, and test manifest." },
  { label: "Compile", icon: Cpu, detail: "Run compiler in isolated container with output cap." },
  { label: "Execute tests", icon: Timer, detail: "Run hidden tests with CPU, memory, pid, and wall-clock limits." },
  { label: "Emit verdict", icon: CheckCircle2, detail: "Persist per-test results and stream final verdict to the UI." }
];

export const adminQueues = [
  { label: "Draft problems", value: "18", icon: FileCode2 },
  { label: "Hidden tests", value: "642", icon: LockKeyhole },
  { label: "Reports", value: "7", icon: MessageSquareText },
  { label: "Sandbox workers", value: "12/16", icon: Gauge }
];

export const aiTools = [
  { title: "Hint generation", icon: Sparkles, output: "Try binary searching the answer, then prove whether a target median is feasible." },
  { title: "Complexity analysis", icon: Gauge, output: "Current approach: O(n log V), memory O(n). Fits 2e5 constraints." },
  { title: "Code review", icon: Bot, output: "Your feasibility check mutates the prefix array. Clone or compute deltas in-place safely." },
  { title: "Learning path", icon: GraduationCap, output: "Next: median tricks, monotonic predicates, then flow with lower bounds." }
];

export const ratingModel = {
  currentRating: 1842,
  projectedPerformance: 1976,
  actualRank: 42,
  expectedRank: 71,
  delta: 38,
  formulas: [
    "E(a beats b) = 1 / (1 + 10^((rating_b - rating_a) / 400))",
    "expectedRank = 1 + sum(E(opponent beats user))",
    "performanceRating = inverseExpectedRank(actualRank)",
    "delta = damp((performanceRating - currentRating) / 2, contestsPlayed, volatility)"
  ],
  titles: [
    { title: "Newbie", range: "< 1200", color: "#9ca3af" },
    { title: "Pupil", range: "1200-1399", color: "#35dfb5" },
    { title: "Specialist", range: "1400-1599", color: "#76f7d1" },
    { title: "Expert", range: "1600-1899", color: "#5ea4ff" },
    { title: "Candidate Master", range: "1900-2099", color: "#b58cff" },
    { title: "Master", range: "2100-2399", color: "#ffb84d" },
    { title: "Grandmaster", range: "2400+", color: "#ff7676" }
  ]
};

export const apiContracts = [
  "POST /api/v1/auth/signup",
  "POST /api/v1/auth/login",
  "POST /api/v1/auth/refresh",
  "GET /api/v1/problems",
  "GET /api/v1/problems/{slug}",
  "POST /api/v1/submissions",
  "GET /api/v1/submissions/{id}/events",
  "GET /api/v1/contests/{slug}/standings",
  "POST /api/v1/admin/test-cases",
  "POST /api/v1/ai/code-review"
];

export const securityChecklist = [
  "JWT access tokens are short-lived; refresh tokens are rotated and stored hashed.",
  "Submission endpoints are rate-limited by user, IP, contest, and language.",
  "Docker sandboxes run non-root, without network, and with CPU, memory, pids, file, and timeout limits.",
  "Hidden test data is stored outside frontend-accessible storage.",
  "Markdown statements and editorials are sanitized before rendering.",
  "Admin actions produce audit log records."
];

export type Verdict = keyof typeof verdictConfig;
