"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "../components/SearchBar";
import { InfinitePostsList } from "../components/InfinitePostsList";
import Link from "next/link";
import { Post } from "@prisma/client";

export function SearchPageClient() {
  const searchParams = useSearchParams(); // ✅ safe now
  const query = searchParams.get("q")?.trim() || "";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetch(`/api/posts?search=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Search Articles
          </h1>
          <SearchBar />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : posts.length > 0 ? (
          <InfinitePostsList initialPosts={posts} searchQuery={query} />
        ) : (
          <div className="text-center py-24">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {query ? `No results for "${query}"` : "Start your search"}
            </h3>
            <p className="text-gray-600 mb-6">
              Enter keywords to find articles that match your interests
            </p>
            <Link href="/" className="text-indigo-600 hover:text-indigo-700">
              Browse all articles →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
