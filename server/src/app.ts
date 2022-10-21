import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import { games } from './routes/games'

const application = express();
application.use(bodyParser.json())

var corsOptions = {
	origin: 'http://localhost:4200',
}
application.use(cors(corsOptions))

application.use('/games', games)

export const app = application;
