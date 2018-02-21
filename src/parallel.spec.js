const { expect } = require('chai');

const asyncFunction = require('./helper/pointless-async');
const parallel = require('./parallel');

describe('parallel', () => {
  it('runs tasks in parallel for iterable', async () => {
    const tasks = {
      *[Symbol.iterator]() {
        yield () => asyncFunction('first', 5);
        yield () => asyncFunction('second', 3);
        yield () => asyncFunction('third', 1);
      },
    };

    const res = await parallel(tasks);
    expect(res).to.deep.equal(['first', 'second', 'third']);
  });

  it('runs tasks in parallel for array', async () => {
    const tasks = [
      () => asyncFunction('first', 5),
      () => asyncFunction('second', 3),
      () => asyncFunction('third', 1),
    ];

    const res = await parallel(tasks);
    expect(res).to.deep.equal(['first', 'second', 'third']);
  });

  it('runs tasks in parallel for object', async () => {
    const tasks = {
      first: () => asyncFunction('first', 5),
      second: () => asyncFunction('second', 3),
      third: () => asyncFunction('third', 1),
    };

    const res = await parallel(tasks);
    expect(res).to.deep.equal({
      first: 'first',
      second: 'second',
      third: 'third',
    });
  });

  it('runs limited tasks in parallel for iterable', async () => {
    const tasks = {
      *[Symbol.iterator]() {
        yield () => asyncFunction('first', 5);
        yield () => asyncFunction('second', 3);
        yield () => asyncFunction('third', 1);
      },
    };

    const res = await parallel(tasks, 2);
    expect(res).to.deep.equal(['first', 'second', 'third']);
  });

  it('runs limited tasks in parallel for array', async () => {
    const tasks = [
      () => asyncFunction('first', 5),
      () => asyncFunction('second', 3),
      () => asyncFunction('third', 1),
    ];

    const res = await parallel(tasks, 2);
    expect(res).to.deep.equal(['first', 'second', 'third']);
  });

  it('runs limited tasks in parallel for object', async () => {
    const tasks = {
      first: () => asyncFunction('first', 5),
      second: () => asyncFunction('second', 3),
      third: () => asyncFunction('third', 1),
    };

    const res = await parallel(tasks, 2);
    expect(res).to.deep.equal({
      first: 'first',
      second: 'second',
      third: 'third',
    });
  });
});
