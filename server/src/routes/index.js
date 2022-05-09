import { Router } from 'express';

import { artistSearch } from '../services/search/artist.js';
import { releasesByArtistSearch } from '../services/search/releasesByArtist.js';
import { serverTestCall } from '../services/search/testApi.js';

const routes = new Router();

routes.get('/search/artist', artistSearch);
routes.get('/search/releasesByArtist', releasesByArtistSearch);
routes.get('/api',serverTestCall)




export default routes;
