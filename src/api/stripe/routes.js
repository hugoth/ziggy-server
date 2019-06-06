const express = require("express");
const router = express.Router();

const stripe = require("stripe")("sk_test_NHL2UM6U6pQUXDgDxeLADCIR00AVCMTlSP");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.use(require("body-parser").text());

router.post("/payment", async (req, res) => {
  console.log("yeah");
  console.log("req :", req.body);
  // toujours utile?
  try {
    let { status } = await stripe.charges.create({
      amount: 3000,
      currency: "eur",
      description: "An example payment",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    console.log("ERROR", err);

    res.status(500).end();
  }
});

module.exports = router;
