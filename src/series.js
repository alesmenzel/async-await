const isIterable = require('./helper/is-iterable');

/**
 * @param {Object} tasks
 */
const seriesObject = tasks => Object.keys(tasks).reduce(async (accP, key) => {
  const acc = await accP;
  acc[key] = await tasks[key]();
  return acc;
}, {});

/**
 * @param {Iterable} tasks
 */
const seriesIterable = tasks => Array.from(tasks).reduce(async (accP, task) => {
  const acc = await accP;
  acc.push(await task());
  return acc;
}, []);

/**
 * Run tasks in series and return the result
 *
 * @param {Object|Iterable} tasks Tasks to run
 */
const series = (tasks) => {
  if (isIterable(tasks)) {
    return seriesIterable(tasks);
  }

  return seriesObject(tasks);
};

module.exports = series;
