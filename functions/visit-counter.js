// functions/visit-counter.js
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

exports.handler = (event, context, callback) => {
  connection.connect();

  connection.query(
    "SELECT count FROM visits WHERE id = 1",
    (error, results, fields) => {
      if (error) {
        connection.end();
        return callback(null, {
          statusCode: 500,
          body: JSON.stringify({ error: error.message }),
        });
      }

      let currentCount = results[0].count;
      let newCount = currentCount + 1;

      connection.query(
        "UPDATE visits SET count = ? WHERE id = 1",
        [newCount],
        (error, results, fields) => {
          connection.end();

          if (error) {
            return callback(null, {
              statusCode: 500,
              body: JSON.stringify({ error: error.message }),
            });
          }

          return callback(null, {
            statusCode: 200,
            body: JSON.stringify({ count: newCount }),
          });
        }
      );
    }
  );
};
