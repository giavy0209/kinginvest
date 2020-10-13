const {Categories,News} = require('../../modal')
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
        res.render('admin/news/add', {
            adminPage : 'news',
            categories
        })
    })

    app.post('/admin/news/add', async (req,res)=>{
        req.body.category.forEach((cat,index) => {
            if(!mongoose.Types.ObjectId.isValid(cat)){
                req.body.category.splice(index, 1)
            }
        })
        const news = new News(req.body)

        await news.save()

        res.redirect('/admin/news/add')
    })

    app.get('/admin/news/edit/:id', async (req,res) => {
        var {id} = req.params
        var news = await News.findById(id)
        var categories = await Categories.find({})
        res.render('admin/news/edit', {
            adminPage : 'news',
            id,
            data : news,
            categories
        })
    })

    app.post('/admin/news/edit', async (req,res)=>{
        var {id} = req.body
        req.body.category.forEach((cat,index) => {
            if(!mongoose.Types.ObjectId.isValid(cat)){
                req.body.category.splice(index, 1)
            }
        })
        const news = await News.findByIdAndUpdate(id,req.body)
        res.redirect('/admin/news/edit/'+id )
    })

    app.post('/admin/news/delete',async function (req, res) {
        var {id} = req.body

        await News.findByIdAndDelete(id)
        res.redirect('/admin/news')
    })
}