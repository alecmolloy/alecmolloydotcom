import * as mongoose from 'mongoose'

export interface BlogPost extends mongoose.Document {
  title: string
  slug: string
  deck: string
  byline: string
  content: string
  heroImageURL: string
  heroImageAlt: string
  created: Date
  contentPreview: string
  contentLocation: string
}

export const BlogPostSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  URL: {
    type: String,
    required: true,
  },
  imgURL: {
    type: String,
    required: true,
  },
})

export const BlogPostModel: mongoose.Model<BlogPost> = mongoose.model<BlogPost>(
  'BlogPost',
  BlogPostSchema,
)
