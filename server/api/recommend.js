const axios = require('axios')
const { fetchSliderList } = require('../../src/api/recommend')
const { saveSlideList } = require('../database/controllers')

fetchSliderList().then(ret => {
    saveSlideList(ret)
})
