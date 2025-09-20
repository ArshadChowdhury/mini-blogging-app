"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SearchBar } from "../components/SearchBar";
import { InfinitePostsList } from "../components/InfinitePostsList";
import Link from "next/link";
import { Post } from "@prisma/client";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      setSearched(false);

      fetch(`/api/posts?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setPosts(data.posts || []);
          setSearched(true);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setPosts([]);
          setSearched(true);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setPosts([]);
      setSearched(false);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600">Searching articles...</p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-24">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start your search
          </h3>
          <p className="text-gray-600 mb-6">
            Enter keywords to find articles that match your interests
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Browse all articles
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {searched && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {posts.length > 0 ? (
              <>
                Found {posts.length} article{posts.length !== 1 ? "s" : ""} for{" "}
                <span className="text-indigo-600">&quot;{query}&quot;</span>
              </>
            ) : (
              <>
                No articles found for{" "}
                <span className="text-indigo-600">&quot;{query}&quot;</span>
              </>
            )}
          </h2>
          {posts.length === 0 && (
            <p className="text-gray-600">
              Try searching with different keywords or{" "}
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                browse all articles
              </Link>
            </p>
          )}
        </div>
      )}

      {posts.length > 0 && (
        <InfinitePostsList initialPosts={posts} searchQuery={query} />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200 mb-6"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to home
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Articles
            </h1>
            <p className="text-gray-600 mb-8">
              Find the perfect article for what you&apos;re looking for
            </p>
          </div>
          <Suspense fallback={<div>Loading search...</div>}>
            <SearchBar />
          </Suspense>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <Suspense
          fallback={
            <div className="flex justify-center py-24">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          }
        >
          <SearchResults />
        </Suspense>
      </main>
    </div>
  );
}
