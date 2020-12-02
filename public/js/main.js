const e = require("express");

const smoothScroll = function(track, startX, endX, startY, endY,duration) {
    var lengthX = endX - startX
    var lengthY = endY - startY
    var startTime = new Date().getTime()

    var interval = setInterval(() => {
        var currentTime = new Date().getTime()
        var timeSpend = currentTime - startTime;
        var timeSpendPercent = timeSpend / duration

        if(timeSpendPercent >= 1){
            track.scroll(endX, endY)
            clearInterval(interval)
        }
        if(timeSpendPercent < 1){
            track.scroll(startX + lengthX * timeSpendPercent, startY + lengthY * timeSpendPercent)
        }
    }, 10);

}

const increaseNumber = function(element , start, end, duration){
    var startTime = new Date()
    var interval = setInterval(function() {
        var currTime = new Date()
        if(currTime - startTime >= duration) {
            clearInterval(interval)
            element.innerText = end
        }else{
            var percent = (currTime - startTime) / duration
            element.innerText = start + (end - start) * percent
        }
        
    },33.3333)
}

const cookies = document.cookie
if(!cookies.includes('language=vi')){
    document.cookie = 'language=vi'
    location.reload()
}