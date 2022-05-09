import { BASE_URL, HEADER } from '../../../config/index.js';
import axios from 'axios';
import dotenv from 'dotenv';
import status from 'http-status';

const SEARCH = 'artist';

dotenv.config();

const doRequest = async (query) => {

    const fullurl = `${BASE_URL}/${SEARCH}/${query}?inc=release-groups&fmt=json`;

    console.log('full url is', fullurl);

    return await axios.get(fullurl, HEADER);

};

const searchReleasesByArtist = async (term) => {

    return await doRequest(`${term}`);

};


export const releasesByArtistSearch = async (req, res, next) => {
    try {
        const { query } = req;
        
        const { data } = await searchReleasesByArtist(query.query);
        
        const releases = data;

        const string = JSON.stringify(releases);

        const Rs = JSON.parse(string);

        const response = {
            code: 1,
            status: 'sucess',
            message: 'sucess',
            response: Rs
        };

        res.status(status.OK).send(response);

    } catch (error) {

        next(error);
        console.log("Error: " + error);

    }
    
};