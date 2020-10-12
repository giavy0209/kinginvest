var listComponents = []
    const listDataComponents = []
    
    const showcombtn = document.getElementById('showcomponent')
    const modal = document.getElementById('modal-components')

    window.onkeyup = e => {
        if(e.keyCode === 27)  modal.style.display = 'none'
    }

    showcombtn.onclick = () => {
        modal.style.display = 'block'
    }

    const closecombtn = document.getElementById('closemodal')

    closecombtn.onclick = () => {
        modal.style.display = 'none'
    }

    document.querySelectorAll('#modal-components button').forEach(el => {
        el.addEventListener('click', () => {
            var key = el.getAttribute('data-key')
            var com = JSON.parse(JSON.stringify(rawListComponents.find(o => o.key === key)))
            com.id = com.key + new Date().getTime()
            console.log(com);
            com.datas.forEach(_com => {
                if(_com.type === 3){
                    var objData = {}
                    Object.keys(_com.data_info).forEach(data_info => {
                        objData[data_info] = undefined
                    })
                    _com.data = [objData]
                }
                if(_com.type !== 3){
                    _com.value = undefined
                }
            })
            listComponents[0] = com
            console.log(listComponents);
            addComponentDataHTML()
        })
    })

    const containerDataHTML = document.getElementById('multi')

    const getData3 = (data_info,data,parentkey) => {
        var html = ``
        data.forEach(subdata => {
            html += `<div parent-name="${parentkey}" class="group-sub-data">`
            Object.keys(data_info).forEach(key => {

                if(data_info[key] === 2){
                    html += `
                    <textarea data-type="${data_info[key]}" id="${key}" name="${key}"></textarea>
                    <script>
                        CKEDITOR.replace( '${key}',{height: 500} );
                    </script>
                    `
                }
                if(data_info[key] !==2 ){
                    html += `
                            
                            <span>${key}</span>
                            <input data-type="${data_info[key]}" type="${
                            data_info[key] === 0 ? 'number' : 
                            data_info[key] === 1 ? 'text' : 
                            'checkbox'
                            }" 
                            placeholder="${data_info[key] === 0 ? 'Nhập số' : 'Nhập chữ'}"
                            ${
                                data_info[key] === 4 ? `${subdata[key] ? 'checked' : ''}` : `${subdata[key] ? `value="${subdata[key]}"` : 'value=""'}`
                            }
                            name="${key}">    
                            
                    `
                }
            })
            html += `</div>`
        })
        return html
    }

    const addSubInput = (id,key) =>{

        var com = listComponents.findIndex(o => o.id === id)
        var data = {...listComponents[com].datas.find(o => o.key === key)}
        var dataindex = listComponents[com].datas.findIndex(o => o.key === key)
        var objData = {}
        Object.keys(data.data_info).forEach(data_info => {
            objData[data_info] = undefined
        })


        var data = {
            ...data,
            data : [...data.data,objData]
        }

        listComponents[com].datas[dataindex] = data
        addComponentDataHTML()
    }   


    function addComponentDataHTML (){
        var html = `<div class="list-choosed-component">`
        listComponents.forEach((el,index) => {
            html += `
            <div data-key="${el.key}" data-id="${el.id}" class="choosed-component">
                <p>${el.name}</p>
            `
            
            el.datas.forEach(data => {
                html += ` <div name="${data.key}" data-type="${data.type}" class="group"><span class="title-group">${data.key}</span>`
                
                if(data.type === 2){
                    html += `
                    <textarea data-type="${data.type}" name="${data.key}"></textarea>
                    <script>
                        CKEDITOR.replace( '${data.key}',{height: 500} );
                    </script>
                    `
                }
                
                if(data.type === 3){
                    html += getData3(data.data_info , data.data,data.key)
                    html += `<button onclick="addSubInput('${el.id}','${data.key}','${data.key}')" type="button"> Thêm trường dữ liệu </button>`
                }
                if(data.type !== 2 && data.type !== 3){
                    html += `
                    <input type="${
                    data.type === 0 ? 'number' : 
                    data.type === 1 ? 'text' : 
                    'checkbox'
                    }" 
                    placeholder="${
                        data.type === 0 ? 'Nhập số' : 
                        'Nhập chữ'
                        }
                    "
                    name="${data.key}">
                    `
                }

                html += `</div>`
            })

            html +=`</div>`
        })
        html += '</div>'
        containerDataHTML.firstElementChild.remove()
        containerDataHTML.insertAdjacentHTML('afterbegin', html)
    }