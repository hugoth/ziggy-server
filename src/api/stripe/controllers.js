const stripe = require("stripe")("sk_test_NHL2UM6U6pQUXDgDxeLADCIR00AVCMTlSP");
state = {
  user: {
    firstName: "",
    lastName: "",
    phone: "",
    deliveryAddress: "",
    billingAddress: ""
  }
}(
  //abbonement
  async () => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      subscription_data: {
        items: [
          {
            plan: "plan_123"
          }
        ]
      },
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel"
    });
  }
)();
// e-shop

const stripe = require("stripe")("sk_test_NHL2UM6U6pQUXDgDxeLADCIR00AVCMTlSP");

(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        firstName,
        lastName,
        phone,
        deliveryAddress,
        billingAddress,
        name: "T-shirt",
        description: "Comfortable cotton t-shirt",

        amount: 500,
        currency: "eur",
        quantity: 1
      }
    ],
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel"
  });
})();
