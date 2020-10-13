const {getCat} = require('../helpers')
const {Categories} = require('../modal')

const {language} = require('../const')
module.exports = async app => {
    var categories = await Categories.find({})
    .populate({
        path : 'pagevi',
        populate : 'components.value'
    })
    .populate({
        path : 'pageen',
        populate : 'components.value'
    })

    categories.forEach(cat => {
        language.forEach(lang => {
            getCat(app,cat,lang)
        })
    })
}