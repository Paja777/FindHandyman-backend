const express = require('express')
const {
    getAds,
    createAd,
} = require('./controllers/adControllers')

const router = express.Router()

// get all ads
router.get('/', getAds)

// get single ad
router.get('/:id', (req, res) => {
    res.status(200).json('Alooo sve ok')
    
})

// post ad
router.post('/', createAd)

module.exports = router;