//'sk_test_51Iw7Z9SDHU6i7As7VTfs9kP7T3hmgA09oBI5bOzGQbrLFhvaWRnQ3VwFB1uoxgU0k8TeY2bWc9TvFbbJneckkLfD006sVohtXu')
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "pk_test_51Iw7Z9SDHU6i7As7elUU3f0IbmdaarHEYEOVjMMRkg1NVyZnmzEYutTmPXVxHYsmPqQ6Yjqcjx5gbsLDZWuHdZsb00IP8zGIlm"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
//http://localhost:5001/clone-4d3a2/us-central1/api    -mera h 