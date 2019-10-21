import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { BlogPostModel } from '../../schemas/blogpost-schema'
import template from '../../template'
import { BlogTemplate } from '../views/blog'
import { BlogPostTemplate } from '../views/blogPost'

export const BlogRoutes = express
  .Router()
  .get('/', (req, res) => {
    BlogPostModel.find({})
      .then((blogPosts) => {
        res.send(
          template({
            body: renderToString(BlogTemplate(blogPosts)),
          }),
        )
      })
      .catch(console.log)
  })

  .get('/:slug', (req, res) => {
    let slug = req.params.slug as string
    BlogPostModel.findById({ slug }).then((blogPost) => {
      if (blogPost != null) {
        res.send(
          template({
            body: renderToString(BlogPostTemplate(blogPost)),
          }),
        )
      }
    })
  })
