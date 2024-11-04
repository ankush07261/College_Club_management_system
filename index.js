const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const connection = require("./database");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/home", (req, res) => {
  res.render("home");
});

app.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let loginid = req.body.id;

  try {
    if (
      (loginid === "admin" && username === "admin" && password === "admin") ||
      (loginid === "1JT20CS403" &&
        username === "IEEELOG" &&
        password === "IEEE24CS") ||
      (loginid === "1JT21EC055" &&
        username === "IEEELOG" &&
        password === "IEEE24CS") ||
      (loginid === "1JT22EC089" &&
        username === "IEEELOG" &&
        password === "IEEE24CS") ||
      (loginid === "1JT20EC130" &&
        username === "IOTECHLOG" &&
        password === "IOTECHCLUB23EC") ||
      (loginid === "1JT21CS098" &&
        username === "TECHNOCLUBLOG" &&
        password === "TECHNOCLUB21CS") ||
      (loginid === "1JT21CS122" &&
        username === "TECHNOCLUBLOG" &&
        password === "TECHNOCLUB21CS") ||
      (loginid === "1JT23CS022" &&
        username === "TECHNOCLUBLOG" &&
        password === "TECHNOCLUB21CS") ||
      (loginid === "1JT23EC116" &&
        username === "IOTECHLOG" &&
        password === "IOTECHCLUB23EC")
    ) {
      res.render("home");
    } else {
      res.redirect("/");
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// CLUB TABLE
app.get("/club", (req, res) => {
  query = "select * from club";
  tableName = query.substring(13);
  tableNames = tableName;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error", {
        message:
          "An error occurred while executing the query. \n \n Kindly check for the correctness of your query",
      });
    } else {
      res.render("results/clubResult", { result, tableName });
      console.log({ result });
      console.log(tableNames);
    }
  });
});
app.post("/club", (req, res) => {
  const club_id = req.body.club_id;
  const club_name = req.body.club_name;
  const club_memberCount = req.body.club_memberCount;

  if (club_id && club_name && club_memberCount) {
    // Insertion
    const sql =
      "INSERT INTO club (CLUB_ID, CLUB_NAME, NO_OF_MEMBERS) VALUES (?, ?, ?)";
    connection.query(
      sql,
      [club_id, club_name, club_memberCount],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error occurred during insertion.");
        }
        return res.redirect("/club");
      }
    );
  } else {
    // Deletion
    const id = req.body.club_id;
    if (!id) {
      return res.status(400).send("ID parameter is required");
    }
    const deleteSql = `DELETE FROM club WHERE CLUB_ID = ${id}`;
    connection.query(deleteSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during deletion.");
      }
      console.log("Deleted");
      return res.redirect("/club");
    });
  }
});

// ACCOUNTS
app.get("/accounts", (req, res) => {
  query = "select * from accounts";
  tableName = query.substring(13);
  tableNames = tableName;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error", {
        message:
          "An error occurred while executing the query. \n \n Kindly check for the correctness of your query",
      });
    } else {
      res.render("results/accountsResult", { result, tableName });
      console.log({ result });
      console.log(tableNames);
    }
  });
});
app.post("/accounts", (req, res) => {
  const { ACCOUNT_NO, AVAILABLE_BALANCE, CLUB_ID } = req.body;

  if (ACCOUNT_NO && AVAILABLE_BALANCE && CLUB_ID) {
    // Insertion
    const sql =
      "INSERT INTO accounts (ACCOUNT_NO, AVAILABLE_BALANCE, CLUB_ID) VALUES (?, ?, ?)";
    connection.query(
      sql,
      [ACCOUNT_NO, AVAILABLE_BALANCE, CLUB_ID],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error occurred during insertion.");
        }
        return res.redirect("/accounts");
      }
    );
  } else {
    // Deletion
    if (!ACCOUNT_NO) {
      return res.status(400).send("ACCOUNT_NO parameter is required");
    }
    const deleteSql = `DELETE FROM accounts WHERE ACCOUNT_NO = ${ACCOUNT_NO}`;
    connection.query(deleteSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during deletion.");
      }
      console.log("Deleted");
      return res.redirect("/accounts");
    });
  }
});

// CLUB EVENTS
app.get("/club_events", (req, res) => {
  query = "select * from club_events";
  tableName = query.substring(13);
  tableNames = tableName;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error", {
        message:
          "An error occurred while executing the query. \n \n Kindly check for the correctness of your query",
      });
    } else {
      res.render("results/club_eventsResult", { result, tableName });
      console.log({ result });
      console.log(tableNames);
    }
  });
});
app.post("/club_events", (req, res) => {
  const {
    EVENT_ID,
    EVENT_NAME,
    CLUB_ID,
    EVENT_DATE,
    EVENT_TIME,
    PLACE,
    DESCRIPTIONS,
    PARTICIPATION_COUNT,
  } = req.body;

  if (
    EVENT_ID &&
    EVENT_NAME &&
    CLUB_ID &&
    EVENT_DATE &&
    EVENT_TIME &&
    PLACE &&
    DESCRIPTIONS &&
    PARTICIPATION_COUNT
  ) {
    // Insertion
    const sql =
      "INSERT INTO club_events (EVENT_ID, EVENT_NAME, CLUB_ID, EVENT_DATE, EVENT_TIME, PLACE, DESCRIPTIONS, PARTICIPATION_COUNT) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [
        EVENT_ID,
        EVENT_NAME,
        CLUB_ID,
        EVENT_DATE,
        EVENT_TIME,
        PLACE,
        DESCRIPTIONS,
        PARTICIPATION_COUNT,
      ],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error occurred during insertion.");
        }
        return res.redirect("/club_events");
      }
    );
  } else {
    // Deletion
    if (!EVENT_ID) {
      return res.status(400).send("EVENT_ID parameter is required");
    }
    const deleteSql = `DELETE FROM club_events WHERE EVENT_ID = ${EVENT_ID}`;
    connection.query(deleteSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during deletion.");
      }
      console.log("Deleted");
      return res.redirect("/club_events");
    });
  }
});

// CLUB HEADS
app.get("/club_heads", (req, res) => {
  query = "select * from club_heads";
  tableName = query.substring(13);
  tableNames = tableName;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error", {
        message:
          "An error occurred while executing the query. \n \n Kindly check for the correctness of your query",
      });
    } else {
      res.render("results/club_headsResult", { result, tableName });
      console.log({ result });
      console.log(tableNames);
    }
  });
});
app.post("/club_heads", (req, res) => {
  const {
    MEMBER_ID,
    CLUB_ID,
    FNAME,
    LNAME,
    EMAIL,
    MEMBER_PHONE,
    SEMESTER,
    DESIGNATION,
  } = req.body;

  if (
    MEMBER_ID &&
    CLUB_ID &&
    FNAME &&
    LNAME &&
    EMAIL &&
    MEMBER_PHONE &&
    SEMESTER &&
    DESIGNATION
  ) {
    // Insertion
    const sql =
      "INSERT INTO club_heads (MEMBER_ID, CLUB_ID, FNAME, LNAME, EMAIL, MEMBER_PHONE, SEMESTER, DESIGNATION) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [
        MEMBER_ID,
        CLUB_ID,
        FNAME,
        LNAME,
        EMAIL,
        MEMBER_PHONE,
        SEMESTER,
        DESIGNATION,
      ],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error occurred during insertion.");
        }
        return res.redirect("/club_heads");
      }
    );
  } else {
    // Deletion
    if (!MEMBER_ID) {
      return res.status(400).send("MEMBER_ID parameter is required");
    }
    const deleteSql = `DELETE FROM club_heads WHERE MEMBER_ID = ${MEMBER_ID}`;
    connection.query(deleteSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during deletion.");
      }
      console.log("Deleted");
      return res.redirect("/club_heads");
    });
  }
});

// LOGISTICS
app.get("/logistics", (req, res) => {
  query = "select * from logistics";
  tableName = query.substring(13);
  tableNames = tableName;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error", {
        message:
          "An error occurred while executing the query. \n \n Kindly check for the correctness of your query",
      });
    } else {
      res.render("results/logisticsResult", { result, tableName });
      console.log({ result });
      console.log(tableNames);
    }
  });
});
app.post("/logistics", (req, res) => {
  const { EVENT_ID, FUNDS_AVAILABLE } = req.body;

  if (EVENT_ID && FUNDS_AVAILABLE) {
    // Insertion
    const sql =
      "INSERT INTO logistics (EVENT_ID, FUNDS_AVAILABLE) VALUES (?, ?)";
    connection.query(sql, [EVENT_ID, FUNDS_AVAILABLE], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during insertion.");
      }
      return res.redirect("/logistics");
    });
  } else {
    // Deletion
    if (!EVENT_ID) {
      return res.status(400).send("EVENT_ID parameter is required");
    }
    const deleteSql = `DELETE FROM logistics WHERE EVENT_ID = ${EVENT_ID}`;
    connection.query(deleteSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during deletion.");
      }
      console.log("Deleted");
      return res.redirect("/logistics");
    });
  }
});

// MEMBER CLUBS
app.get("/member_clubs", (req, res) => {
  query = "select * from member_clubs";
  tableName = query.substring(13);
  tableNames = tableName;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error", {
        message:
          "An error occurred while executing the query. \n \n Kindly check for the correctness of your query",
      });
    } else {
      res.render("results/member_clubsResult", { result, tableName });
      console.log({ result });
      console.log(tableNames);
    }
  });
});
app.post("/member_clubs", (req, res) => {
  const { MEMBER_ID, CLUB_ID } = req.body;

  if (MEMBER_ID && CLUB_ID) {
    // Insertion
    const sql = "INSERT INTO member_clubs (MEMBER_ID, CLUB_ID) VALUES (?, ?)";
    connection.query(sql, [MEMBER_ID, CLUB_ID], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during insertion.");
      }
      return res.redirect("/member_clubs");
    });
  } else {
    // Deletion
    if (!MEMBER_ID) {
      return res.status(400).send("MEMBER_ID parameter is required");
    }
    const deleteSql = `DELETE FROM member_clubs WHERE MEMBER_ID = ${MEMBER_ID}`;
    connection.query(deleteSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during deletion.");
      }
      console.log("Deleted");
      return res.redirect("/member_clubs");
    });
  }
});

// MEMBERS
app.get("/members", (req, res) => {
  query = "select * from members";
  tableName = query.substring(13);
  tableNames = tableName;
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render("error", {
        message:
          "An error occurred while executing the query. \n \n Kindly check for the correctness of your query",
      });
    } else {
      res.render("results/membersResult", { result, tableName });
      console.log({ result });
      console.log(tableNames);
    }
  });
});

app.post("/members", (req, res) => {
  const { MEMBER_ID, FNAME, LNAME, EMAIL, MEMBER_PHONE, SEMESTER } = req.body;

  if (MEMBER_ID && FNAME && LNAME && EMAIL && MEMBER_PHONE && SEMESTER) {
    // Insertion
    const sql = "call AddNewMember(?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [MEMBER_ID, FNAME, LNAME, EMAIL, MEMBER_PHONE, SEMESTER],
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error occurred during insertion.");
        }
        return res.redirect("/members");
      }
    );
  } else {
    // Deletion
    if (!MEMBER_ID) {
      return res.status(400).send("MEMBER_ID parameter is required");
    }
    const deleteSql = `DELETE FROM members WHERE MEMBER_ID = ${MEMBER_ID}`;
    connection.query(deleteSql, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error occurred during deletion.");
      }
      console.log("Deleted");
      return res.redirect("/members");
    });
  }
});

// ===============================================

app.post("/home", (req, res) => {
  const query = req.body.query;
  connection.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).render("error", {
        message:
          "An error occurred while executing the query. Please check the correctness of your SQL query.",
      });
    } else {
      res.render("results/query-result", { result });
      console.log(result);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
