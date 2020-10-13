const {getNews} = require('../helpers')
const {News} = require('../modal')

const language = ['vi', 'en']
module.exports = async app => {
    var news = await News.find({})
    .populate({
        path : 'category',
    })
    .populate({
        path : 'components_before.value',
    })
    .populate({
        path : 'components_after.value',
    })

    news.forEach(_news => {
        language.forEach(lang => {
            getNews(app ,_news, lang)
        })
    })
   
}