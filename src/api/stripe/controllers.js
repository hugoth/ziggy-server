const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const Meal = require("../meals/model");

async function payment(req, res) {
  console.log(req.body.id, req.body.amount, req.body.products);

  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount,
      currency: "EUR",
      description: "An example charge",
      source: req.body.id
    });
    if (status === "succeeded") {
      console.log("yeah");
    }

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
}

module.exports.payment = payment;
