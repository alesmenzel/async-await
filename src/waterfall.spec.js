const { expect } = require('chai');

const asyncFunction = require('./helper/pointless-async');
const waterfall = require('./waterfall');

describe('waterfall', () => {
  it('runs tasks in waterfall for iterable', async () => {
    const tasks = {
      * [Symbol.iterator]() {
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

  it('runs tasks in waterfall for array', async () => {
    const tasks = [
      () => asyncFunction('first', 5, 'first'),
      (...resFirst) => {
        expect(resFirst).to.be.deep.equal(['first']);
        return asyncFunction('second', 3, 1, 2, 3);
      },
      (...resSecond) => {
        expect(resSecond).to.be.deep.equal([1, 2, 3]);
        return asyncFunction('third', 1, 4, 5);
      },
    ];

    const res = await waterfall(tasks);
    expect(res).to.be.deep.equal([4, 5]);
  });
});
