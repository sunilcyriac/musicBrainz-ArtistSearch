import routes from '../routes/index.js';
import express from 'express';
import cors from 'cors';

// ../utils/errorHandler.js moved here //
function notFoundErrorHandler(req, res) {
    res.status(404).send({ error: 'Resource not found.' });
}

function defaultErrorHandler(error, req, res, next) {
    res.status(error.status || 500).send({ error });
}

export default (app) => {
    app.use(express.json());
    app.use(cors());
    app.use('/', routes);
    app.use(notFoundErrorHandler);
    app.use(defaultErrorHandler);
};