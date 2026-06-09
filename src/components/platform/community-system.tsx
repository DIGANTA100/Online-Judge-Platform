import React from 'react';

// Mock data for demonstration purposes
const mockPosts = [
  {
    id: '1',
    author: 'Alice',
    title: 'Welcome to the Community!',
    excerpt: 'Feel free to discuss problems, share solutions, and help each other.',
    category: 'Announcements',
    votes: 12,
    replies: 3,
  },
  {
    id: '2',
    author: 'Bob',
    title: 'Best strategies for DP problems',
    excerpt: 'Dynamic programming can be tricky, here are some tips...',
    category: 'Discussion',
    votes: 8,
    replies: 5,
  },
];

export function CommunitySystem() {
  return (
    <section className="max-w-5xl mx-auto space-y-6">
      <header className="border-b border-white/10 pb-4">
        <h1 className="text-4xl font-semibold text-white">Community</h1>
        <p className="mt-2 text-lg text-white/70">
          A place for all users to talk, discuss problems, and share ideas.
        </p>
        <button
          className="mt-4 rounded-md bg-mint-300/20 px-4 py-2 text-mint-300 hover:bg-mint-300/30"
          // onClick: open compose modal – stubbed for now
        >
          New Post
        </button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-md border border-white/10 bg-white/[0.045] p-5 hover:border-mint-300/30 hover:bg-mint-300/[0.07]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-mint-300">{post.category}</span>
              <span className="text-xs text-white/50">{post.author}</span>
            </div>
            <h2 className="mt-2 text-xl font-semibold text-white">{post.title}</h2>
            <p className="mt-2 text-sm text-white/60">{post.excerpt}</p>
            <div className="mt-3 flex items-center text-sm text-white/40">
              <span className="mr-4">▲ {post.votes}</span>
              <span>💬 {post.replies}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
