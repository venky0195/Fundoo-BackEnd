const redis = require("redis");
const client = redis.createClient();
const query = "Notes_";

client.on("error", err => {
  console.error(err);
});

module.exports = {
  getNotes(data, callback) {
    client.get(query + data, (err, result) => {
      //  console.log("DATA IS ",data);
      if (result) {
        //console.log("RESULT IS ++",result);
        callback(null, result);
      } else {
        console.error("Redis Error: No notes in the redis ", err);
        callback(err);
      }
    });
  },

  addNotestoRedis(result, key) {
    try {
      // Save the notesRedis API response in Redis store
      client.set(query + key, JSON.stringify(result));
    } catch (err) {
      throw new Error("Redis Seting notes error", err);
    }
  },

  deleteRedisKey(userId) {
    try {
      client.del(query + userId, function(err, response) {
        if (response == 1) {
          console.log("Redis cache cleared successfully!", response);
        } else {
          console.log("Cannot delete", err);
        }
      });
    } catch (err) {
      throw new Error("Redis deleting key error", err);
    }
  }
};
