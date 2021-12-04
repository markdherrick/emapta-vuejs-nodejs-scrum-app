var sqlite3 = require("sqlite3").verbose();
var md5 = require("md5");

const DBSOURCE = "./db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE agile_software_development (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description text,
            type text
            )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO agile_software_development (type, description) VALUES (?,?)";
          db.run(insert, [
            "value",
            "Individuals and interactions over processes and tools.",
          ]);
          db.run(insert, [
            "value",
            "Working software over comprehensive documentation.",
          ]);
          db.run(insert, [
            "value",
            "Customer collaboration over contract negotiation.",
          ]);
          db.run(insert, [
            "value",
            "Responding to change over following a plan.",
          ]);
          db.run(insert, [
            "principle",
            "Customer satisfaction through continuous delivery of the product.",
          ]);
          db.run(insert, [
            "principle",
            "Divide large chunks of work into smaller and achievable tasks for quicker completion and easier integration of changes.",
          ]);
          db.run(insert, [
            "principle",
            "Adhere to the decided timeframe for the delivery of a working product.",
          ]);
          db.run(insert, [
            "principle",
            "All stakeholders must frequently collaborate to ensure that the project is going in the correct direction.",
          ]);
          db.run(insert, [
            "principle",
            "Create a supportive environment to motivate team members and encouraging them to get the job done.",
          ]);
          db.run(insert, [
            "principle",
            "Prefer face-to-face communication over other methods.",
          ]);
          db.run(insert, [
            "principle",
            "Working software is the primary measure of progress.",
          ]);
          db.run(insert, [
            "principle",
            "Try to maintain a constant pace of development.",
          ]);
          db.run(insert, [
            "principle",
            "Maintain the quality of the product by paying attention to technical details.",
          ]);
          db.run(insert, ["principle", "Maintain simplicity."]);
          db.run(insert, [
            "principle",
            "Promote self-organization in the team.",
          ]);
          db.run(insert, [
            "principle",
            "Regularly reflect on your performance for continuous improvement.",
          ]);
        }
      }
    );
  }
});

module.exports = db;
