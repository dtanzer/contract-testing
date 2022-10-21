import { Dictionary } from "./Dictionary"
import { Game } from "./Game"

export class RunningGames {
	private games: { [key: string]: Game } = {}
	private dictionary = new Dictionary()

	new(): Game {
		const game = new Game(this.dictionary.randomWord())
		this.games[game.id] = game
		return game
	}

	ids(): string[] {
		return Object.keys(this.games)
	}

	get(id: string): Game | undefined {
		return this.games[id]
	}
}

export const allGames = new RunningGames()
