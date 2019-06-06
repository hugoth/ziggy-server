const stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

// Créez un plan mensuel.
/*const plan = await stripe.plans.create({
  amount: 999,
  currency: "eur",
  interval: "month",
  product: {
    name: "Platinum Personal"
  }
});
const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  plan: plan.id,
  Reduction: Number
});*/
