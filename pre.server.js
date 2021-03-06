const express = require('express')
const compression = require('compression')
const config = require('./config/index')
const axios = require('axios')

const port = process.env.PORT || config.build.port

const app = express()

const apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function(req, res) {
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

    axios.get(url, {
        headers: {
            referer: 'https://y.qq.com/portal/playlist.html',
            authority: 'c.y.qq.com'
            },
            params: req.query
        }).then(resp => {
            res.json(resp.data)
        }).catch(e => console.warn(e))
})

apiRoutes.get('/lyric', function(req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

    axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          authority: 'c.y.qq.com'
        },
        params: req.query
    }).then(resp => {
        let data = resp.data
        if (typeof data === 'string') {
            const reg = /^\w+\(({[^()]+})\)$/
            const matches = data.match(reg)
            if (matches) {
                data = JSON.parse(matches[1])     
            }
        }
        res.json(data);
    }).catch(e => console.warn(e));
})

app.use('/api', apiRoutes)

app.use(compression())

app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})