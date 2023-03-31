import {getProduct, getItemInCart, getWholeCart} from "../model/model.js"

export async function checkCartPost(req, res, next) {
    if(Object.hasOwn(req.body, "serial")) {
        if((await getProduct(req.body.serial)).length === 0) {
            res.status(400).json({sucsess:false, msg: "No item with that serial number."})
            return
        }
        if((await getItemInCart(req.body.serial)).length > 0) {
            res.status(400).json({sucsess:false, msg: "Already in cart."})
            return
        }
        next()
    } else {
        res.status(400).json({sucsess:false, msg: "Wrong request format."})
    }
}

export async function checkCartDelete(req, res, next) {
    if((await getItemInCart(req.body.serial)).length > 0) {
        next()
    } else {
        res.status(400).json({
            sucsess: false,
            msg: `No item with serialnumber ${req.body.serial} in cart.`
        })
    }
}

export async function checkCartOrder(req, res, next) {
    if(
        Object.hasOwn(req.body, "address") &&
        Object.hasOwn(req.body.address, "name") &&
        Object.hasOwn(req.body.address, "street") &&
        Object.hasOwn(req.body.address, "city") &&
        Object.hasOwn(req.body.address, "zip") &&
        Object.hasOwn(req.body, "card") &&
        Object.hasOwn(req.body.card, "owner") &&
        Object.hasOwn(req.body.card, "number") &&
        Object.hasOwn(req.body.card, "valid") &&
        Object.hasOwn(req.body.card, "ccv") &&
        typeof req.body.address === "object" &&
        typeof req.body.address.name === "string" &&
        typeof req.body.address.street === "string" &&
        typeof req.body.address.city === "string" &&
        typeof req.body.address.zip === "number" &&
        typeof req.body.card === "object" &&
        typeof req.body.card.owner === "string" &&
        typeof req.body.card.number=== "string" &&
        typeof req.body.card.valid === "string" &&
        typeof req.body.card.ccv === "number"
    ) {
        if((await getWholeCart()).length === 0) {
            res.status(400).json({sucsess:false, msg: "No orders in cart."})
            return
        }
        next()
    } else {
        res.status(400).json({sucsess:false, msg: "Wrong input"})
    }
}