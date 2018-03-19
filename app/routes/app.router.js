module.exports = function(app) {

    var appController = require('../controller/app.controller.js');

    // Create a new Note
    app.post('/convert-scss', appController.convertSass);

   
   
}