const isIterable = require('./helper/is-iterable');

/**
 * Run tasks in waterfall and returns the result
 *
 * @param {Iterable} tasks Tasks to run
 */
const waterfall = async tasks => Array.from(tasks).reduce(async (accP, task) => {
  const acc = await accP;
  if (isIterable(acc)) {
    return task(...acc);
  }
  return task(acc);
}, Promise.resolve([]));

module.exports = waterfall;
