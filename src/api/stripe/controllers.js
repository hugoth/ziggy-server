const stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

//Achat unique
(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        //user_email: "user@example.com", remplace t-il de la 10 a 14eme ligne
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        deliveryAddress: req.body.deliveryAddress,
        billingAddress: req.body.billingAddress,
        species: req.body.species,
        title: req.body.title,
        description: req.body.Description,
        id: req.body.id,
        priceperbag: req.body.PricePerBag,
        caloriesperbag: req.body.CaloriesperBag,
        amount: req.body.amount,
        currency: "eur",
        quantity: req.body.quantity
      }
    ],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel"
  });
})();

//Abonnement

(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    subscription_data: {
      items: [
        {
          plan: ""
        }
      ]
    },
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel"
  });
})();
