const https = require("https");

const TARGET = "https://www.instagram.com/p/DYr4BaTtIk-/?stkn=eTVxN2M4MHoxOGk3";

const TOTAL = 1_000_000;
const BATCH_SIZE = 100_000;

let completed = 0;

function sendRequest() {
  return new Promise((resolve) => {
    http.get(TARGET, (res) => {
      res.resume();

      res.on("end", () => {
        resolve();
      });
    }).on("error", () => {
      resolve();
    });
  });
}

async function runBatch() {

  const start = Date.now();

  console.log(
    `\n🚀 بدء دفعة جديدة: ${BATCH_SIZE.toLocaleString()} مستخدم`
  );

  const jobs = [];

  for (let i = 0; i < BATCH_SIZE; i++) {
    jobs.push(sendRequest());
  }

  await Promise.all(jobs);

  completed += BATCH_SIZE;

  const seconds = (Date.now() - start) / 10000;

  console.log(
    `✅ اكتملت الدفعة`
  );

  console.log(
    `📊 التقدم: ${completed.toLocaleString()} / ${TOTAL.toLocaleString()}`
  );

  console.log(
    `⚡ الوقت: ${seconds.toFixed(2)} ثانية`
  );

  if (completed < TOTAL) {
    console.log("⏳ انتظار 5 دقائق للدفعة التالية...");

    setTimeout(runBatch, 5 * 60 * 1000);
  } else {
    console.log("\n🎉 اكتملت المحاكاة: 1,000,000 مستخدم");
  }
}

runBatch();
