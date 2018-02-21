const { expect } = require('chai');

const asyncFunction = require('./helper/pointless-async');
const waterfall = require('./waterfall');

describe('waterfall', () => {
  it('runs tasks in waterfall for iterable', async () => {
    const tasks = {
      *[Symbol.iterator]() {
        yield () => asyncFunction('first', 5, '1', 2);
        yield (...resultsFirst) => {
          expect(resultsFirst).to.be.deep.equal(['1', 2]);
          return asyncFunction('second', 3, '3', 4, 5, 'test');
        };
        yield (...resultsSecond) => {
          expect(resultsSecond).to.be.deep.equal(['3', 4, 5, 'test']);
          return asyncFunction('third', 1, 'third');
        };
      },
    };

    const res = await waterfall(tasks);
    expect(res).to.be.deep.equal(['third']);
  });

  it('runs tasks in waterfall for array, returning single values', async () => {
    const tasks = [
      () => Promise.resolve(1),
      a => {
        expect(a).to.equal(1);
        return Promise.resolve([1, 2]);
      },
      (a, b) => {
        expect(a).to.be.deep.equal(1);
        expect(b).to.be.deep.equal(2);
        return Promise.resolve(3);
      },
    ];

    const res = await waterfall(tasks);
    expect(res).to.be.deep.equal(3);
  });

  it('runs tasks in waterfall for array, returning array of values', async () => {
    const tasks = [
      () => Promise.resolve(1),
      a => {
        expect(a).to.equal(1);
        return Promise.resolve([1, 2]);
      },
      (a, b) => {
        expect(a).to.be.deep.equal(1);
        expect(b).to.be.deep.equal(2);
        return Promise.resolve([2, 3, 4]);
      },
    ];

    const res = await waterfall(tasks);
    expect(res).to.be.deep.equal([2, 3, 4]);
  });
});
