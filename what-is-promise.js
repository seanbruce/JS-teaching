const cart = [
  {
    id: 1,
    title: 'Iphone12新品',
    price: 8888
  },
  {
    id: 2,
    title: 'SK-2 神仙水',
    price: 1800
  },
]

// 3td party util function
trackGoods(cart, (error, data) => {
  if (error) {
    // oops! something went wrong
    // handle error case
  } else {
    const {truckId} = data;
    // continue business 
  }
})

// we could have a problem if...
// 1. our callback been called multiple times!
// 2. our callback doesn't been called at all!
// 3. code running order, consider this:

// A
trackGoods(cart, (error, data) => {
  // B
})
// C

// A -> C -> B ?
// if trackGoods is synchronous the order will be
// A -> B -> C
// how can you, user of trackGoods function , know which situation it is

// 4. the famous callback hell problem

doSomethingFirst(data, (ret1) => {
  doSomethingSecond(ret1, (ret2) => {
    doSomethingThird(ret2, (ret3) => {
      doSomethingFinal(ret3, (finalData) => {
        console.log(finalData)
      })
    })
  })
})

// the code formed a triangle shape ▷
// but actually callback hell code can be written flat
function doSomethingFinal(data) {
  console.log(data)
}

function doSomethingThird(data) {
  // detail
  const ret
  doSomethingFinal(ret)
}

function doSomethingSecond(data) {
  // detail
  const ret
  doSomethingThird(ret)
}

function doSomethingFirst(data) {
  // detail
  const ret
  doSomethingSecond(ret)
}

doSomethingFirst(data)

// so the true problem here is the mental burden when you try to understand callback pattern code
// 5. function composition. what if I want to do another thing parallel with doSomethingSecond()


// A Promise is an object representing the eventual completion or failure of an asynchronous operation
// hamburger king

// a promise instance has an internal state which has three possible value 'pending', 'resolved' and 'rejected

// 1. 
fetchPost().then(doSomethingWhenSuccess, doSomethingWhenFailure)
// either only doSomethingWhenSuccess or only doSomethingWhenFailure will be called and only once
// once the internal state change from 'pending' to 'resolved' or 'rejected', it'll never change again

function trackGoods(goods) {
  return new Promise((resolve, reject) => {
    ajx('http://api/track', goods, function(error, data) {
      if (error) {
        reject(error)
      } else {
        const {isSuccess, trackId, errorMsg} = data
        if (isSuccess) {
          resolve(trackId)
        } else {
          reject(errorMsg)
        }
      }
    })
  })
}
fetch('url',{method: 'POST', body: JSON.stringify({name: 'sean'})})
trackGoods(data).then()

// 2.
const timeout = (millisecond) => new Promise((_, rejected) => setTimeout(rejected, millisecond))
Promise.race([
  fetchPost(),
  timeout(3000)
]).then(handleSuccess, handleError)

// you can do this with callback pattern, but much harder.
const expiredAtDate = Date.now() + 3000
const settled = false
function myCallback(error, data) {
  if (settled) {
    return
  }
  if (Date.now() > expiredAtDate) {
    handleTimeout()
    return
  }
  if (error) {
    // ...
  } else {
    // ...
  }
  settled = true
}
function handleTimeout() {
  settled = true
}
someAsync(/*data, */ myCallback)

// 3.callback of promise is guaranteed to run after the current event loop

// A
trackGoods(cart).then(data => {
  // B
})
// C
// always A -> C -> B

// 4 chaining
// .then method return a new promise
trackGoods(data).then() // -> new Promise instance !
trackGoods(data).then((data) => {
  // do something with data
  return result
}).then(value => {
  console.log(value)
})
// if you return a non-promise value from callback of then method, your value will be warped inside a Promise
trackGoods(data).then((data) => {
  const result = 1
  return result
  // equal to return Promise.resolve(result)
})
// if you return a promise value from callback of then method, that returned Promise will be used instead.
trackGoods(data).then((data) => {
  const result = 1
  return messageCustomer(result)
  // equal to return Promise.resolve(result)
})

// it is very common to do some asynchronous task sequentially, you can write your tasks like this
task1()
.then(() => {
  return task2()
})
.then(() => {
  return task3()
})
.then(() => {
  return task4()
})
.catch(error => {
  // handleError
}) // handle error case in the end

// 5.
const t1 = task1()
  t1.then(oneThing),
  t1.then(anotherThing)

// timing
// callback registered with then and catch always run when state switch to resolved or rejected respectively even after promise settled
// multiple callback always run in the order they got registered

// Promise utility
Promise.resolve
Promise.reject
Promise.all
Promise.race


[promise1, promise2, promise3].reduce((p, f) => p.then(f), Promise.resolve()).then(final => console.log(final))
[promise1, promise2, promise3].reduce((p, f) => p.then(pResult => {
  f.then(fResult => [...pResult, fResult])
}), Promise.resolve([])).then(finalArray => console.log(finalArray))


// common mistake
task1()
  .then(() => {
    task2()
  })
  .catch(error => console.log(error))

task1()
  .then(() => {
    task2()
  })
  .then(() => {
    task3()
  })

//correct
task1()
  .then(() => {
    return task2()
  })
  .catch(error => console.log(error))