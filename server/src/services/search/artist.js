import { BASE_URL, HEADER } from '../../../config/index.js';
import axios from 'axios';
import dotenv from 'dotenv';
import status from 'http-status';

const SEARCH = 'artist';

const inc = 'aliases+genres+ratings+tags+++annotation+++++++artist-rels+url-rels+area-rels+event-rels++label-rels+place-rels++++';

dotenv.config();

const doRequest = async (query) => {

    const fullurl = `${BASE_URL}/${SEARCH}/?query=${query}&fmt=json`;

    console.log('full url is', fullurl);

    return await axios.get(fullurl, HEADER);

};

const searchArtist = async (term) => {

    return await doRequest(`${term}`);

};

const doRequestSingleArtist = async (query) => {

    const fullurl = `${BASE_URL}/${SEARCH}/${query}?inc=release-groups&fmt=json`;

    console.log('full url is', fullurl);

    return await axios.get(fullurl, HEADER);

};

const searchReleaseIfSingleArtist = async (term) => {

    return await doRequestSingleArtist(`${term}`);

};


export const artistSearch = async (req, res, next) => {
    try {
        const { query } = req;
        
        const { data } = await searchArtist(query.query);
        
        const artist = data;

        //console.log(artist);
        
        //console.log(Rs.artists.map(({ id }) => id));

        let arrayIds = artist.artists.map(({ id }) => id);

        let string;

        let Rs;

        if(arrayIds.length === 1){
            const { singleArtistReleaseData } = await searchReleaseIfSingleArtist(arrayIds);

            const singleArtistData = singleArtistReleaseData;

            string = JSON.stringify(singleArtistData);

            Rs = JSON.parse(string);
            
        }
        else{
            string = JSON.stringify(artist);

            Rs = JSON.parse(string);
        }

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