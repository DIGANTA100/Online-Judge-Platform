export type CommunityPost = {
  id: string;
  author: string;
  title: string;
  excerpt: string;
  category: string;
  votes: number;
  replies: number;
};

export const posts: CommunityPost[] = [
  {
    id: "1",
    author: "Alice",
    title: "Welcome to the Community!",
    excerpt: "Feel free to discuss problems, share solutions, and help each other.",
    category: "Announcements",
    votes: 12,
    replies: 3
  },
  {
    id: "2",
    author: "Bob",
    title: "Best strategies for DP problems",
    excerpt: "Dynamic programming can be tricky; here are some tips.",
    category: "Discussion",
    votes: 8,
    replies: 5
  }
];

export const findPost = (id: string) => posts.find((post) => post.id === id);

export const addPost = (post: CommunityPost) => {
  // DATABASE TODO:
  // Insert into PostgreSQL here.
  // await db.post.create({ data: post });
  posts.push(post);
};

export const updateVotes = (id: string, delta: number) => {
  const post = findPost(id);
  if (post) post.votes += delta;

  // DATABASE TODO:
  // Persist vote change in PostgreSQL here.
  // await db.post.update({ where: { id }, data: { votes: { increment: delta } } });
};

export const addReply = (postId: string) => {
  const post = findPost(postId);
  if (post) post.replies += 1;

  // DATABASE TODO:
  // Insert reply record into PostgreSQL here.
  // await db.reply.create({ data: { postId, authorId, content } });
};
