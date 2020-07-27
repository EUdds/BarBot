
const express = require('express');
const db = require('../index');

createPump = (req, res) => {
    const body = req.body;
    console.log('Adding pump');
    console.log(body);
    body.fluid = body.fluid.toLowerCase();
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body'
        });
    }
    if (pumpNumberExists(body.pumpNumber)) return res.status(400).json({
        success: false,
        error: 'Pump already exists'
    })
    db.pumps.save(body);
    res.status(200).json(db.pumps.find());
}

function pumpNumberExists(number) {
    let pumps = db.pumps.find({});
    for(let pump of pumps) {
        console.log(pump);
        if (pump.pumpNumber === number) return true;
    }
    return false
}

updatePump = (req, res) => {
    console.log(`Updating pump ${req.params.number}`)
    const body = req.body;
    if (!body) return res.status(400).json({
        success: false,
        error: 'You must provide a body'
    });
    
    body.fluid = body.fluid.toLowerCase();
    db.pumps.update({'pumpNumber': req.params.number}, body);
    res.status(200).json(db.pumps.findOne({'pumpNumber': req.params.number}));
}

getPumpByPumpNumber = (req, res) => {
    let pump = db.pumps.findOne({'pumpNumber': Number(req.params.number)});
    console.log(req.params.number);
    console.log(pump);
    return res.send(pump);
}

getPumpByFluid = (req, res) => {
    let pump = db.pumps.findOne({'fluid': req.params.fluid});
    return res.send(pump);
}

getAllPumps = (req, res) => {
    let pumps = db.pumps.find({});
    return res.send(pumps);
}

getListOfCurrentFluids = (req, res) => {
    let pumps = db.pumps.find();
    console.log(pumps);
    let fluids = [];
    for(let pump of pumps) {
        fluids.push(pump.fluid);
    }
    res.send([...new Set(fluids)]);
}

const router = express.Router();

router.get('/pump', getAllPumps)
router.post('/pump', createPump);
router.put('/pump/:number', updatePump);
router.get('/pump/:number', getPumpByPumpNumber);
router.get('/pump/fluid/:fluid', getPumpByFluid);
router.get('/getActiveFluids', getListOfCurrentFluids);

module.exports = router;