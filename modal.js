const mongoose = require('mongoose')
mongoose.connect(`mongodb://kdg:kingdomgame%40%4040@206.189.147.72:27017/kinginvest?authSource=admin`,{useNewUrlParser: true ,useUnifiedTopology: true})

const {Types, Schema, model} = mongoose

const uploadsSchema = new Schema({
    path:String,
    name:String,
})

const Uploads = model('uploads', uploadsSchema);

const categoriesSchema = new Schema({
    pagevi : {type : Types.ObjectId , ref : 'pages'},
    pageen : {type : Types.ObjectId , ref : 'pages'},
    titlevi : {type : String, default : ''},
    titleen: {type : String, default : ''},
    meta_titlevi : {type : String, default : ''},
    meta_titleen: {type : String, default : ''},
    iconvi : {type : String, default : ''},
    iconen: {type : String, default : ''},
    slugvi : {type : String, default : ''},
    slugen : {type : String, default : ''},
    metadesvi : {type : String, default : ''},
    metadesen : {type : String, default : ''},
    meta_og_img_vi : {type : String, default : ''},
    meta_og_img_en : {type : String, default : ''},
    show_vi : {type : Boolean, default : true},
    show_en : {type : Boolean, default : true},
    open_new_tab_vi : {type : Boolean, default : true},
    open_new_tab_en : {type : Boolean, default : true},
    ordering_vi : {type : Number , default : 1},
    ordering_en : {type : Number , default : 1},
    
})

const Categories = model('categories', categoriesSchema);



const pageSchema = new Schema({
    name : {type : String, default : 'King Invest'},
    ordering : {type : Number , default : 1},
    components : [{
        ordering : Number,
        value : {type : Types.ObjectId, ref : 'components'}
    }]
})

const Pages = model('pages', pageSchema);

const componentSchema = new Schema({
    key : String,
    id : String,
    name:String,
    humanName:String,
    ordering: {type : Number, default : 1},
    datas : Schema.Types.Mixed,
})

const Components = model('components', componentSchema);


module.exports = {
    Uploads,
    Pages,
    Categories,
    Components
}