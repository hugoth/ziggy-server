const stripe = require("stripe")("sk_test_fk5EQSTMjzhrXWjcNtTlHIgi00EA5vnuVZ");
const Meal = require("../meals/model");
const Order = require("../orders/model");
const User = require("../users/model");

// Create Stock

//  Abonnement

async function createSubscription(req, res) {
  const userName = req.body.user.firstName + " " + req.body.user.lastName;
  const description = "Création d'un client : " + userName;
  try {
    await stripe.customers.create(
      {
        description,
        address: {
          line1: req.body.user.address,
          city: req.body.user.city,
          country: "France",
          postal_code: req.body.user.zip
        },

        shipping: {
          address: {
            line1: req.body.user.address,
            city: req.body.user.city,
            postal_code: req.body.user.zip
          },
          name: userName
        },
        email: req.body.user.email,
        source: req.body.token.id
      },
      async function(err, customer) {
        if (customer) {
          await stripe.subscriptions.create(
            {
              customer: customer.id,
              items: [
                {
                  plan: req.body.order.plan.planStripe,
                  quantity: req.body.order.quantity
                }
              ]
            },
            function(err, subscription) {
              if (subscription) {
                res.status(200).json(subscription);
              } else {
                console.log(err);
                res.json(err);
              }
            }
          );
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    console.log({ err: err.message });
    res.status(500).json({ err: err.message });
  }
}

// Payment

async function createOrder(req, res) {
  const user = req.body.user;
  let Items = [];
  const userName = user.firstName + " " + user.lastName;
  const order = req.body.order;
  order.map(order => {
    Items.push({
      quantity: order.quantity,
      type: "sku",
      parent: order.sku
    });
  });

  try {
    await stripe.customers.create(
      {
        address: {
          line1: req.body.user.address,
          city: req.body.user.city,
          country: "France",
          postal_code: req.body.user.zip
        },

        shipping: {
          address: {
            line1: req.body.user.address,
            city: req.body.user.city,
            postal_code: req.body.user.zip
          },
          name: userName
        },
        email: req.body.user.email,
        source: req.body.token.id
      },
      async function(err, customer) {
        if (customer) {
          await stripe.orders.create(
            {
              currency: "eur",
              items: Items,
              shipping: {
                name: userName,
                address: {
                  line1: user.address,
                  city: user.city,
                  country: user.country,
                  postal_code: user.zip
                }
              },
              email: user.email
            },
            async function(err, order) {
              if (order) {
                await stripe.orders.pay(
                  order.id,
                  {
                    amount: req.body.amount,

                    source: "tok_visa" // obtained with Stripe.js
                  },
                  function(err, charge) {
                    if (charge) {
                      res.json(charge);
                    } else {
                      res.json(err);
                    }
                  }
                );
              } else {
                res.json(err);
              }
            }
          );
        } else {
          res.json(err);
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
}

module.exports.createSubscription = createSubscription;
module.exports.createOrder = createOrder;

// Create Stock
// async function createStock(req, res) {
//   console.log("yo");
//   const { product } = req.body;

//   try {
//     await stripe.skus.create(
//       {
//         product: product.id,
//         attributes: { species: product.species },
//         price: product.price,
//         currency: "eur",
//         inventory: { type: "infinite" }
//       },
//       function(err, sku) {
//         if (err) {
//           res.status(400).json(err);
//         } else if (sku) {
//           res.json(sku);
//         }
//       }
//     );
//   } catch (err) {
//     res.json({ err: err.message });
//   }
// }
