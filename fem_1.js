// Objects

var person = {};

person.name = "Mrs. White"; // Assignment notation with .

var person = {
	"name": "Mrs. White"
};

var person = {
	name: "Mrs. White"
};

person.name // Retrieving the value "Mrs. White"

// How is our data stored in memory?

var who = person.name;

// who -> "Mrs. White" <- person.name

who; // ??

/* My Code */

var unit = {
	ean: '123845384',
	name: 'cheerios',
	price: 9.99
};

console.log('Original', unit);

function priceHike(u) {
	u.price += 10;
}

function priceHike2(p) {
	p += 10;
}

console.log('By Reference:');

priceHike(unit); // Object here is passed by reference
console.log(unit);
console.log(unit.price); // adds 10 to price

console.log('By Value:');

priceHike2(unit.price); // Primitive is passed by value
console.log(unit);
console.log(unit.price); // no effect

// Destructuring

let [first, second] = [1, 2];

console.log('first', first);
console.log('second', second);

[first, second] = [4, 5];

console.log('first', first);
console.log('second', second);

// when const and when let?
// use const when you don't want that variable name to bind to anything else
// use let when you want to reassign that variable to something else

let {first1, second1} = {first1: 1, second1: 2};
console.log('first', first1);
console.log('second', second1);

({first1, second1} = {first1: 10, second1: 11}); // interesting quirk, we need
// the parentheses to wrap this object destructuring assignment statement...

let game = {
	'suspects': [
		{
			name: 'Rusty',
			color: 'orange'
		},
		{
			name: 'Amara',
			color: 'purple'
		}
	]
}

// looping over arrays using index
for(let i = 0; i < game.suspects.length; i++) {
	console.log(game.suspects[i]);
}

// looping over objects
for(let key in game) {
	console.log(key, game[key]);
}

for(let i = 0; i < game.suspects.length; i++) {
	for(key in game.suspects[i]) {
		console.log(key, game.suspects[i][key]);
	}
}

let suspects = [
	{
		name: 'Rusty',
		color: 'orange'
	},
	{
		name: 'Scarlet',
		color: 'red'
	}
];

// some cool destructuring!
let [{color: firstColor},{color: secondColor}] = suspects;
// grab the color property
console.log(firstColor, secondColor);

function createSuspectsObject(name) {
	return {
		name: name,
		color: name.split(' ')[2],
		speak: function() { // a function on the object
			console.log('my name is', name);
		}
	}
}

function createSuspectsObject2(name) {
	return {
		name:name,
		color:name.split(' ')[2],
		speak() { // es6 notation for a function in an object
			console.log('my name is', name);
		}
	}
}

suspects = ['Miss Scarlet', 'Colonel Mustard', 'Mr. White'];
let suspectsList = [];

for(let i = 0; i < suspects.length; i++) {
	suspectsList.push(createSuspectsObject(suspects[0]));
}

console.log(suspectsList);

const _ = {};

// basic definition of a lodash each function
_.each = (list, callback) => {
	if(Array.isArray(list)) {
		for(let i = 0; i < list.length; i++) {
			callback(list[i], i, list);
		}
	} else {
		for(key in list) {
			callback(list[key], key, list);
		}
	}
};

let names = ['sally', 'emily', 'ratatouille'];
// function calls for the value, the index and a reference to the list
_.each(names, function(name, i, list) {
	if(list[i + 1]) {
		list[i] = list[i + 1];
	} else {
		list.pop();
	}
});

// because the list is passed by reference
// the names object has been changed
console.log(names);

// map lodash function
// difference between map and each
// each returns nothing, does its work on the original array
// map returns an array

const weapons = ['candlestick', 'lead pipe', 'revolver'];
const makeBroken = (item) => {
	return `broken ${item}`;
};

_.map = (list, callback) => {
	const output = [];
	if(Array.isArray(list)) {
		for(let i = 0; i < list.length; i++) {
			output.push(callback(list[i]));
		}
	} else {
		for(key in list) {
			output.push(callback(list[key]));
		}
	}
	return output;
};

brokenWeapons = _.map(weapons, makeBroken);

console.log(brokenWeapons);

_.filter = (list, callback) => {
  // only contains values that return true from the callback
  const output = [];
  
  for(let i = 0; i < list.length; i++) {
    if(callback(list[i], i, list) === true) {
      output.push(list[i]);
    }
  }

  /* can also use _.each
   *
   * _.each(list, () => {
   *   if(callback(list[i], i, list)) {
   *     output.push(list[i]);
   *   }
   * });
  */

  return output;
}

names = ['reet', 'sean', 'jordan', 'jp', 'eamon'];

names = _.filter(names, (name, i, list) => name.length > 4 ? true : false );

console.log(names);

// Kyle Simpson's You Don't Know JS workshop
// Seems faster paced and more geared towards intermediate and advanced users of Javascript

console.log("You don't know JS");

console.log(Object.is(NaN, NaN));

if(!Object.is || true) {
	Object.is = (a, b) => {
		if(Number.isNaN(a) && Number.isNaN(b)) { // NaN doesn't equal itself... wut
			return true;
		} else if(a === 0 || b === 0) {
			return isNegZero(a) == isNegZero(b); // 0 === -0 also wut
		} else {
			return a === b;
		}

		function isNegZero(v) {
			return v == 0 && (1/v) == -Infinity
		}
	};
}

// tests:
console.log('Object.is Tests');
console.log(Object.is(42,42) === true);
console.log(Object.is("foo","foo") === true);
console.log(Object.is(false,false) === true);
console.log(Object.is(null,null) === true);
console.log(Object.is(undefined,undefined) === true);
console.log(Object.is(NaN,NaN) === true);
console.log(Object.is(-0,-0) === true);
console.log(Object.is(0,0) === true);

console.log(Object.is(-0,0) === false);
console.log(Object.is(0,-0) === false);
console.log(Object.is(0,NaN) === false);
console.log(Object.is(NaN,0) === false);
console.log(Object.is(42,"42") === false);
console.log(Object.is("42",42) === false);
console.log(Object.is("foo","bar") === false);
console.log(Object.is(false,true) === false);
console.log(Object.is(null,undefined) === false);
console.log(Object.is(undefined,null) === false);

let a = ["a", 'b', 'hi'];
console.log(a.toString());