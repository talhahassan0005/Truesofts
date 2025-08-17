import dbConnect from "@/lib/mongodb";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
  try {
    await dbConnect();

    const { slug } = await params;

    // Find blog by slug (not by _id)
    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return new Response("Blog not found", { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET error:", error);
    return new Response("Failed to fetch blog", { status: 500 });
  }
}

// ✅ Update Blog
export async function PUT(req, { params }) {
  try {
    const { slug } = params;
    const body = await req.json();
    await dbConnect();

    const updatedBlog = await Blog.findByIdAndUpdate(slug, body, { new: true });

    if (!updatedBlog) {
      return new Response("Blog not found", { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("❌ PUT Error:", error);
    return new Response("Failed to update blog", { status: 500 });
  }
}

// ✅ Delete Blog
export async function DELETE(req, { params }) {
  try {
    const { slug } = params;
    await dbConnect();

    const deleted = await Blog.findByIdAndDelete(slug);

    if (!deleted) {
      return new Response("Blog not found", { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE Error:", error);
    return new Response("Failed to delete blog", { status: 500 });
  }
}
