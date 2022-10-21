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
router.get('/:gameId', async (request, response) => {
	const game = allGames.get(request.params.gameId)
	if(game) {
		response.status(200).json(game.status)
	} else {
		response.status(404).send()
	}
})
router.get('/:gameId/guesses', async (request, response) => {
	const game = allGames.get(request.params.gameId)
	if(game) {
		response.status(200).json(game.guesses)
	} else {
		response.status(404).send()
	}
})
router.post('/:gameId/guesses', async (request, response) => {
	const game = allGames.get(request.params.gameId)
	if(game) {
		game.guess(request.body.guess)
		response.status(201).send()
	} else {
		response.status(404).send()
	}
})

export const games = router;
