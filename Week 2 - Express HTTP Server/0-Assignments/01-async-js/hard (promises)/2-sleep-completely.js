/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  return new Promise(function (resolve) {
    const startTime = new Date().getTime();

    while (new Date().getTime() - startTime <= milliseconds) {
      // wait till the loop condition gets false
    }

    resolve();
  });
}

module.exports = sleep;
