const express = require('express')
const {
    getAds,
    getAd,
    createAd,
    deleteAd,
    updateAd
} = require('../controllers/adControllers')

const router = express.Router()

// get all ads
router.get('/', getAds)

// get single ad
router.get('/:id', getAd)

// post ad
router.post('/', createAd)

// delete ad
router.delete('/:id', deleteAd)

// update ad
router.patch('/:id', updateAd)

module.exports = router;