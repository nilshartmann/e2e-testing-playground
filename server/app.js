const express = require("express");
const bodyParser = require("body-parser");

const createApp = (db, requireLogin) => {
  const app = express();

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  const sessions = {};
  let sessionCounter = 0;

  app.post("/login", ({ body }, res) => {
    console.log("body", body);
    const { username, password } = body;

    console.log("username", username, "password", password);

    if (username === "paul" && password === "secret") {
      const sessionId = `SESSION_${sessionCounter++}`;
      sessions[sessionId] = { username };
      // slow down just for testing
      setTimeout(
        () =>
          res.send({
            token: sessionId,
            user: "Paul Meier"
          }),
        500
      );
    } else {
      res.status(401).send({ error: "Invalid or missing credentials" });
    }
  });

  if (requireLogin) {
    // "Protected" API
    app.use(function(req, res, next) {
      const token = req.get("AUTH_TOKEN");
      console.log(token);
      if (!sessions[token]) {
        return res.status(401).send({ error: "Not authorized" });
      }
      next();
    });
  }

  // Return all greetings
  app.get("/greetings", (req, res) => res.json(db.findAll()));

  // Return greeting with specified id (or 404)
  app.get("/greetings/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const greeting = db.findById(id);

    if (!greeting) {
      return res.status(404).json({ error: `Greeting '${id}' not found` });
    }

    return res.json(greeting);
  });

  app.get("/servererror", (req, res) => {
    return res.status(500).json({ error: "Ups. Server Error." });
  });

  app.get("/clienterror", (req, res) => {
    return res.status(400).json({ error: "Client Error!" });
  });

  // create new greeting
  app.post("/greetings", (req, res) => {
    const greeting = req.body;
    if (!greeting) {
      return res.status(400).json({ error: "Greeting must be defined" });
    }

    if (!greeting.name) {
      return res.status(400).json({ error: "greeting.name must be defined" });
    }

    if (!greeting.greeting) {
      return res.status(400).json({ error: "greeting.greeting must be defined" });
    }

    const newId = db.insert(req.body);
    return res.status(201).json({ id: newId });
  });

  return app;
};

module.exports = createApp;
