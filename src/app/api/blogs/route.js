// app/api/blogs/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";

// GET - fetch all blogs
export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: error.message },
      { status: 500 }
    );
  }
}

// POST - create new blog
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📥 Incoming body:", body); // Debug

    // Basic validation
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Author ko structured object me set karo
    const blogData = {
      title: body.title,
      description: body.description || "",
      category: body.category || "",
      content: body.content,
      image: body.image || "",
      fontFamily: body.fontFamily || "sans-serif",
      textColor: body.textColor || "#000000",
      backgroundColor: body.backgroundColor || "#FFFFFF",
      author: {
        name: body.authorName || "",
        role: body.authorRole || "",
        avatar: body.authorAvatar || ""
      }
    };

    await dbConnect();
    const newBlog = await Blog.create(blogData);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("❌ POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create blog", details: error.message },
      { status: 500 }
    );
  }
}
