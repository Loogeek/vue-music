const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slideListSchema = new Schema({
    id: String,
    slider: Array,
    radioList: Array,
    songList: Array,
    meta: {
        createAt: {
            tyep: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

slideListSchema.pre('save', async(next) => {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }
    next()
})

const SlideList = mongoose.model('SlideList', slideListSchema)

module.exports = SlideList