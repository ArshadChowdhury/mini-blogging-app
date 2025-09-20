import Link from "next/link";
// import { Post } from "@prisma/client";

// interface PostCardProps {
//   post: Post;
// }

export function PostCard({ post }: any) {
  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <Link href={`/post/${post.id}`}>
        <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-blue-600">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        <Link
          href={`/post/${post.id}`}
          className="text-blue-600 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
