const Agile = require("../models/agile.model");

exports.all = (req, res) => {
  Agile.all((err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
    });
  });
};

exports.getById = (req, res) => {
  Agile.getById(req.params.id, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data,
    });
  });
};

exports.create = (req, res, next) => {
  var errors = [];

  if (!req.body.type) {
    errors.push("No type selected");
  }

  if (!req.body.description) {
    errors.push("No description specified");
  }

  if (errors.length) {
    res.status(400).json({ error: errors.join(", ") });
    return;
  }

  Agile.create(req.body, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data.data,
      id: data.id,
    });
  });
};

exports.update = (req, res) => {
  var body = {
    type: req.body.type,
    description: req.body.description,
  };

  Agile.update({ id: req.params.id, params: body }, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: data.data,
      changes: data.changes,
    });
  });
};

exports.delete = (req, res) => {
  Agile.delete(req.params.id, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "deleted",
      changes: data.changes,
    });
  });
};
