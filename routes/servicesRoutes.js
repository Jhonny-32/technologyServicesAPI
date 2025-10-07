const serviceController = require('../controllers/serviceController');

module.exports = (app) => {

    app.post('/api/service/createService', serviceController.createService);

    app.put('/api/service/updateService', serviceController.updateService);

    app.get('/api/service/getServices', serviceController.getServices);
}
