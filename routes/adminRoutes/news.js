const {Categories,News,Components} = require('../../modal')
const mongoose = require('mongoose')

module.exports = app => {
    app.get('/admin/news', async (req,res) => {
        var news = await News.find({}).sort({_id : -1}).populate('category')
        console.log(news);
        res.render('admin/news/list', {
            adminPage : 'news',
            data : news
        })
    })

    app.get('/admin/news/add', async (req,res) => {
        var categories = await Categories.find({})
        var components = await Components.find({})
        res.render('admin/news/add', {
            adminPage : 'news',
            categories,
            components
        })
    })

    app.post('/admin/news/add', async (req,res)=>{
        req.body.category.forEach((cat,index) => {
            if(!mongoose.Types.ObjectId.isValid(cat)){
                req.body.category.splice(index, 1)
            }
        })

        var components_before= req.body.components_before
        var ordering_before = req.body.ordering_before

        var listComponentsBefore = []

        ordering_before.forEach((_or,index) => {
            if(!Number(_or)) _or = 1
            if(mongoose.Types.ObjectId.isValid(components_before[index])){
                listComponentsBefore.push({
                    ordering : _or,
                    value : components_before[index]
                })
            }
        })

        var components_after= req.body.components_after
        var ordering_after = req.body.ordering_after

        var listComponentsAfter = []

        ordering_after.forEach((_or,index) => {
            if(!Number(_or)) _or = 1
            if(mongoose.Types.ObjectId.isValid(components_after[index])){
                listComponentsAfter.push({
                    ordering : _or,
                    value : components_after[index]
                })
            }
        })

        listComponentsBefore.sort((a,b) => {
            return a.ordering - b.ordering
        })

        listComponentsAfter.sort((a,b) => {
            return a.ordering - b.ordering
        })

        req.body.components_before = listComponentsBefore
        req.body.components_after = listComponentsAfter

        const news = new News(req.body)

        await news.save()

        res.redirect('/admin/news/add')
    })

    app.get('/admin/news/edit/:id', async (req,res) => {
        var {id} = req.params
        var news = await News.findById(id)
        var categories = await Categories.find({})
        var components = await Components.find({})
        res.render('admin/news/edit', {
            adminPage : 'news',
            id,
            data : news,
            categories,
            components
        })
    })

    app.post('/admin/news/edit', async (req,res)=>{
        var {id} = req.body

        req.body.category.forEach((cat,index) => {
            if(!mongoose.Types.ObjectId.isValid(cat)){
                req.body.category.splice(index, 1)
            }
        })

        var components_before= req.body.components_before
        console.log(components_before);
        var ordering_before = req.body.ordering_before

        var listComponentsBefore = []

        ordering_before.forEach((_or,index) => {
            if(!Number(_or)) _or = 1
            if(mongoose.Types.ObjectId.isValid(components_before[index])){
                listComponentsBefore.push({
                    ordering : _or,
                    value : components_before[index]
                })
            }
        })

        var components_after= req.body.components_after
        var ordering_after = req.body.ordering_after

        var listComponentsAfter = []

        ordering_after.forEach((_or,index) => {
            if(!Number(_or)) _or = 1
            if(mongoose.Types.ObjectId.isValid(components_after[index])){
                listComponentsAfter.push({
                    ordering : _or,
                    value : components_after[index]
                })
            }
        })

        listComponentsBefore.sort((a,b) => {
            return a.ordering - b.ordering
        })

        listComponentsAfter.sort((a,b) => {
            return a.ordering - b.ordering
        })

        req.body.components_before = listComponentsBefore
        req.body.components_after = listComponentsAfter

        const news = await News.findByIdAndUpdate(id,req.body)
        res.redirect('/admin/news/edit/'+id )
    })

    app.post('/admin/news/delete',async function (req, res) {
        var {id} = req.body

        await News.findByIdAndDelete(id)
        res.redirect('/admin/news')
    })
}