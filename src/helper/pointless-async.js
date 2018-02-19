module.exports = (name, delay) =>
  new Promise((resolve) => {
    console.log('Start:', name);
    setTimeout(() => {
      console.log('Finish:', name);
      resolve(name);
    }, delay);
  });
