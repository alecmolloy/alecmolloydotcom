import * as mongoose from 'mongoose'

const PortfolioItem = new mongoose.Schema({
  portfolio_name: {
    type: String,
  },
  portfolio_title: {
    type: String,
  },
  portfolio_description: {
    type: String,
  },
  portfolio_date: {
    type: String,
  },
})

module.exports = mongoose.model('PortfolioItem', PortfolioItem)
