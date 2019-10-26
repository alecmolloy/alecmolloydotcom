import * as compression from 'compression'
import * as express from 'express'
import * as fs from 'fs'
import * as https from 'https'
import * as mongoose from 'mongoose'
import * as logger from 'morgan'
import * as path from 'path'
import errorHandling from './app/routes/errorHandling'
import router from './app/routes/routes'
import { runHttpServer } from './http-server'

require('dotenv').config()

const app = express()

const port = process.env.NODE_ENV === 'production' ? 443 : 3001

const credentials: https.ServerOptions =
  process.env.NODE_ENV === 'production'
    ? {
        cert: fs.readFileSync('./sslcert/fullchain.pem'),
        key: fs.readFileSync('./sslcert/privkey.pem'),
      }
    : {
        cert: fs.readFileSync('./sslcert/localhost.crt'),
        key: fs.readFileSync('./sslcert/localhost.key'),
      }

mongoose
  .connect(`${process.env.MONGO_URL}alecsoft`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful')
  })
  .catch((err) => {
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
