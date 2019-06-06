const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const stripe = require("stripe")("sk_test_NHL2UM6U6pQUXDgDxeLADCIR00AVCMTlSP");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(bodyParser.json());

router.post("/payment", async (req, res) => {
  console.log("yeah");
  console.log("req :", req.body.source);
  // toujours utile?

  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      // description: req.body.description,
      source: req.body.source
    });

    console.log(status);

    res.json({ status });
  } catch (err) {
    console.log("ERROR", err);

    res.status(500).end();
  }
});

module.exports = router;
