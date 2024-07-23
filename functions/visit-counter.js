const mysql = require("mysql");

exports.handler = async function (event, context) {
  // Crea una nuova connessione per ogni richiesta
  const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  // Avvolgi la connessione in una Promise per facilitare l'uso con async/await
  return new Promise((resolve, reject) => {
    // Connetti al database
    connection.connect((err) => {
      if (err) {
        console.error("Errore di connessione al database:", err);
        return reject({
          statusCode: 500,
          body: JSON.stringify({ error: "Errore di connessione al database" }),
        });
      }

      // Esegui la query
      connection.query(
        "SELECT count FROM visits WHERE id = 1",
        (error, results) => {
          if (error) {
            console.error("Errore nella query del database:", error);
            connection.end(); // Assicurati di chiudere la connessione
            return reject({
              statusCode: 500,
              body: JSON.stringify({
                error: "Errore nella query del database",
              }),
            });
          }

          // Chiudi la connessione
          connection.end();

          resolve({
            statusCode: 200,
            body: JSON.stringify({ visit_count: results[0].count }),
          });
        }
      );
    });
  });
};
