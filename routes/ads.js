const express = require('express')
const {
    getAds,
    getAd,
    createAd,
    deleteAd,
    updateAd,
    getMyAds
} = require('../controllers/adControllers')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// get all ads
router.get('/', getAds)

router.get('/my',getMyAds )

// get single ad
router.get('/:id', getAd)

router.use(requireAuth)
// post ad
router.post('/', createAd)

// delete ad
router.delete('/:id', deleteAd)

// update ad
router.patch('/:id', updateAd)

module.exports = router;