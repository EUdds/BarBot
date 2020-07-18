const express = require('express');
const db = require('../index');

createDrink = (req, res) => {
    const body = req.body;
    console.log('Adding drink');
    console.log(body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body'
        });
    }
    body.name = body.fluid.toLowerCase();
    if (drinkNumberExists(body.drinkNumber)) return res.status(400).json({
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

updateDrink = (req, res) => {
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

getDrinksByIngredients = (req, res) => {
    let drink = db.drinks.find({'fluid': req.query.fluid});
    return res.send(drink);
}

getAllDrinks = (req, res) => {
    let drinks = db.drinks.find({});
    return res.send(drinks);
}

const router = express.Router();

router.get('/drink', getAllDrinks)
router.post('/drink', createDrink);
router.put('/drink/:id', updateDrink);
router.get('/drink/:ingredients', getDrinksByIngredients);

module.exports = router;