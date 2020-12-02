const fs = require('fs')
const {Uploads} = require('../../modal')
var multer = require('multer')
var upload = multer({ dest: './public/' })

const itemperpage = 9999
const path = require('path')
module.exports = app => {
    app.get('/admin/uploads' , async (req,res) => {
        var {page} = req.query

        if(!Number(page)) page = 1

        var totalItem = Uploads.countDocuments({})

        var skip = (page - 1) * itemperpage
        var images = await Uploads.find({}).skip(skip).limit(itemperpage).sort({_id : -1})

        res.render('admin/files/index', {
            adminPage : 'uploads',
            data : images,
            page,
            totalPage : Math.ceil(totalItem / itemperpage)
        })


    })

    app.post('/admin/upload', upload.single('image'),async function (req, res, next) {
        var file = req.file
        console.log(file);
        var name = req.body.name
        var ex = path.extname(file.originalname)
        var img = new Uploads({name})
        img.path = '/upload/' + img._id + ex
        await img.save()
        fs.renameSync(path.join(__dirname, `../../public/${file.filename}`),path.join(__dirname, `../../public/upload/${img._id + ex}`))
        
        res.redirect('/admin/uploads')
    })

    app.post('/admin/uploads/delete',async function (req, res) {
        var {id} = req.body
        var img = await Uploads.findById(id)
        fs.unlinkSync(path.join(__dirname, `../../public/`,img.path))
        await Uploads.findByIdAndDelete(id)
        
        res.redirect('/admin/uploads')
    })
}