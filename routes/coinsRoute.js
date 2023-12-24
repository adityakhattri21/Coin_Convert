const router = require('express').Router();
const {updateData, compareCoins} = require('../controller/coinsController');
const cacheMiddleware = require('../middlewares/cache');

router.route("/update").post(updateData);

router.route("/convert").post(cacheMiddleware,compareCoins);

module.exports = router;