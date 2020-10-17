const mongoose = require('mongoose')
mongoose.connect(`mongodb://myUserAdmin:King%40invest01CDC@178.128.28.54:27017/kinginvest?authSource=admin`,{useNewUrlParser: true ,useUnifiedTopology: true})

const {Types, Schema, model} = mongoose

const uploadsSchema = new Schema({
    path:String,
    name:String,
})

const Uploads = model('uploads', uploadsSchema);

const categoriesSchema = new Schema({
    pagevi : {type : Types.ObjectId , ref : 'pages' , default : undefined},
    pageen : {type : Types.ObjectId , ref : 'pages' , default : undefined},
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

const newSchema = new Schema({
    titlevi : {type : String, default : ''},
    titleen : {type : String, default : ''},
    browser_titlevi : {type : String, default : ''},
    browser_titleen: {type : String, default : ''},
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
    contentvi : {type : String, default : ''},
    contenten : {type : String, default : ''},
    create_date: {type : Date, default : new Date()},
    category : [{type : Types.ObjectId , ref : 'categories'}],
    components_before : [{
        ordering : Number,
        value : {type : Types.ObjectId, ref : 'components'}
    }],
    components_after : [{
        ordering : Number,
        value : {type : Types.ObjectId, ref : 'components'}
    }],
    views: {type : Number , default : 0}
})

const News = model('news', newSchema);


module.exports = {
    Uploads,
    Pages,
    Categories,
    Components,
    News
}