const router = require('express').Router();
const ContactController  = require('../controller/ContactController')


// Contact Router
router.get('/list',ContactController.list);
router.post('/store',ContactController.store);
router.get('/get/:id',ContactController.single);
router.put('/update/:id',ContactController.update);
router.delete('/delete',ContactController.removeOneOrMany);


module.exports = router