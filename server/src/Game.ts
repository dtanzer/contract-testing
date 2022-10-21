import crypto from 'crypto'

export class Game {
	public readonly id: string

	constructor(private secretWord: string) {
		this.id = crypto.randomUUID()
	}
}
