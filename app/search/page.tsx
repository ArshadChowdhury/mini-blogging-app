"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PostCard } from "../components/PostCard";
import { SearchBar } from "../components/SearchBar";
import { Post } from "@prisma/client";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      fetch(`/api/posts?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.posts || []);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return <div className="text-center">Searching...</div>;
  }

  return (
    <>
      {query && (
        <h2 className="text-2xl font-bold mb-8">
          Search results for "{query}"
        </h2>
      )}
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {posts.length === 0 && query && (
        <p className="text-center text-gray-600">No posts found.</p>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search Posts
          </h1>
          <SearchBar />
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
