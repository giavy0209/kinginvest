const fs = require('fs')
const mongoose = require('mongoose')
const {Pages,Uploads,Categories} = require('../modal')
var multer = require('multer')
var upload = multer({ dest: './public/' })

const itemperpage = 50
const path = require('path')
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
        console.log(cat.pagevi.components[1].value.datas);
        app.get(cat.slugvi, async (req,res) => {


            res.render('user/index',{
                components : cat.pagevi.components
            })

        })

        app.get(cat.slugen, async (req,res) => {
            console.log(123);
        })
    })
}