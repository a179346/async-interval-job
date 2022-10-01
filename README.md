<div align="center">
<h1 align="center"> ⭕ async-interval-job ⭕</h1>

<p>
  <a href="https://github.com/a179346/async-interval-job/actions/workflows/test.yml" target="_blank">
    <img alt="Documentation" src="https://github.com/a179346/async-interval-job/actions/workflows/test.yml/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/async-interval-job" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/npm/v/async-interval-job?maxAge=3600)" />
  </a>
  <a href="https://github.com/a179346/async-interval-job#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/a179346/async-interval-job/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/a179346/async-interval-job/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/a179346/async-interval-job" />
  </a>
</p>
</div>

> setInterval for promises and async functions.
>
> Support graceful shutdown and prevent multiple executions from overlapping in time.

 ## 🔗 Link
+ [Github](https://github.com/a179346/async-interval-job#readme)
+ [npm](https://www.npmjs.com/package/async-interval-job)

## 📥 Install

```sh
npm i async-interval-job
```

## 📖 Usage
```js
import { AsyncIntervalJob } from 'async-interval-job';

const job = new AsyncIntervalJob(async () => {
    // Execute for each interval.
}, 60 * 1000);

job.start();

async function gracefulShutdown() {
    await job.stop();
    // Can close the db connections here ...
}
```

## 🏆 Overview

![image](https://github.com/a179346/async-interval-job/blob/main/flow/async-interval-job.png)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/a179346/async-interval-job/issues).

## 🌟 Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [a179346](https://github.com/a179346).<br />
This project is [MIT](https://github.com/a179346/async-interval-job/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_