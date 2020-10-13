module.exports = function mapnews(news, language) {
    var returnKey = ['title','browser_title', 'meta_title', 'icon', 'slug','metades','meta_og_img_','content']
    news = news.map(_news => {
        var returnews = {}
        returnKey.forEach(key => {
            catkey = key + language
            returnews[key] = _news[catkey]
        })
        returnews.create_date = _news.create_date
        returnews.views = _news.views ? _news.views : 0
        return returnews
    })
    return news
}

