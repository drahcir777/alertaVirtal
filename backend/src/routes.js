const { Router } = require('express');
const UserController = require('./controllers/UserController')

const routes = Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users/:email', UserController.update);
routes.delete('/users/:email', UserController.delete);


module.exports = routes;