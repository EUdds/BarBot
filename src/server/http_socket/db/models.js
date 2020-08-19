module.exports.createNewPump = function(body) {
    
    return {
        pumpNumber: pumpNumber,
        fluid: fluid
    }
}

module.exports.addFluidToList = function(fluid, fluids) {
    let fixedFluid = fixCase(fluid);
    fluids.push(fixedFluid);
}

function fixCase(s) {
    return input.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
}
