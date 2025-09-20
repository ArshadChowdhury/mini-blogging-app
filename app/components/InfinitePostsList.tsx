"use client";

import { useState, useEffect, useCallback } from "react";
import { PostCard } from "./PostCard";
import { Post } from "@prisma/client";

interface InfinitePostsListProps {
  initialPosts: Post[];
  searchQuery?: string;
}

export function InfinitePostsList({
  initialPosts,
  searchQuery,
}: InfinitePostsListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const url = searchQuery
        ? `/api/posts?page=${page}&search=${encodeURIComponent(searchQuery)}`
        : `/api/posts?page=${page}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        setPosts((prev) => [...prev, ...data.posts]);
        setPage((prev) => prev + 1);
        setHasMore(data.pagination.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  // Reset when search query changes
  useEffect(() => {
    setPosts(initialPosts);
    setPage(2);
    setHasMore(true);
  }, [initialPosts, searchQuery]);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <span>Loading more posts...</span>
          </div>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">You&apos;ve reached the end! 🎉</p>
        </div>
      )}
    </>
  );
}
