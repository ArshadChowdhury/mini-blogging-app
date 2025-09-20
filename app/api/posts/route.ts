import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "3");
  const search = searchParams.get("search")?.trim();
  const skip = (page - 1) * limit;

  try {
    let where: Prisma.PostWhereInput = { published: true };

    if (search) {
      where = {
        AND: [
          { published: true },
          {
            OR: [
              { title: { contains: search } },
              { content: { contains: search } },
              { excerpt: { contains: search } },
            ],
          },
        ],
      };
    }

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + posts.length < total,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, excerpt } = await request.json();

    const post = await prisma.post.create({
      data: {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + "...",
        published: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create post error : ${error}` },
      { status: 500 }
    );
  }
}
