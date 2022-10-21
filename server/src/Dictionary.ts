export class Dictionary {
	private words = [ 'weasel', 'hangman', 'word', 'the', 'insurance', 'game', 'random', 'code', 'craft', ]
	randomWord(): string {
		return this.words[Math.floor(Math.random() * this.words.length)]
	}
}
