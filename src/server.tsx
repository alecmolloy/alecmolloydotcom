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

mongoose.connect(`${process.env.MONGO_URL}portfolio`, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function() {
	let PortfolioSchema = new mongoose.Schema({
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

	PortfolioSchema.methods.speak = function () {
		var greeting = this.name
			? "Meow name is " + this.name
			: "I don't have a name";
		console.log(greeting);
	}

	var fluffy = PortfolioSchema({ name: 'fluffy', title: 'hello', description: 'hello', date: 'hello' })
	fluffy.speak(); // "Meow name is fluffy"


	var PortfolioItem = mongoose.model('PortfolioItem', PortfolioSchema, 'portfolio')
	PortfolioItem.find({ }, function (err: any, kittens: any) {
		if (err) return console.error(err);
		console.log(kittens);
	})


});
app.set("port", port)
app.use(compression())
app.use(logger("dev"))
app.use('/', router)
app.use(express.static(path.join('./dist', 'public')))

https.createServer(credentials, app).listen(app.get('port'), function () {
	console.log("\nListening on https port " + app.get('port') + "\n")
})

runHttpServer()
