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
    let fluids = req.body.array;
    console.log(fluids);
    let possibleDrinks = [];
    for(let drink of drinks) {
        console.log(drink);
        let ingList = []
        for (let ingredient of drink.ingredients) {
            ingList.push(ingredient.name);
        }
        const canMake = ingList.every(val => fluids.includes(val));
        if (canMake) {
            possibleDrinks.push(drink);
        } 
    }
    return res.send(possibleDrinks);
}

let getAllDrinks = (req, res) => {
    console.log('getting all drinks');
    let drinks = db.drinks.find({});
    return res.send(drinks);
}

const router = express.Router();

router.get('/drink', getAllDrinks)
router.post('/drink', createDrink);
router.post('/drinks', getDrinksByIngredients);
router.put('/drink/:id', updateDrink);

module.exports = router;