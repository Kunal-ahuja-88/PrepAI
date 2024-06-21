export default [
    {
        link:process.env.NEXT_PUBLIC_STRIPE_MONTHLY,
        price:'6.99 $',
        priceId:process.env.NEXT_PUBLIC_MONTHLY_PRICE_ID,
        duration:'Monthly'
    },
    {
        link:process.env.NEXT_PUBLIC_STRIPE_YEARLY,
        price:'49 $',
        priceId:process.env.NEXT_PUBLIC_YEARLY_PRICE_ID,
        duration:'Yearly'
    }
]