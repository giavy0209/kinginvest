window.addEventListener('load', function() {
    var handlechangehash = function () {
        console.log(123);
        var locationhash = location.hash.trim().replace('#','')

        if(locationhash.includes('/')){
            locationhash = locationhash.slice(0, locationhash.indexOf('/'))
        }

        if(locationhash && locationhash !== ''){
            var blockofhash = document.querySelector('[data-id="'+locationhash+'"]')
            if(blockofhash){
                smoothScroll(window, 0 , 0 , window.scrollY , blockofhash.offsetTop, 300)
            }
        }
    }
    handlechangehash()
    window.onhashchange = handlechangehash


    var atag = Array.from(document.querySelectorAll('a'))

    Array.from(document.querySelectorAll('#block7 .description img')).forEach(function(el) { 
        el.parentElement.classList.add('img')
        if(window.innerWidth > 992){
            el.parentElement.classList.add('img-1-1')
        }else{
            el.parentElement.classList.add('img-3-1')
        }
    })

    var banner = Array.from(document.querySelectorAll('.banner'))
    banner.forEach(function(el){
        var info = Array.from(el.querySelectorAll('.block-banner .info'))
        info.forEach(function(el){
            el.style.width = document.querySelector('.kdg-container').offsetWidth + 'px'
        })

        var blockBanner = el.querySelectorAll('.block-banner')
        var currentIndex = 0
        setInterval(function(){
            console.log(currentIndex);
            el.style.setProperty('--current-index' , currentIndex)            
            currentIndex++ 
            console.log(blockBanner.length,currentIndex);
            if(currentIndex >= blockBanner.length){
                currentIndex = 0
            }
        }, 5000);

        var listCount = Array.from(el.querySelectorAll('.count .top .text'))
        listCount.forEach(function(el){
            var number = el.innerText.trim().replace(/$/g , '').replace(/+/g , '')
            
        })
    })

    var block6 = Array.from(document.querySelectorAll('.block6'))

    block6.forEach(function(el){
        var des = el.querySelectorAll('.maincontent .des')

        var heightest = des[0].offsetHeight

        des.forEach(function(el){
            if(el.offsetHeight > heightest){
                heightest = el.offsetHeight
            }
        })

        des.forEach(function(el){
            el.style.height = heightest + 'px'
        })

    })

    var block12 = Array.from(document.querySelectorAll('.block12'))

    block12.forEach(function(el){
        var block = Array.from(el.querySelectorAll('.content'))
        var heightest = block[0].offsetHeight

        block.forEach(function(el){
            if(el.offsetHeight > heightest){
                heightest = el.offsetHeight
            }
        })

        block.forEach(function(el){
            el.style.height = heightest + 'px'
        })

    })
})