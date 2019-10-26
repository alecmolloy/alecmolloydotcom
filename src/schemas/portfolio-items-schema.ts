import * as mongoose from 'mongoose'

export interface PortfolioItem extends mongoose.Document {
  title: string
  createdAt: Date
  name: string
  description: string
  date: string
  URL: string
  imgURL: string
  ongoingIndex: number
  orderDate: Date
}

export const PortfolioItemSchema = new mongoose.Schema({
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
  ongoingIndex: {
    type: Number,
    required: false,
  },
  orderDate: {
    type: Date,
    required: true,
  },
})

export const PortfolioModel: mongoose.Model<PortfolioItem> = mongoose.model<PortfolioItem>(
  'portfolioItem',
  PortfolioItemSchema,
)
