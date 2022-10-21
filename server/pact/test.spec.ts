import path from "path"

describe('foo', () => {
	it('bar', () => {
		expect(path.join('foo', 'bar')).toEqual('foobar')
	})
})
