const express = require("express");
const app = express();

function ticketCheckMiddleware(req, res, next) {
  const ticketStatus = req.query.ticket;

  if (ticketStatus.toLowerCase() === "access") {
    next();
  } else {
    res.send("Your ticket is not valid for today");
  }
}

function weightCheckMiddleware(req, res, next) {
  const weight = req.query.weight;

  if (weight >= 45 && weight < 100) {
    next(); // call the next middleware
  } else {
    res.send("Weight criteria is not satisfied !!");
  }
}

function ageCheckMiddleware(req, res, next) {
  const age = req.query.age;

  if(age >= 5 && age <= 20){
    next();
  } else {
    res.send("Age criteria not satisfied !!");
  }
}

app.use(ticketCheckMiddleware); // this middleware will be applied to all the routes mentioned from here to below not above

app.get("/flying-saucer-ride", weightCheckMiddleware, function (req, res) {
  // if control reaches here means all the condition specified in the middlewares are successfully satisfied
  res.status(200).send("Ride completed !!");
});

app.get("/carousel", ageCheckMiddleware, function (req, res) {
  // if control reaches here means all the condition specified in the middlewares are successfully satisfied
  res.status(200).send("Ride completed !!");
});

// here two middlewares needed first the control come from the ticketcheck to the weightcheck through next() will go to agecheck and then the last function
app.get("/ferris-wheel", weightCheckMiddleware, ageCheckMiddleware, function (req, res) {
  // if control reaches here means all the condition specified in the middlewares are successfully satisfied
  res.status(200).send("Ride completed !!");
});

app.listen(3000);

// below app.use is the error or exception handling function which will be executed if any exception or error comes on the server side
app.use(function (err, req, res, next){
    console.log(err); // log the error but don't get it visible to the user
    res.send("Something went wrong !!");
});
