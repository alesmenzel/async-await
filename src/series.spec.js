const { expect } = require('chai');

const asyncFunction = require('./helper/pointless-async');
const series = require('./series');

describe('series', () => {
  it('runs tasks in series for iterable', async () => {
    const tasks = {
      *[Symbol.iterator]() {
        yield () => asyncFunction('first', 5);
        yield () => asyncFunction('second', 3);
        yield () => asyncFunction('third', 1);
      },
    };

    const res = await series(tasks);
    expect(res).to.be.deep.equal(['first', 'second', 'third']);
  });

  it('runs tasks in series for array', async () => {
    const tasks = [
      () => asyncFunction('first', 5),
      () => asyncFunction('second', 3),
      () => asyncFunction('third', 1),
    ];

    const res = await series(tasks);
    expect(res).to.be.deep.equal(['first', 'second', 'third']);
  });

  it('runs tasks in series for object', async () => {
    const tasks = {
      first: () => asyncFunction('first', 5),
      second: () => asyncFunction('second', 3),
      third: () => asyncFunction('third', 1),
    };

    const res = await series(tasks);
    expect(res).to.be.deep.equal({
      first: 'first',
      second: 'second',
      third: 'third',
    });
  });
});
