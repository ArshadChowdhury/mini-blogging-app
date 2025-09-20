import { Suspense } from "react";
import { prisma } from "./lib/prisma";
import { SearchBar } from "./components/SearchBar";
import { InfinitePostsList } from "./components/InfinitePostsList";
import Link from "next/link";

async function getPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-grid-gray-100 bg-[size:20px_20px] opacity-50"></div>
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Stories that
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {" "}
            inspire
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Discover thought-provoking articles, insights, and stories from our
          community of writers.
        </p>
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchBar />
        </Suspense>
        <div className="mt-8">
          <Link
            href="/admin"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Write your story
          </Link>
        </div>
      </div>
    </div>
  );
}

async function PostsSection() {
  const posts = await getPosts();

  if (posts.length > 0) {
    return <InfinitePostsList initialPosts={posts} />;
  }
  return (
    <p className="text-2xl text-center font-semibold">
      No articles available now !!
    </p>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of carefully crafted articles covering
            various topics
          </p>
        </div>

        <Suspense
          fallback={<div className="text-center">Loading posts...</div>}
        >
          <PostsSection />
        </Suspense>
      </main>
    </div>
  );
}
