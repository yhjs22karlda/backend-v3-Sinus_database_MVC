import { getWholeCart, addToCart, deleteFromCart, makeOrder, emptyCart } from "../model/model.js"

export function getCart(req, res) {
    getWholeCart()
        .then((cart) => res.json(cart))
        .catch(err => res.status(500).json("Database error: " + err))
}

export function postCart(req, res) {
    addToCart(req.body.serial)
        .then(() => {
            res.json({
                sucsess: true,
                msg: `Article number ${req.body.serial} added to cart`
            })
        })
        .catch(err => res.status(500).json("Database error: " + err))
}

export function deleteCart(req, res) {
    deleteFromCart(req.body.serial)
        .then(() => {
            res.json({
                sucsess:true,
                msg: `Item with serialnumber ${req.body.serial} deleted.`
            })
        })
        .catch(err => res.status(500).json("Database error: " + err))
}

export async function postOrder(req, res) {
    const order = {
        order: await getWholeCart(),
        paid: false,
        address: {
            name: req.body.address.name,
            street: req.body.address.street,
            city: req.body.address.city,
            zip: req.body.address.zip
        },
        card: {
            owner: req.body.card.owner,
            number: req.body.card.number,
            valid: req.body.card.valid,
            ccv: req.body.card.ccv
        }
    }
    makeOrder(order)
        .then(() => {
            emptyCart()
            res.json({
                sucsess:true,
                msg: `Order added.`
            })
        })
        .catch(err => res.status(500).json("Database error: " + err))
}