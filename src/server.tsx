import * as express from 'express'
import * as path from 'path'
import * as fs from 'fs'
import * as https from 'https'
import * as compression from 'compression'
import * as logger from 'morgan'
import * as mongoose from 'mongoose'
import { runHttpServer } from './http-server'
import router from './app/routes/index'
import errorHandling from './app/routes/errorHandling'
require('dotenv').config()

const	app = express()

const port = process.env.NODE_ENV === 'production' ? 443 : 3001

const credentials = {
	cert: fs.readFileSync('./sslcert/fullchain.pem'),
	key: fs.readFileSync('./sslcert/privkey.pem')
}

mongoose.connect(`${process.env.MONGO_URL}alecsoft`, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.set('port', port)
app.use(compression())
app.use(logger('dev'))
app.use('/', router)
app.use(express.static(path.join('./dist', 'public')))
app.use('/', errorHandling)
https.createServer(credentials, app).listen(app.get('port'), function () {
	console.log('\nListening on https port ' + app.get('port') + '\n')
})

runHttpServer()