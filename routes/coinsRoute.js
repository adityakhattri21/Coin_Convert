const router = require('express').Router();
const {updateData, compareCoins} = require('../controller/coinsController');

router.route("/update").get(updateData);

router.route("/convert").post(compareCoins);

module.exports = router;