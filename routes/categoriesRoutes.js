const fs = require('fs')
const mongoose = require('mongoose')
const {Pages,Uploads,Categories, News} = require('../modal')
var multer = require('multer')
var upload = multer({ dest: './public/' })

const itemperpage = 50
const path = require('path')

function mapcat(categories, language) {
    var returnKey = ['page', 'title', 'meta_title', 'icon', 'slug','metades','meta_og_img_','open_new_tab_','ordering_']
    categories = categories.map(cat => {
        var returncat = {}
        returnKey.forEach(key => {
            catkey = key + language
            returncat[key] = cat[catkey]
        })
        return returncat
    })
    return categories.sort((a,b) => a.ordering_ - b.ordering_)
}

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
        app.get(cat.slugvi, async (req,res) => {
            var categories = await Categories.find({show_vi : true, pagevi : {$ne : null}})
            .populate({
                path : 'pagevi',
                populate : 'components.value'
            })

            var currCategories = mapcat(categories, 'vi')

            
            var pageData = currCategories.find(o => o.slug === cat.slugvi)
            
            var isHaveListNew = pageData.page.components.find(o => o.value.key === 'block10')
            
            var news;

            if(isHaveListNew){
                var page = Number(req.query.page)
                if(!page) page = 1
                var itemperpage = isHaveListNew.value.datas.find(o => o.key === 'news_per_page').data

                var skip = (page - 1) * itemperpage

                
                news = await News.find({category : {$in : cat._id}}).skip(skip).limit(itemperpage)
            }
            res.render('user/index',{
                pageData,
                components : pageData.page.components,
                categories : currCategories,
                news : news
            })

        })

        app.get(cat.slugen, async (req,res) => {
            console.log(123);
        })
    })
}