import express from 'express'
import { allGames } from '../RunningGames';

const router = express.Router();

router.post('/', async (request, response) => {
	response.status(201).json({
		id: allGames.new().id,
	})
})
router.get('/', async (request, response) => {
	response.status(200).json(allGames.ids())
})

export const games = router;
