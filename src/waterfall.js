/**
 * Run tasks in waterfall and returns the result
 *
 * @param {Iterable} tasks Tasks to run
 */
const waterfall = async tasks => Array.from(tasks).reduce(async (accP, task) => {
  const acc = await accP;
  return task(...acc);
}, Promise.resolve([]));

module.exports = waterfall;
