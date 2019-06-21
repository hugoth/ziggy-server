const stripe = require("stripe")("sk_test_fk5EQSTMjzhrXWjcNtTlHIgi00EA5vnuVZ");
const Meal = require("../meals/model");

// Create Stock

async function createStock(req, res) {
  console.log("yo");
  const { product } = req.body;

  try {
    await stripe.skus.create(
      {
        product: product.id,
        attributes: { species: product.species },
        price: product.price,
        currency: "eur",
        inventory: { type: "infinite" }
      },
      function(err, sku) {
        if (err) {
          res.status(400).json(err);
        } else if (sku) {
          res.json(sku);
        }
      }
    );
  } catch (err) {
    res.json({ err: err.message });
  }
}

// Create Card

async function createCard(req, res) {
  console.log(req.body);
}
// Create Customer

async function createCustomer(req, res) {
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
                  plan: req.body.order.plan,
                  quantity: req.body.order.quantity
                }
              ]
            },
            function(err, subscription) {
              if (subscription) {
                console.log(subscription);

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

// Payment / order

// Abonnement

async function CreateSubscription(customer, plan, res) {
  console.log("subscription function activate");
  try {
    await stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [
          {
            plan: plan
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Create Product

async function createProduct(req, res) {
  try {
    await stripe.products.create(
      {
        name: "Boeuf",
        type: "good",
        caption: "Repas complet 100% naturel pour chien adulte.",
        description:
          "Bœuf frais 50% (paleron de bœuf, cœur de bœuf, foie de bœuf), Patate Douce, Carottes, Brocolis, Pomme, Huile de Colza, Sel, Thym, Romarin – Vitamines et Minéraux.",

        attributes: ["chien", "360"]
      },
      function(err, product) {
        res.json({ err, product });
      }
    );
  } catch (error) {
    res.json({ error: message.error });
  }
}

async function createOrder(req, res) {
  const { user, meal } = req.body;
  const userName = user.firstName + " " + user.lastName;

  try {
    await stripe.orders.create(
      {
        currency: "eur",
        items: [
          {
            type: "sku",
            parent: req.body.sku,
            quantity: 2
          }
        ],
        shipping: {
          name: userName,
          address: {
            line1: user.address,
            city: user.city,
            country: user.country,
            postal_code: user.zipcode
          }
        },
        email: user.email
      },
      async function(err, order) {
        if (order) {
          await stripe.order.pay(
            `${order.id}`,
            {
              amount: req.body.amount,
              currency: "eur",
              source: "tok_visa", // obtained with Stripe.js
              description: `Charge ${userName} `
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
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

module.exports.createCard = createCard;
module.exports.createCustomer = createCustomer;
module.exports.createStock = createStock;
module.exports.createProduct = createProduct;
module.exports.createOrder = createOrder;
module.exports.CreateSubscription = CreateSubscription;
