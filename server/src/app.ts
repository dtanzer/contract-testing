import express from 'express'
import bodyParser from 'body-parser'

import { games } from './routes/games'

const application = express();
application.use(bodyParser.json())

application.use('/games', games)

export const app = application;
