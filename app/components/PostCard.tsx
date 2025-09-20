import Link from "next/link";
import { Post } from "@prisma/client";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const readingTime = Math.ceil(post.content.length / 200);

  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 hover:-translate-y-1">
      <div className="p-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <time>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>

        <Link href={`/post/${post.id}`} className="block">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors duration-200 leading-tight">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
          {post.excerpt || post.content.substring(0, 150) + "..."}
        </p>

        <Link
          href={`/post/${post.id}`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
        >
          Read full article
          <svg
            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
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
    </article>
  );
}
