const fs = require('fs')
const mongoose = require('mongoose')
const {Pages,Components} = require('../../modal')

const path = require('path')

module.exports = app => {
    app.get('/admin/pages', async (req,res)=>{
        var page = Number(req.query.page)
        var search = req.query.search
        
        const query = {}
        
        if(!page) page = 1

        if(search){
            query.name = {$regex : `.*${search}.*`}
        }
        
        const pages = await Pages.find({}).sort({ordering : -1})
        res.render('admin/pages/list',{
            adminPage : 'pages',
            data : pages
        })
    })

    app.get('/admin/pages/add',async (req,res)=>{
        var components = await Components.find({})
        res.render('admin/pages/add',{
            adminPage : 'pages',
            components
        })
    })

    app.post('/admin/pages/add', async (req,res)=>{
        var componentsList = req.body.components
        var orderingList = req.body.ordering

        var listComponents = []

        orderingList.forEach((_or,index) => {
            if(!Number(_or)) _or = 1
            if(mongoose.Types.ObjectId.isValid(componentsList[index])){
                listComponents.push({
                    ordering : _or,
                    value : componentsList[index]
                })
            }
        })

        listComponents.sort((a,b) => {
            return a.ordering - b.ordering
        })

        req.body.components = listComponents
        req.body.ordering = req.body._ordering
        const pages = new Pages({
            ...req.body,
        })

        await pages.save()

        res.redirect('/admin/pages/add')
    })

    app.get('/admin/pages/edit/:id', async (req,res)=>{
        const id = req.params.id
        var components = await Components.find({})
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.redirect('/admin/pages')
        }
        const page = await Pages.findById(id)
        if(!page){
            return res.redirect('/admin/pages')
        }

        res.render('admin/pages/edit',{
            adminPage : 'pages',
            id,
            data: page,
            components
        })
    })

    app.post('/admin/pages/edit/', async (req,res)=>{
        const {id} = req.body
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.redirect('/admin/pages')
        }

        const pages = await Pages.findById(id)

        if(!pages) {
            return res.redirect('/admin/pages')
        }

        var componentsList = req.body.components
        var orderingList = req.body.ordering

        var listComponents = []

        orderingList.forEach((_or,index) => {
            if(!Number(_or)) _or = 1
            if(mongoose.Types.ObjectId.isValid(componentsList[index])){
                listComponents.push({
                    ordering : _or,
                    value : componentsList[index]
                })
            }
        })
        listComponents.sort((a,b) => {
            return a.ordering - b.ordering
        })

        req.body.components = listComponents
        req.body.ordering = req.body._ordering
        
        var newpage = await Pages.findByIdAndUpdate(id , req.body)

        res.redirect('/admin/pages/edit/'+id)

    })

    app.post('/admin/pages/delete', async (req,res)=>{
        const {id} = req.body

        await Pages.findByIdAndDelete(id)

        res.redirect('/admin/pages')
    })
}