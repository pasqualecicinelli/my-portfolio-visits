const express = require("express");
const { google } = require("googleapis");
const app = express();
const port = process.env.PORT || 3000;

const VIEW_ID = "8499870221";
const KEY_FILE = "path/to/your/service-account-file.json";

const jwtClient = new google.auth.JWT(
  require(KEY_FILE).client_email,
  null,
  require(KEY_FILE).private_key,
  ["https://www.googleapis.com/auth/analytics.readonly"]
);

app.get("/visits", async (req, res) => {
  try {
    await jwtClient.authorize();
    const analytics = google.analytics("v3");
    const response = await analytics.data.ga.get({
      auth: jwtClient,
      ids: "ga:" + VIEW_ID,
      "start-date": "30daysAgo",
      "end-date": "today",
      metrics: "ga:pageviews",
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
