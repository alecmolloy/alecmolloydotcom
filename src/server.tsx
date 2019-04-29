import * as express from 'express'
import * as path from 'path'
import * as fs from 'fs'
import * as https from 'https'
import * as compression from 'compression'
import * as logger from 'morgan'
import * as mongoose from 'mongoose'
import { runHttpServer } from './http-server'
import router from './app/routes/index'
require('dotenv').config()

const	app = express()

const port = process.env.NODE_ENV === "production" ? 443 : 3001

const credentials = {
	cert: fs.readFileSync("./sslcert/fullchain.pem"),
	key: fs.readFileSync("./sslcert/privkey.pem")
}

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.set("port", port)
app.use(compression())
app.use(logger("dev"))
app.use('/', router)
app.use(express.static(path.join('./dist', 'public')))

https.createServer(credentials, app).listen(app.get('port'), function () {
	console.log("\nListening on https port " + app.get('port') + "\n")
})

runHttpServer()
