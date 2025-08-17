import mongoose from "mongoose";
import slugify from "slugify";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true }, // Auto-generated from title
    description: { type: String },
    category: { type: String },
    content: { type: String, required: true }, // HTML or Markdown
    image: { type: String }, // URL only (we'll store image links)
    
    //  Style options
    fontFamily: { type: String, default: "manrope" }, // e.g. "serif", "sans", "mono"
    textColor: { type: String, default: "#000000" }, // hex or rgb
    backgroundColor: { type: String, default: "#FFFFFF" },

    //  Author details
    author: {
      name: { type: String, default: "Truesofts" },
      avatar: { type: String ,default:"NA"}, // URL
      role: { type: String, default:"NA" }
    }
  },
  { timestamps: true }
);

//  Auto-generate slug before saving
BlogSchema.pre("save", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
