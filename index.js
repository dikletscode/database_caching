const axios = require("axios");
const express = require("express");
const Redis = require("./cache");

const sql = require("./lib/db");

const app = express();
/**
 * bismmillah
 * Client => request => database
 * database => respon => client
 * Client => same_request => cache
 * if cache exist => respon_f_chache => client
 * else => respond_f_database =>client
 */

app.get("/data", async (req, res) => {
  const redisKEY = "KEKEYI";
  const { response } = await Redis.getData(redisKEY);
  console.log(typeof response);
  if (response) {
    console.log("data fetched from redis");
    res.send({ response: response, flag: "via redis" });
    // Redis.remove()
  } else {
    console.log("data fatched from database");
    sql.query("SELECT * FROM produk", (err, data) => {
      Redis.setData(redisKEY, JSON.stringify(data));
      res.send({ response: data, flag: "via database" });
    });
  }
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
