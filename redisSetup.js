const redis = require("redis");
const redisClient = redis.createClient({
  host: "localhost",
  password: "Kapalapi67",
  port: 6379,
});

const getData = (redisKEY) => {
  return new Promise((resolve, reject) => {
    redisClient.get(redisKEY, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve({ response });
      }
    });
  });
};
const setData = (redisKEY, redisVALUE) => {
  console.log(
    `data with key --${redisKEY} -- will change to redis `,
    redisVALUE
  );
  redisClient.set(redisKEY, redisVALUE, "EX", "30");
};
const remove = () => {
  return new Promise((resolve, reject) => {
    redisClient.flushdb(function (err, succeeded) {
      console.log(succeeded);
    });
  });
};

module.exports = {
  getData,
  setData,
  remove,
};
