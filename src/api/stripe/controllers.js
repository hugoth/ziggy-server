const stripe = require("stripe")("sk_test_fk5EQSTMjzhrXWjcNtTlHIgi00EA5vnuVZ");
const Meal = require("../meals/model");
const Order = require("../orders/model");
const User = require("../users/model");

const ordersController = require("../orders/controllers");

// Create Stock

//  Abonnement

async function createSubscription(req, res) {
  console.log(req.body);

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

function updateSubscription(req, res) {
  try {
    const subscriptionIDStripe = req.body.subscriptionID;
    const subscriptionIDDB = req.body.subscription.id;
    stripe.subscriptions
      .update(subscriptionIDStripe, { cancel_at_period_end: true })
      .then(async subscription => {
        if (subscription) {
          const updatedSubscription = await ordersController.updateSubscriptionDB(
            subscriptionIDDB
          );
          // call update subscription controller
          res.status(200).json(updatedSubscription);
        }
      })
      .catch(err => res.status(400).json(err));

    // stripe.subscriptions.update(
    //   subscription,
    //   { cancel_at_period_end: true },
    //   function(err, subscription) {
    //     if (subscription) {
    //       res.status(200).json(subscription);
    //     } else {
    //       res.status(400).json(err);
    //     }
    //   }
    // );
  } catch (err) {
    res.json({ err: err.message });
  }
}

// Payment

async function createOrder(req, res) {
  const user = req.body.user;
  const order = req.body.order;

  // 2 order différents, l'un recu par la req, l'autre créer par stripe donc la function singleorder ne recoit pas les id meals de la db

  let Items = [];
  const userName = user.firstName + " " + user.lastName;
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
                await stripe.orders
                  .pay(order.id, {
                    amount: req.body.amount,
                    source: "tok_visa" // obtained with Stripe.js
                  })
                  .then(async charge => {
                    if (charge) {
                      const createOrder = await ordersController.createSingleOrder(
                        user,
                        order
                      );
                      res.status(200).json(createOrder);
                    } else {
                      res.json(err);
                    }
                  });
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
module.exports.updateSubscription = updateSubscription;
module.exports.createOrder = createOrder;
