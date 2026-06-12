// src/lib/admin-community-data.ts
// ─────────────────────────────────────────────────────────────────────────────
// Shared mock data for the Admin Community Control Center.
// Replace every array / object below with real DB queries when you wire up
// PostgreSQL / Prisma.
// ─────────────────────────────────────────────────────────────────────────────

// ── Types ────────────────────────────────────────────────────────────────────

export type Severity = "critical" | "high" | "medium" | "low";
export type ReportStatus = "pending" | "resolved" | "dismissed";
export type UserStatus = "active" | "warned" | "suspended" | "banned";
export type AnnouncementStatus = "published" | "scheduled" | "draft";
export type ThreadStatus = "active" | "flagged" | "pinned" | "deleted";

export type ModerationReport = {
  id: string;
  reportType: string;
  content: string;
  reportedBy: string;
  targetUser: string;
  time: string;
  severity: Severity;
  status: ReportStatus;
};

export type CommunityUser = {
  id: string;
  handle: string;
  email: string;
  reputation: number;
  threads: number;
  comments: number;
  reports: number;
  status: UserStatus;
  joinedAt: string;
  rating: number;
};

export type AdminThread = {
  id: string;
  title: string;
  author: string;
  topic: string;
  replies: number;
  views: number;
  votes: number;
  status: ThreadStatus;
  createdAt: string;
  reports: number;
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  author: string;
  status: AnnouncementStatus;
  publishAt: string;
  createdAt: string;
  views: number;
};

export type ModeratorAction = {
  moderator: string;
  actionsToday: number;
  actionsWeek: number;
  removed: number;
  warned: number;
  suspended: number;
  rating: number;
};

export type AnalyticsStat = {
  label: string;
  value: string;
  trend: number; // percentage, positive = up, negative = down
  icon: string;
};

export type DailyPoint = { day: string; value: number };

export type CommunityAnalytics = {
  dau: DailyPoint[];
  threadGrowth: DailyPoint[];
  replyActivity: DailyPoint[];
  engagementRate: DailyPoint[];
};

// ── Mock data ─────────────────────────────────────────────────────────────────

export const adminStats: AnalyticsStat[] = [
  { label: "Total Threads",     value: "14,823", trend: 8.4,  icon: "MessageSquare" },
  { label: "Total Replies",     value: "97,441", trend: 12.1, icon: "MessagesSquare" },
  { label: "Active Users Today",value: "2,318",  trend: -3.2, icon: "Users" },
  { label: "Solved Questions",  value: "5,902",  trend: 6.7,  icon: "CheckCircle2" },
  { label: "Pending Reports",   value: "47",     trend: 21.3, icon: "AlertTriangle" },
  { label: "Flagged Content",   value: "12",     trend: -14.8,icon: "Flag" },
];

export const moderationQueue: ModerationReport[] = [
  {
    id: "R-001",
    reportType: "Spam",
    content: "\"Buy Codeforces rating boosting service NOW!…\"",
    reportedBy: "rafi_dp",
    targetUser: "promo_bot99",
    time: "2 min ago",
    severity: "high",
    status: "pending"
  },
  {
    id: "R-002",
    reportType: "Harassment",
    content: "\"You're terrible at CP, give up already.\"",
    reportedBy: "bitwiseMira",
    targetUser: "h4ter_x",
    time: "14 min ago",
    severity: "critical",
    status: "pending"
  },
  {
    id: "R-003",
    reportType: "Spoiler",
    content: "\"The answer to Nimble 128 C is just prefix XOR…\"",
    reportedBy: "graphsmith",
    targetUser: "spoiler_acc",
    time: "1 hr ago",
    severity: "medium",
    status: "pending"
  },
  {
    id: "R-004",
    reportType: "Off-topic",
    content: "\"Check out my YouTube channel for gaming clips!\"",
    reportedBy: "tourist_mode",
    targetUser: "gamer_promo",
    time: "3 hr ago",
    severity: "low",
    status: "pending"
  },
  {
    id: "R-005",
    reportType: "Misinformation",
    content: "\"This editorial approach is O(n) — trust me.\"",
    reportedBy: "alice_dev",
    targetUser: "wrong_bigo",
    time: "5 hr ago",
    severity: "medium",
    status: "pending"
  }
];

export const communityUsers: CommunityUser[] = [
  {
    id: "U-001", handle: "tourist_mode", email: "tourist@oj.dev",
    reputation: 9821, threads: 48, comments: 312, reports: 0,
    status: "active", joinedAt: "Jan 2023", rating: 2841
  },
  {
    id: "U-002", handle: "bitwiseMira", email: "mira@oj.dev",
    reputation: 7340, threads: 33, comments: 201, reports: 1,
    status: "active", joinedAt: "Mar 2023", rating: 2412
  },
  {
    id: "U-003", handle: "rafi_dp", email: "rafi@oj.dev",
    reputation: 5120, threads: 21, comments: 145, reports: 0,
    status: "active", joinedAt: "Jun 2023", rating: 1984
  },
  {
    id: "U-004", handle: "h4ter_x", email: "hater@mail.com",
    reputation: 120, threads: 4, comments: 18, reports: 5,
    status: "warned", joinedAt: "Nov 2024", rating: 802
  },
  {
    id: "U-005", handle: "promo_bot99", email: "spam@mail.com",
    reputation: -40, threads: 2, comments: 7, reports: 9,
    status: "suspended", joinedAt: "Feb 2025", rating: 0
  },
  {
    id: "U-006", handle: "graphsmith", email: "gs@oj.dev",
    reputation: 4210, threads: 19, comments: 98, reports: 0,
    status: "active", joinedAt: "Aug 2023", rating: 1872
  }
];

export const adminThreads: AdminThread[] = [
  {
    id: "T-001", title: "Hints for Median Patrol — without full spoilers?",
    author: "rafi_dp", topic: "Help", replies: 14, views: 830,
    votes: 42, status: "pinned", createdAt: "2 days ago", reports: 0
  },
  {
    id: "T-002", title: "Nimble Round 128 — editorial discussion",
    author: "bitwiseMira", topic: "Editorial", replies: 38, views: 2100,
    votes: 91, status: "active", createdAt: "1 day ago", reports: 0
  },
  {
    id: "T-003", title: "Buy rating boost — cheap prices DM me",
    author: "promo_bot99", topic: "General", replies: 0, views: 14,
    votes: -8, status: "flagged", createdAt: "3 hr ago", reports: 7
  },
  {
    id: "T-004", title: "Graph Relay solution using max-flow with lower bounds",
    author: "tourist_mode", topic: "Editorial", replies: 22, views: 1540,
    votes: 77, status: "active", createdAt: "3 days ago", reports: 0
  },
  {
    id: "T-005", title: "DELETED: off-topic rant about grading",
    author: "gamer_promo", topic: "General", replies: 2, views: 44,
    votes: -3, status: "deleted", createdAt: "6 hr ago", reports: 3
  }
];

export const announcements: Announcement[] = [
  {
    id: "A-001",
    title: "Nimble Round 128 editorials are live",
    body: "Full editorial writeups for all 6 problems are now available. Check the editorial tab on each problem page.",
    author: "admin",
    status: "published",
    publishAt: "Today 12:00 UTC",
    createdAt: "Today",
    views: 3841
  },
  {
    id: "A-002",
    title: "New graph practice track added",
    body: "A 25-problem graph theory track has been added, covering BFS/DFS through max-flow and centroid decomposition.",
    author: "admin",
    status: "published",
    publishAt: "Yesterday 10:00 UTC",
    createdAt: "Yesterday",
    views: 2104
  },
  {
    id: "A-003",
    title: "Nimble Round 129 — Registration Open",
    body: "Round 129 is scheduled for Saturday 19:30 UTC. Rating changes apply for all Specialist+ users.",
    author: "admin",
    status: "scheduled",
    publishAt: "Saturday 09:00 UTC",
    createdAt: "Today",
    views: 0
  },
  {
    id: "A-004",
    title: "Community guidelines update — spoiler policy",
    body: "Draft in progress. Clarify spoiler window, editorial embargo rules, and hint-only thread convention.",
    author: "mod_team",
    status: "draft",
    publishAt: "—",
    createdAt: "Today",
    views: 0
  }
];

export const moderatorLeaderboard: ModeratorAction[] = [
  { moderator: "admin",      actionsToday: 18, actionsWeek: 124, removed: 42, warned: 31, suspended: 9,  rating: 99 },
  { moderator: "mod_alice",  actionsToday: 11, actionsWeek:  88, removed: 28, warned: 40, suspended: 4,  rating: 91 },
  { moderator: "mod_rk",     actionsToday:  7, actionsWeek:  61, removed: 19, warned: 22, suspended: 3,  rating: 84 },
  { moderator: "mod_shadow", actionsToday:  4, actionsWeek:  39, removed: 11, warned: 18, suspended: 2,  rating: 76 }
];

export const communityAnalytics: CommunityAnalytics = {
  dau: [
    { day: "Mon", value: 1820 }, { day: "Tue", value: 2104 },
    { day: "Wed", value: 1980 }, { day: "Thu", value: 2318 },
    { day: "Fri", value: 2540 }, { day: "Sat", value: 3102 },
    { day: "Sun", value: 2841 }
  ],
  threadGrowth: [
    { day: "Mon", value: 38 }, { day: "Tue", value: 45 },
    { day: "Wed", value: 41 }, { day: "Thu", value: 52 },
    { day: "Fri", value: 61 }, { day: "Sat", value: 78 },
    { day: "Sun", value: 69 }
  ],
  replyActivity: [
    { day: "Mon", value: 312 }, { day: "Tue", value: 401 },
    { day: "Wed", value: 380 }, { day: "Thu", value: 445 },
    { day: "Fri", value: 512 }, { day: "Sat", value: 648 },
    { day: "Sun", value: 590 }
  ],
  engagementRate: [
    { day: "Mon", value: 58 }, { day: "Tue", value: 61 },
    { day: "Wed", value: 59 }, { day: "Thu", value: 63 },
    { day: "Fri", value: 67 }, { day: "Sat", value: 71 },
    { day: "Sun", value: 69 }
  ]
};