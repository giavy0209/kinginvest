module.exports = function mapcat(categories, language) {
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