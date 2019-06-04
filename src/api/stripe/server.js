const app = require("express")();
const stripe = require("stripe")("sk_test_NHL2UM6U6pQUXDgDxeLADCIR00AVCMTlSP");

app.use(require("body-parser").text());

app.post("/payment", async (req, res) => {
  console.log("req :", req.body);

  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
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
app.listen(9000, () => console.log("Listening on port 9000"));
