import * as mongoose from 'mongoose'

const PortfolioItem = new mongoose.Schema({
  name: {
      type: String
  },
  title: {
      type: String
  },
  description: {
      type: String
  },
  date: {
      type: String
  }
})

 mongoose.model('PortfolioItem', PortfolioItem)
