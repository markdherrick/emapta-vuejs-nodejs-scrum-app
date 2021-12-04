module.exports = (app) => {
  const agile = require("../controllers/agile.controller.js");

  // Get SMS Logs
  app.get("/api/agile", agile.all);
  app.get("/api/agile/:id", agile.getById);
  app.post("/api/agile", agile.create);
  app.patch("/api/agile/:id", agile.update);
  app.delete("/api/agile/:id", agile.delete);
};
