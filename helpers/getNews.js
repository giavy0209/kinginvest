const mapCat = require("./mapCat");
const {Categories, News} = require('../modal');
const mapNews = require("./mapNews");
const fs = require('fs')
module.exports = async function (app,currentNews, language) {
    var css = fs.readFileSync('./public/css/style.css','utf8')
    var queryCategories = {}
    queryCategories['show_' + language] = true
    queryCategories['page' + language] = {$ne : null}
    var categories = await Categories.find(queryCategories)
    .populate({
        path : 'page' + language,
        populate : 'components.value'
    })
    app.get(currentNews['slug' + language], async (req,res) => {
        console.log(css);

        var reqLanguage = req.cookies.language;
        var forceWriteCookie = false
        if(currentNews.slugvi === currentNews.slugen){
            if(reqLanguage === 'vi' || reqLanguage === 'en'){
                language = reqLanguage
            }else{
                language = 'en'
                forceWriteCookie = true
            }
        }

        var currCategories = mapCat(categories, language)
        var thisNews = mapNews([currentNews], language)[0]

        var components = [
            ...currentNews.components_before , 
            {
                value : {
                    key: 'news',
                    datas : []
                }
            },
            ...currentNews.components_after
        ]

        var isHaveListNew = components.find(o => o.value.key === 'block10')
        var news = [];
        var totalnews = 0;
        var totalpage = 0;
        var listFeatured = []
        var page;

        if(isHaveListNew){
            var page = Number(req.query.page)
            var search = req.query.search

            if(!page) page = 1
            var itemperpage = isHaveListNew.value.datas.find(o => o.key === 'news_per_page').data

            var skip = (page - 1) * itemperpage

            var query = {}

            if(search && search !== ''){
                query.$or = []
                var queryOr = {}
                queryOr['title' + language] = {$regex : `.*${search}.*`}
                query.$or.push(queryOr)
                var queryOr = {}
                queryOr['content' + language] = {$regex : `.*${search}.*`}
                query.$or.push(queryOr)
            }
            totalnews = await News.countDocuments(query)
            news = await News.find(query).skip(skip).limit(itemperpage).sort({create_date : -1})

            totalpage = Math.ceil(totalnews / itemperpage)
            
            var isShowFeaturedArticle = isHaveListNew.value.datas.find(o => o.key === 'show_featured_article').data

            if(isShowFeaturedArticle){
                var listFeaturedId = isHaveListNew.value.datas.find(o => o.key === 'featured_articles').data
                for (let index = 0; index < listFeaturedId.length; index++) {
                    const id = listFeaturedId[index].article_id;
                    var newsFeatured = await News.findById(id)
                    if(newsFeatured) listFeatured.push(newsFeatured)
                }
                listFeatured = mapNews(listFeatured, language)
            }

            news = mapNews(news, language)

        }

        var sidebarnews = await News.find({category : {$in : currentNews.category}}).limit(5).sort({create_date : -1}).sort({views : -1})
        sidebarnews = mapNews(sidebarnews, language)

        if(forceWriteCookie){
            res.cookie('language' , 'en', {
                expires : new Date(Date.now() + 31104000000)
            })
        }

        res.render('user/index',{
            pageData : thisNews,
            components : components,
            categories : currCategories,
            news : news,
            totalnews,
            totalpage,
            listFeatured,
            sidebarnews,
            currentPage : page,
            sidebar_title : language === 'vi' ? 'Bài viết nổi bật' : 'Featured News',
            css
        })
    })
}