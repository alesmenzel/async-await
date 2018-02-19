# Async/await utility functions

This library provides control flow utility functions for async/await. Since async/await returns promises, you can also use it with plain `.then` and `.catch`.
Includes the following:

* [`paralell`](#parallel) - Run any number of tasks in parallel
* [`parallelLimit`](#parallel) Runs maximum of `{limit}` number of tasks in parallel
* [`waterfall`](#waterfall) - Run tasks one by one, passing down the result of previous task
* [`series`](#series) - Runs tasks in a series

## Instalation

`npm install async-await-control`

or if you use yarn

`yarn add async-await-control`

## Usage

### [Parallel / Parallel limit](#parallel)

Run any number of tasks in parallel

#### Parameters

| Name  |        Type        |                                                                                   Description |
| ----- | :----------------: | --------------------------------------------------------------------------------------------: |
| tasks | Iterable\|Object | A collection of async functions to run. Each async function must return a Promise or a value. |
| limit |       Number       |                                                            Limit the number of parallel tasks |

```javascript
// tasks can be Array/Iterable/Object
const tasks = {
  first: () => Promise.resolve(1),
  second: () => Promise.resolve(2),
  third: () => Promise.resolve(3)
};

const res = await parallel(tasks, 2);
// { first: 1, second: 2, third: 3 }
```

### [Waterfall](#waterfall)

Run tasks one by one, passing down the result of previous task

#### Waterfall

| Name  |        Type        |                                                                                                                                                                    Description |
| ----- | :----------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| tasks | Iterable | An array of async functions to run. Each function should complete with any number of result values. The result values will be passed as arguments, in order, to the next task. |

Returns array of results or a single value if only single value is passed in the last iteratee.

```javascript
const tasks = [
  () => Promise.resolve(1),
  (a) => Promise.resolve([1, 2]),
  (a, b) => Promise.resolve([3, 4]),
];

const res = await waterfall(tasks);
// [4, 5]


const tasks = [
  () => Promise.resolve(1),
  (a) => Promise.resolve([1, 2]),
  (a, b) => Promise.resolve(3),
];

const res = await waterfall(tasks);
// 3
```

### [Series](#series)

Runs tasks in a series

#### Series

| Name  |        Type        |                                                                                                                                                                    Description |
| ----- | :----------------: | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| tasks | Iterable | An array of async functions to run. Each function should return a Promise or a value. |

```javascript
const tasks = [
  () => Promise.resolve(1),
  () => Promise.resolve([1, 2]),
  () => Promise.resolve([3, 4]),
];

const res = await waterfall(tasks);
// [1, [1, 2], [3, 4]]
```
