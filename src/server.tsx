import * as compression from 'compression'
import * as express from 'express'
import * as fs from 'fs'
import * as https from 'https'
import * as mongoose from 'mongoose'
import * as mongodb from 'mongodb'
import * as logger from 'morgan'
import * as path from 'path'
import errorHandling from './app/routes/errorHandling'
import router from './app/routes/routes'
import { runHttpServer } from './http-server'

require('dotenv').config()

const app = express()

const port = process.env.NODE_ENV === 'production' ? 443 : 3001

const credentials: https.ServerOptions = {
  cert: fs.readFileSync('./sslcert/fullchain.pem'),
  key: fs.readFileSync('./sslcert/privkey.pem'),
}

mongoose
  .connect(process.env.MONGO_URL as string, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful')
  })
  .catch((err: mongodb.MongoError) => {
    console.error('Database connection error', err)
  })

app.set('port', port)
app.use(compression())
app.use(logger('dev'))
app.use('/', router)
app.use(express.static(path.join('./dist', 'public')))
app.use('/', express.static(path.join('./dist', 'public', 'things')))
app.use('/', errorHandling)
https.createServer(credentials, app).listen(app.get('port'), function() {
  console.log('\nListening on https port ' + app.get('port') + '\n')
})

runHttpServer()
