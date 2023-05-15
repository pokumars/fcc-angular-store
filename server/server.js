const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require('stripe')('sk_test_51MoZLaHb2UqU7uvxSqityJMkrtaMrQuScW0hQKlO4wXEb3ZNOSA0dVV6I3U4sWX7p15W0TXV6ilOvyg3XTWZNurE00G2jQpVnf');


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/checkout', async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['US', 'CA', 'FI'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1500,
                            currency: 'usd',
                        },
                        display_name: 'Next day air',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],
            line_items: req.body.items.map((item) => {
                return {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                            images: [item.product],
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity,
                }
            }),
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });
        res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});

app.listen(4242, () => console.log('Running on port 4242'));