var db = require("./db.js");

const Agile = function () {};

Agile.all = (result) => {
  var query = "select * from agile_software_development";
  var params = [];
  db.all(query, params, (err, rows) => {
    if (err) {
      result(null, err.message);
      return;
    }
    result(null, rows);
  });
};

Agile.getById = (id, result) => {
  var sql = "select * from agile_software_development where id = ?";
  var params = [id];
  db.get(sql, params, (err, row) => {
    if (err) {
      result(null, err.message);
    }
    result(null, row);
  });
};

Agile.create = (params, result) => {
  var data = {
    type: params.type,
    description: params.description,
  };
  var sql =
    "INSERT INTO agile_software_development (type, description) VALUES (?,?)";
  var parameters = [data.type, data.description];

  db.run(sql, parameters, function (err, row) {
    if (err) {
      result(null, err.message);
      return;
    }
    result(null, { data: row, id: this.lastID });
  });
};

Agile.update = (params, result) => {
  var sql = `UPDATE agile_software_development set 
           type = COALESCE(?,type), 
           description = COALESCE(?,description)
           WHERE id = ?`;

  db.run(
    sql,
    [params.params.type, params.params.description, params.id],
    function (err, row) {
      if (err) {
        result(null, err.message);
        return;
      }
      result(null, { data: row, changes: this.changes });
    }
  );
};

Agile.delete = (id, result) => {
  var sql = "DELETE FROM agile_software_development WHERE id = ?";
  db.run(sql, [id], function (err, row) {
    if (err) {
      result(null, err.message);
      return;
    }
    result(null, { data: row, changes: this.changes });
  });
};

module.exports = Agile;
