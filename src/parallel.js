const _ = require('lodash');
const isIterable = require('./helper/is-iterable');
const series = require('./series');

/**
 * @param {Iterable} tasks
 */
const parallelIterable = async (tasks, limit) => {
  const input = Array.from(tasks);

  if (!limit) {
    const promises = input.map(task => task());
    return Promise.all(promises);
  }

  const chunks = _(input)
    .chunk(limit)
    .map(chunk => () => parallelIterable(chunk, 0))
    .value();
  const res = await series(chunks);
  return _.flatten(res);
};

/**
 * @param {Object} tasks
 */
const parallelObject = async (tasks, limit) => {
  const tasksArray = Object.values(tasks);

  let resArray;
  if (!limit) {
    resArray = await parallelIterable(tasksArray);
  } else {
    resArray = {};
    let i = 0;

    const runNext = async () => {
      if (i >= tasksArray.length) return undefined;
      const index = i;
      i += 1;
      const result = await tasksArray[index]();
      resArray[index] = result;
      return runNext();
    };

    await Promise.all(tasksArray.slice(0, limit).map(runNext));
  }

  return Object.keys(tasks).reduce((acc, key, index) => {
    acc[key] = resArray[index];
    return acc;
  }, {});
};

/**
 * Runs tasks in parallel
 *
 * @param {Object|Iterable} tasks Collection of tasks
 * @param {Number} limit (Optional) Limit the number of concurrent tasks (default: 0 [unlimited])
 */
const parallel = (tasks, limit = 0) => {
  if (isIterable(tasks)) {
    return parallelIterable(tasks, limit);
  }

  return parallelObject(tasks, limit);
};

module.exports = parallel;
