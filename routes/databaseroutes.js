const express = require('express');
const router = express.Router();
const path = require('path');
const databaseController = require("../controllers/databasecontroller")

router.get('/', databaseController.getHome);
router.get( '/Home', databaseController.getHome );
router.get( '/Customer', databaseController.getCustomer);
router.get('/InsertCustomer', databaseController.InsertCustomer)
router.get('/UpdateCustomer/:id', databaseController.UpdateCustomer)
router.post('/CustomerUpdate', databaseController.postUpdateCustomer)
router.post('/Customer', databaseController.PostCustomer);
router.get( '/Products', databaseController.getProducts);
router.get('/InsertProduct', databaseController.InsertProduct);
router.post('/Products', databaseController.PostProduct )
router.get( '/Sales', databaseController.getSales);



exports.routes = router;