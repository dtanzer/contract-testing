import express from 'express'

import { games } from './routes/games'

const application = express();

application.use('/games', games)

export const app = application;
