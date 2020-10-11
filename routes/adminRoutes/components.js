const fs = require('fs')
const mongoose = require('mongoose')
const {Components} = require('../../modal')

const path = require('path')

module.exports = app => {
    app.get('/admin/components', async (req,res)=>{
        var page = Number(req.query.page)
        var search = req.query.search
        
        const query = {}
        
        if(!page) page = 1

        if(search){
            query.name = {$regex : `.*${search}.*`}
        }
        
        const components = await Components.find({}).sort({ordering : -1})
        res.render('admin/components/list',{
            adminPage : 'components',
            data : components
        })
    })

    app.get('/admin/components/add',async (req,res)=>{
        const components = JSON.parse(fs.readFileSync(path.join(__dirname, '../../components.json'),{encoding : 'utf-8'}))
        res.render('admin/components/add',{
            adminPage : 'components',
            components
        })
    })

    app.post('/admin/components/add', async (req,res)=>{
        const components = new Components(req.body)

        await components.save()

        res.send(true)
    })

    app.get('/admin/components/edit/:id', async (req,res)=>{
        const id = req.params.id
        const componentsRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../../components.json'),{encoding : 'utf-8'}))
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.redirect('/admin/components')
        }
        const components = await Components.findById(id)
        if(!components){
            return res.redirect('/admin/components')
        }

        res.render('admin/components/edit',{
            adminPage : 'components',
            id,
            data: components,
            components:componentsRaw
        })
    })

    app.post('/admin/components/edit/', async (req,res)=>{
        const {_id} = req.body
        if(!mongoose.Types.ObjectId.isValid(_id)){
            return res.redirect('/admin/components')
        }

        const components = await Components.findById(_id)

        if(!components) {
            return res.redirect('/admin/components')
        }
        
        var newpage = await Components.findByIdAndUpdate(_id , req.body)
        console.log(newpage);

        res.redirect('/admin/components/edit/'+_id)

    })

    app.post('/admin/components/delete', async (req,res)=>{
        const {id} = req.body

        await Components.findByIdAndDelete(id)

        res.redirect('/admin/components')
    })
}