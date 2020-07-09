import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export const insertPump = payload => api.post('/pump', payload);
export const getAllPumps = () => api.get('/pump');
export const updatePumpByPumpNumber = (pumpNumber, payload) => api.put('/pump/' + pumpNumber, payload);
export const getPumpByPumpNumber = pumpNumber => api.get('/pump/' + pumpNumber);
export const getPumpByFluid = fluid => api.get('/pump/' + fluid);

const apis = {
    insertPump,
    getAllPumps,
    updatePumpByPumpNumber,
    getPumpByPumpNumber,
    getPumpByFluid
}

export default apis;
