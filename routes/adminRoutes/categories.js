const {Pages,Categories} = require('../../modal')


module.exports = app => {
app.get('/admin/categories', async (req,res) => {
    var categories = await Categories.find({}).sort({_id : -1})
    res.render('admin/categories/list', {
        adminPage : 'categories',
        data : categories
    })
})

app.get('/admin/categories/add', async (req,res) => {
    var pages = await Pages.find({})
    res.render('admin/categories/add', {
        adminPage : 'categories',
        pages
    })
})

app.post('/admin/categories/add', async (req,res)=>{
    req.body.show_vi = req.body.show_vi === 'on' ? true : false
    req.body.show_en = req.body.show_en === 'on' ? true : false
    req.body.open_new_tab_vi = req.body.open_new_tab_vi === 'on' ? true : false
    req.body.open_new_tab_en = req.body.open_new_tab_en === 'on' ? true : false
    const category = new Categories(req.body)

    await category.save()
    // require('./categoriesRoutes')(app)

    res.redirect('/admin/categories/add')
})

app.get('/admin/categories/edit/:id', async (req,res) => {
    var {id} = req.params
    var category = await Categories.findById(id)
    var pages = await Pages.find({})
    res.render('admin/categories/edit', {
        adminPage : 'categories',
        id,
        data : category,
        pages
    })
})

app.post('/admin/categories/edit', async (req,res)=>{
    var {id} = req.body
    req.body.show_vi = req.body.show_vi === 'on' ? true : false
    req.body.show_en = req.body.show_en === 'on' ? true : false
    req.body.open_new_tab_vi = req.body.open_new_tab_vi === 'on' ? true : false
    req.body.open_new_tab_en = req.body.open_new_tab_en === 'on' ? true : false
    const category = await Categories.findByIdAndUpdate(id,req.body)
    // require('./categoriesRoutes')(app)
    res.redirect('/admin/categories/edit/'+id )
})

app.post('/admin/categories/delete',async function (req, res) {
    var {id} = req.body

    await Categories.findByIdAndDelete(id)
    // require('./categoriesRoutes')(app)
    
    res.redirect('/admin/categories')
})
}