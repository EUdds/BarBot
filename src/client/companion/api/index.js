import axios from 'axios';
const config = require('../../../config');

const api = axios.create({
    baseURL: 'http://'+ config.serverIp + ':8080/api'
})

export const insertPump = payload => api.post('/pump', payload);
export const getAllPumps = () => api.get('/pump');
export const updatePumpByPumpNumber = (pumpNumber, payload) => api.put('/pump/' + pumpNumber, payload);
export const getPumpByPumpNumber = pumpNumber => api.get('/pump/' + pumpNumber);
export const getPumpByFluid = fluid => api.get('/pump/' + fluid);
export const getActiveFluids = () => api.get('/getActiveFluids');

export const insertFluid = payload => api.post('/fluid', payload);
export const getAllFluids = () => api.get('/fluid');
export const deleteFluid = payload => api.delete('/fluid', payload);

export const insertDrink = payload => api.post('/drink', payload);
export const getAllDrinks = () => api.get('/drink');
export const getDrinksByIngredients = payload => api.post('/drinks', payload); 

const apis = {
    insertPump,
    getAllPumps,
    updatePumpByPumpNumber,
    getPumpByPumpNumber,
    getPumpByFluid,
    insertFluid,
    getAllFluids,
    deleteFluid,
    insertDrink,
    getAllDrinks,
    getDrinksByIngredients,
    getActiveFluids
}

export default apis;
