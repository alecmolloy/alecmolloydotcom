import * as mongoose from 'mongoose'

export interface BlogPost extends mongoose.Document {
  title: string
  created: Date
  deck: string
  slug: string
  byline: string
  contentPreview: string
  contentLocation: string
  heroImageURL: string
  heroImageAlt: string
}

export const PortfolioSchema = new mongoose.Schema({
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


export const PortfolioModel: mongoose.Model<Portfolio> = mongoose.model<Portfolio>('Portfolio', PortfolioSchema, 'portfolio')