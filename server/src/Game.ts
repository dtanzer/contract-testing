import crypto from 'crypto'

export interface Status {
	guesses?: number,
	wrongGuesses?: number,
	placeholder: (string | null)[],
	status: 'running' | 'won' | 'lost',
}
export class Game {
	public readonly id: string
	public readonly guesses: string[] = []
	private wrongGuesses: number = 0

	constructor(private secretWord: string, id: string = crypto.randomUUID()) {
		this.id = id
	}

	get status(): Status {
		return {
			guesses: this.guesses.length > 0? this.guesses.length : undefined,
			wrongGuesses: this.wrongGuesses > 0? this.wrongGuesses : undefined,
			placeholder: this.secretWord.split('').map(c => this.guesses.find(g => g===c)? c : null),
			status: 'running',
		}
	}

	guess(nextGuess: string) {
		if(this.secretWord.indexOf(nextGuess) < 0) {
			this.wrongGuesses++
		}
		this.guesses.push(nextGuess)
	}
}
