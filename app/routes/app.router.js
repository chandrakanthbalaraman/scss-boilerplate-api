module.exports = function(app) {

    var appController = require('../controller/app.controller.js');

    // Create a new Note
    app.post('/upload-scss', appController.uploadScss);

    app.post('/convert-scss', appController.convertScss);

   
   
}