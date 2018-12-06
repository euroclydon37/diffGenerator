const { omitBy, isEqual } = require('lodash')

function* diffGenerator() {
	const versions = []
  	versions.push(yield)

  	while(true) {
  		versions.push(
	    	yield versions.length === 2
		        ? {
		          previous: versions[0],
		          latest: versions[1],
		          diff: omitBy(versions[1], (value, key) => isEqual(value, versions[0][key]))
		        }
		        : {
		          previous: null,
		          latest: versions[0],
		          diff: versions[0],
		        },
	    );
	    if (versions.length > 2) {
	      versions.shift();
	    }
  	}
}

module.exports = obj => {
	let gen = diffGenerator()
	gen.next()
	gen.next(obj)
	return gen
}