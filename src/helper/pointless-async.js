module.exports = (name, delay, ...values) => {
  const returnValues = values.length ? values : name;

  return new Promise(resolve => {
    console.log('Start:', name);
    setTimeout(() => {
      console.log('Finish:', name);
      resolve(returnValues);
    }, delay);
  });
};
