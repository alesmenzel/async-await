module.exports = (name, delay, ...values) => {
  const returnValues = values.length ? values : name;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(returnValues);
    }, delay);
  });
};
