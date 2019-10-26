import * as mongoose from 'mongoose'

export interface MakeArtItem extends mongoose.Document {
  title: string
  date: Date
  description: string
  thumbnail: string
  code: string
}

export const MakeArtItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
})

export const MakeArtItemModel: mongoose.Model<MakeArtItem> = mongoose.model<MakeArtItem>(
  'makeArtItem',
  MakeArtItemSchema,
  'makeArtItems',
)
