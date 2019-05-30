const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment", async (req, res) => {
  try {
    console.log(req.body);
    const { status } = await stripe.charges.create({
      currency: "EUR",
      description: "Référence du produit acheté",
      amount: req.body.amount,
      source: req.body.id
    });

    res.json({ status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
