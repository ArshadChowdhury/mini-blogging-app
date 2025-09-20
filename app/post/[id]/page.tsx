import { notFound } from "next/navigation";
import { prisma } from "../../lib/prisma";

interface PostPageProps {
  params: { id: string };
}

async function getPost(id: string) {
  return prisma.post.findUnique({
    where: { id, published: true },
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-md p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <time className="text-gray-600">
              {new Date(post.createdAt).toLocaleDateString()}
            </time>
          </header>
          <div className="prose max-w-none">
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
