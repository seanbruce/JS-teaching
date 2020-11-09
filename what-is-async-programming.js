
// assume we have a <script> element inside our page, and in that we have code like this:

console.log(1);
function foo() {
  setTimeout(function() {
    console.log(2)
  },0)
  function bar() {
    console.log(3)
  }
  console.log(4)
  bar()
}
foo()
console.log(5)

// what will the output look like ?

// event-loop
// JavaScript is a single thread programming language.
// A Javascript engine is a program that consumes and execute JS source efficiently and quickly
// because JS is designed to be single tread, JS engine don't know anything about asynchronous task at all

// it's very important to know that we don't use JS engine alone. instead we use browser that inside itself running JS engine.
// For example google chrome browser use V8 JS engine inside
// mention Node.js later

// a browser consist of many parts, JS engine just one of them. To handle asynchronous task we need know:
// 1. event loop is where computation happened
// 2. task queue where browser could queue new task for event loop to work later on (video: 7:20 ~ 8:57)
setTimeout(function() {
  // new task
}, 300)
// when event loop will look for new task to do ? when js call stack is empty(appendix 1)
// 3. render engine is responsible for any visual changes
// if any things happened that could affect the appearance or position of element, like change style or class properties using JS,
// or CSS property change, render engine will follow some or all of the follow steps to re-render content of screen
// a) style calculation: find out what styles applies to what element
// b) layout: base on the styles find out the space and position of elements
// c) paint: filling the pixel
// d) compositing: reordering different layers

// these steps called render steps, and those steps happens in the same thread(video: 8:57)
// window.requestAnimationFrame (12:30)
// we have roughly 16ms(10ms) time budget for every rendering(why)

// 3. micro task queue (25:38)
// micro task doesn't mean blocking free (26:58)
// tasks vs animationCallback vs micro task

// quiz(30:18)


// appendix
// 1.call stack
function c() {
  console.log('c')   // A
}

function b() {
  console.log('b')   // B
  c()
}

function a() {
  console.log('b')   // C
  b()
}

a()                  // D

// this case above we call function a which in turn call function b which in turn call function c etc....
// when function c printout, how does it know where to return ?
// from our human it's easy here, but from computer perspective, it needs to keep some information about the track of function calls
// It is called call stack. In computer science , A stack is a typical data structure that may be accessed using the LIFO(last in first out) method...
// see illustration