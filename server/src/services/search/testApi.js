import { BASE_URL, HEADER } from '../../../config/index.js';
import axios from 'axios';
import dotenv from 'dotenv';
import status from 'http-status';


dotenv.config();




export const serverTestCall = async (req, res, next) => {
    res.json({ message: "Hello from server!" });
};
    
