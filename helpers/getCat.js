const mapCat = require('./mapCat')
const mapNews = require('./mapNews')
const {Categories, News} = require('../modal')
module.exports = function (app,cat, language) {
    app.get(cat['slug' + language], async (req,res) => {
        var reqLanguage = req.cookies.language;
        var forceWriteCookie = false
        if(cat.slugvi === cat.slugen){
            if(reqLanguage === 'vi' || reqLanguage === 'en'){
                language = reqLanguage
            }else{
                language = 'en'
                forceWriteCookie = true
            }
        }

        var queryCategories = {}
        queryCategories['show_' + language] = true
        queryCategories['page' + language] = {$ne : null}

        var categories = await Categories.find(queryCategories)
        .populate({
            path : 'page' + language,
            populate : 'components.value'
        })

        var currCategories = mapCat(categories, language)

        
        var pageData = currCategories.find(o => o.slug === cat['slug' + language])
        
        var isHaveListNew = pageData.page.components.find(o => o.value.key === 'block10')
        
        var news = [];
        var totalnews = 0;
        var totalpage = 0;
        var listFeatured = []
        var sidebarnews = []
        var page;

        if(isHaveListNew){
            var page = Number(req.query.page)
            var search = req.query.search

            if(!page) page = 1
            var itemperpage = isHaveListNew.value.datas.find(o => o.key === 'news_per_page').data

            var skip = (page - 1) * itemperpage

            var query = {category : {$in : cat._id}}

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

            var isShowSideBar = isHaveListNew.value.datas.find(o => o.key === 'show_sidebar').data
            if(isShowSideBar){
                var sidebarItem = isHaveListNew.value.datas.find(o => o.key === 'sidebar_items').data
                if(!Number(sidebarItem)) sidebarItem = 5
                sidebarnews = await News.find({}).limit(sidebarItem).sort({create_date : -1}).sort({views : -1})
                sidebarnews = mapNews(sidebarnews, language)
            }
            news = mapNews(news, language)
        }

        if(forceWriteCookie){
            res.cookie('language' , 'en', {
                expires : new Date(Date.now() + 31104000000)
            })
        }
        res.render('user/index',{
            pageData,
            components : pageData.page.components,
            categories : currCategories,
            news : news,
            totalnews,
            totalpage,
            listFeatured,
            sidebarnews,
            currentPage : page,
        })
    })
}