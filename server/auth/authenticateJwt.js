const jwt = require("jsonwebtoken");
const express = require("express");

const authenticateJwt = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(token);
      jwt.verify(token, "Hello", (err, user) => {
        if (err) return res.status(402).send(`UnAuthorised:${err}`);

        req.headers["user"] = user;
        next();
      });
    } else {
      res.status(404).send("Token not fetched");
    }
  } catch (error) {
    res.status(500).send(`Error in Authentication:${error}`);
  }
};

module.exports = authenticateJwt;
