// some of the code below are quoted from the Dan Abramov's website whatthefuck.is

// Scope of variable
var globalVariable = 'global';
function outerFunction() {
  var outerVariable = 'hello';
  console.log(outerVariable); // A
  console.log(innerVariable); // B
  function innerFunction() {
    var innerVariable = 'world';
    console.log(outerVariable); // C
    console.log(innerVariable); // D
  }
}
outerFunction();

// tl;dr You have a closure when a function accesses variables defined outside of it
//                                                                         --Dan Abramov

// recognize closure
let users = ['Alice', 'Dan', 'Jessica'];
let query = 'A';
let user = users.filter((user) => user.startsWith(query));

// classic closure(if you don't understand it properly) problem and solution
let greetingFns = [];
for (var i = 0; i < 10; i++) {
  greetingFns.push(function () {
    console.log(`greeting ${i}`);
  });
}

for (var j = 0; j < greetingFns.length; j++) {
  greetingFns[j]();
}

// solution 1 - use IIFE closure
for (var i = 0; i < 10; i++) {
  (function (i) {
    var k = i;
    greetingFns.push(function () {
      console.log(`greeting ${k}`);
    });
  })(i);
}

// how for works
var i = 0;
for (;;) {
  if (i < 10) break;
  i++;
}

// variable shadowing
function a() {
  var i = 1;
  function b() {
    var i = 2;
    function c() {
      var i = 3;
      console.log(i);
    }
  }
}
// function parameter
function foo(name) {}
function foo() {
  var name;
}

// cloud also be written as separate function instead of IIFE(immediately-invoked function expression)
function capture(i) {
  greetingFns.push(function () {
    // here i is close over i from parameter
    console.log(`greeting ${i}`);
  });
}

for (var i = 0; i < 10; i++) {
  capture(i);
}

// solution 2 - use block variable
for (let i = 0; i < 10; i++) {
  greetingFns.push(function () {
    console.log(`greeting ${i}`);
  });
}

// it works like
{
  let i = 1;
  greetingFns.push(function () {
    console.log(`greeting ${i}`);
  });
}

{
  let i = 2;
  greetingFns.push(function () {
    console.log(`greeting ${i}`);
  });
}

{
  let i = 3;
  greetingFns.push(function () {
    console.log(`greeting ${i}`);
  });
}

// Babel.js time!!!
// https://babeljs.io/repl#?browsers=ie%208&build=&builtIns=false&spec=false&loose=false&code_lz=GYewTgFANgpgLgAgJYILwIAwG5kIDwICM2yA1KQJQIDeAUAggMYgB2AziLAHRQgDmEJBVoBfWrVCRYiFOhIoCxHEnJU6DAIZgwXAA4BXNgAsIwfS0ZwkrCGvoMmrDt14Ch9kcJFA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.12.3&externalPlugins=

// use case
// 1. JavaScript Module

// internalConstant defined in the global
var internalConstant = 3.14;
function calculateAnswer(number) {
  return internalConstant + number;
}

calculateAnswer(46);

var myModule = (function () {
  var internalConstant = 3.14;
  function calculateAnswer(number) {
    return internalConstant + number;
  }

  return {
    calculateAnswer,
  };
})();

myModule.calculateAnswer(46);

// and many other countless usage
// closure used inside our code everywhere

// mythBusters

// closure only happened when inner function return from outer function ❌

// closure has performance problem ❌

// closure has memory leak problem ❌

// summary
// 1. closure definition
// 2. closure recognization
// 3. use case
