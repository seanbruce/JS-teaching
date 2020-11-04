//TypeError: Cannot read property 'xxxxxx' of undefined

function thisMaybeNotExist() {
  console.log(this.name)
}

// run the function above in strict mode you'll see the error

// the possible value of this
// 1. undefined
// 2. ???
// 3. ???
// 4. ???
// 5. ???

// the value of this is determined by the way the function been called

// 1. direct function invocation
function foo() {
  console.log(this.name)
}

foo()

// this is pointing to the global object,
// in browser the object is window or global in node environment
// or in "strict mode", this' value will be undefined

// 2. function called as method of an object
const obj = {
  name: 'jobs',
  foo() {
    console.log(this.name)
  }
}

obj.foo(); // --> 'jobs'

// method never truly belongs to an object
const foo = obj.foo
foo(); // --> oops! TypeError: Cannot read property 'name' of undefined


// 3. function called as constructor
function person(name) {
  this.name = name
  console.log(this.name)
}

person.prototype.foo = function() {
  console.log(this.name)
}

const p1 = new Person()
p1.constructor === person // -> true, but p1 doesn't have property called constructor
Object.getPrototypeOf(p1) === Person.prototype // -> true
Object.getPrototypeOf(Person) === Function.prototype // -> true


// 4. change 'this' using call, apply and bind method in Function.prototype

function foo() {
  console.log(this)
}

const obj = {
  name: 'sean'
}

foo.call(obj); // -> {name: 'sean'}
foo.apply(obj); // -> {name: 'sean'}
foo.bind(obj)(); // -> {name: 'sean'}

//5 ES6 arrow function use parent function this value

const obj = {
  name: 'sean',
  getPrintName() {
    return () => console.log()
  }
}

const printName = obj.getPrintName()
printName() // -> 'sean'

// 1. undefined or window or global
// 2. obj.method() 'this' in method will be obj
// 3. new Foo() 'this' in Foo will be newly created obj
// 4. apply, call, bind
// 5. arrow function use parent function this value

// compare with closure