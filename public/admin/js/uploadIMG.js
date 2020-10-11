var socket = io();
var socket = io.connect();
var uploader = new SocketIOFileUpload(socket);
uploader.listenOnInput(document.getElementById("siofu_input"));

uploader.listenOnInput(document.getElementById("siofu_input"));

uploader.addEventListener('start',function(event){
    document.getElementById("file-loaded").style.width = '0%';
})

uploader.addEventListener('progress',function(event){
    document.getElementById("file-loaded").style.width = (event.bytesLoaded / event.file.size) * 100 + '%';
})

uploader.addEventListener('complete',function(event){
    document.getElementById("file-loaded").style.width = "100%";
})