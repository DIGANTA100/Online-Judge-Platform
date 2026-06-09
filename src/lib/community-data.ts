export const communityTopics = ["All", "Problems", "Contests", "Help", "Editorials", "Announcements"];

export const communityThreads = [
  {
    id: "thread_median_patrol_hint",
    title: "Median Patrol: how do I prove the binary-search predicate?",
    topic: "Problems",
    author: "bitwise_mira",
    avatar: "BM",
    replies: 18,
    views: 842,
    lastActive: "12 min ago",
    solved: true,
    excerpt:
      "I can see that the answer might be monotonic, but I am stuck proving why the feasibility check works for every median candidate."
  },
  {
    id: "thread_round_128",
    title: "Nimble Round 128 post-contest discussion",
    topic: "Contests",
    author: "rafi_dp",
    avatar: "RD",
    replies: 64,
    views: 3920,
    lastActive: "34 min ago",
    solved: false,
    excerpt:
      "Share your approaches, hacks, and performance notes from the latest rated round."
  },
  {
    id: "thread_graph_relay_editorial",
    title: "Graph Relay alternate solution using min-cut intuition",
    topic: "Editorials",
    author: "graphsmith",
    avatar: "GS",
    replies: 11,
    views: 1204,
    lastActive: "1 hr ago",
    solved: true,
    excerpt:
      "The official solution uses max flow directly, but the constraints also reveal a useful cut-based interpretation."
  },
  {
    id: "thread_beginner_path",
    title: "Best practice path after solving 100 easy problems?",
    topic: "Help",
    author: "afd123",
    avatar: "AF",
    replies: 27,
    views: 1910,
    lastActive: "2 hrs ago",
    solved: false,
    excerpt:
      "I want to move from easy implementation tasks into medium binary search and dynamic programming problems."
  }
];

export const communityMembers = [
  { handle: "tourist_mode", rating: 3120, badge: "Legend" },
  { handle: "bitwise_mira", rating: 2140, badge: "Mentor" },
  { handle: "rafi_dp", rating: 1986, badge: "Editorialist" },
  { handle: "graphsmith", rating: 1870, badge: "Helper" }
];

export const communityStats = [
  { label: "Threads", value: "18.2K" },
  { label: "Replies", value: "142K" },
  { label: "Solved Q&A", value: "9.8K" },
  { label: "Active today", value: "2.4K" }
];
