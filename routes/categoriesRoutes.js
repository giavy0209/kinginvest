const fs = require('fs')
const mongoose = require('mongoose')
const {Pages,Uploads,Categories} = require('../modal')
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
            console.log(cat.pagevi.components[8].value.datas);
            var categories = await Categories.find({show_vi : true, pagevi : {$ne : null}})
            .populate({
                path : 'pagevi',
                populate : 'components.value'
            })

            var currCategories = mapcat(categories, 'vi')

            var pageData = currCategories.find(o => o.slug === cat.slugvi)
            res.render('user/index',{
                pageData,
                components : cat.pagevi.components,
                categories : currCategories
            })

        })

        app.get(cat.slugen, async (req,res) => {
            console.log(123);
        })
    })
}