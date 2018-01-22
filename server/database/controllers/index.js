const path = require('path')
const SlideList = require('../schema')

exports.saveSlideList = async (list) => {
    console.log(11, list)
    const { slider, radioList, songList } = list
    const newSlideList = new SlideList({
        slider,
        radioList,
        songList
    });

    const slideSaved = await newSlideList.save();

    if (slideSaved) {
        console.log('轮播数据存储成功!')
    } else {
        console.warn('轮播数据存储失败')
    }
}