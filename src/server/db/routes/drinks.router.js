const express = require('express');
const db = require('../index');

let createDrink = (req, res) => {
    const body = req.body;
    console.log('Adding drink');
    console.log(body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body'
        });
    }
    body.name = body.name.toLowerCase();
    if (drinkExists(body.name)) return res.status(400).json({
        success: false,
        error: 'Drink already exists'
    })
    db.drinks.save(body);
    res.status(200).json(db.drinks.find());
}

function drinkExists(drinkName) {
    let drinks = db.drinks.find({});
    for(let drink of drinks) {
        console.log(drink);
        if (drink.name === drinkName) return true;
    }
    return false
}

let updateDrink = (req, res) => {
    console.log(`Updating drink ${req.params.name}`)
    const body = req.body;
    if (!body) return res.status(400).json({
        success: false,
        error: 'You must provide a body'
    });
    
    body.name = body.name.toLowerCase();
    db.drinks.update({'name': req.params.name}, body);
    res.status(200).json(db.drinks.findOne({'name': req.params.name}));
}

let getDrinksByIngredients = (req, res) => {
    let drinks = db.drinks.find();
    let fluids = req.query.array;
    console.log(fluids);
    for(let drink of drinks) {
        let ingList = []
        for (let ingredient of drink.ingredients) {
            ingList.push(ingredient.name);
        }
        const canMake = fluids.every(val => ingList.includes(val));
        if (!canMake) drinks.splice(drinks.indexOf(drink), 1);
    }
    return res.send(drinks);
}

let getAllDrinks = (req, res) => {
    let drinks = db.drinks.find({});
    return res.send(drinks);
}

const router = express.Router();

router.get('/drink', getAllDrinks)
router.post('/drink', createDrink);
router.put('/drink/:id', updateDrink);
router.get('/drink/:ingredients', getDrinksByIngredients);

module.exports = router;