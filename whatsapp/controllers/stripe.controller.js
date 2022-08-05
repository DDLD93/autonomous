require('dotenv').config();
const stripe = require('stripe')('sk_test_51JW2AbE8Ae2Mwo9GA97HpTwWjmbgnir2gLdcqp27KbK4mlX7XtFffXKks4210BHE68lYz04CtlhmN0LOWtnny1jB00SmEJybjE');


class StripeController {
    constructor() { }
    async getPaymentLink() {
        try {
            const product = await stripe.products.create({
                name: 'Gold Special',
              });
            const price = await stripe.prices.create({
                unit_amount: 2000,
                currency: 'usd',
                product: product.id,
              });
            const paymentLink = await stripe.paymentLinks.create({
                line_items: [
                    {
                        price: price.id,
                        quantity: 1,
                    },
                ],
            })
            return { ok: true, paymentLink };
        } catch (err) {
            return { ok: false, error: err };
        }
    }
}
module.exports = new StripeController();