import Datastore from "nedb-promises"
const productsDB = Datastore.create("db/products.db")
const cartDB = Datastore.create("db/cartDB.db")
const ordersDB = Datastore.create("db/ordersDB.db")

export function getAllProducts() {
    return productsDB.find({})
} 

export function getProduct(item) {
    return productsDB.find({serial: item})
} 

export function getWholeCart() {
    return cartDB.find({})
}

export function getItemInCart(item) {
    return cartDB.find({serial: item})
}

export function addToCart(item) {
    return cartDB.insert({serial: item})
}

export function emptyCart() {
    return cartDB.remove({}, {multi: true})
}

export function deleteFromCart(item) {
    return cartDB.remove({serial: item})
}

export async function makeOrder(order) {
    return ordersDB.insert(order)
}