import {getAllProducts} from "../model/model.js"

export function getProducts(req, res) {
    getAllProducts()
        .then((allProducts) => res.json(allProducts))
        .catch(err => res.status(500).json("Database error: " + err))
}