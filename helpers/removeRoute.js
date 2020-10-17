module.exports = function (listRoutes, path) {
    listRoutes.forEach((route,index) => {
        if(route.route){
            if(path.indexOf(route.route.path) !== -1 ) {
                console.log(route.route.path);
                listRoutes.splice(index, 1)
            }
        }
    })
}