const test = require('ava')
const createDiffer = require('./')

let differ = createDiffer({ name: 'Jeremy', age: 30 })

test('Initializes with object', t => {
	t.deepEqual(
		differ.next({ name: 'Jeremy', age: 30 }).value.diff,
		{},
		'no diff'
	)
})

test('Reports differences', t => {
	t.deepEqual(
		differ.next({ name: 'Justin', age: 30 }).value.diff,
		{ name: 'Justin' },
		'name changed'
	)

	t.deepEqual(
		differ.next({ name: 'Justin', age: 28 }).value.diff,
		{ age: 28 },
		'age changed'
	)
	
	t.deepEqual(
		differ.next({ name: 'Noah', age: 31 }).value.diff,
		{ name: 'Noah', age: 31 },
		'Object is completely new'
	)
})