const express = require('express')
const db = require('../index');

createFluid = (req, res) => {
    const body = req.body;
    if (!body) return res.status(400);
    body.name = body.name.toLowerCase();
    body.isMixer = !!(body.isMixer);
    body.category = body.category.toLowerCase();

    if(fluidExists(body.name)) return res.status(400).json({
        message: 'Fluid already exists'
    });

    db.fluids.save(body);
    res.status(200).json(db.fluids.find());
}

function fluidExists(fluidName) {
    let knownFluids = db.fluids.find({});
    for(let fluid of knownFluids) {
        if (fluid === fluidName) return true;
    }
    return false;
}

deleteFluid = (req, res) {
    const body = req.body;
    if (!fluidExists(body.name)) return res.status(400).json({
        message: 'That fluid does not exist'
    });
    db.fluids.remove({'name': body.name});
    res.send(200).json(db.fluids.find());
}

getAllFluids = (req, res) => {
    return res.status(200).json(db.fluids.find());
}

const router = express.Router();

router.get('/fluid', getAllFluids);
router.post('/fluid', createFluid);
router.delete('/fluid', deleteFluid);

module.exports = router;