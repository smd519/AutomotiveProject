import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

// TODO: add type for body
export const addVehicle = async (body: any) => axios.post(`${BASE_URL}/api/vehicles`, body);

export const login = async (body: any) => axios.post(`${BASE_URL}/api/login`, body);
