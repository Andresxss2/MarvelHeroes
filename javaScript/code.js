"use strict"

const   public_key='fe473f988e6a09d2d31fd7a529f0aaa2',
        private_key='5205fbcb0810b5ef7ac98535856a1d7904c90a71',
        url_characters='http://gateway.marvel.com/v1/public/characters',
        url_comics='http://gateway.marvel.com/v1/public/comics',
        content_comics=document.querySelector('#content_comics'),
        searh=document.querySelector('#search'),
        add_serch=document.querySelector('#search_favorites')
        



// capture all data for user view 
const all_data = results =>{
    const comic_img=`${results.thumbnail.path}/portrait_uncanny.${results.thumbnail.extension}`,
            comic=` 
            <h3 class="comic_title">Title: ${results.title}</h3>
            <img src="${comic_img}" alt=${results.title}>
            <div class="show_comics">
                <button value=${results.id} id="favorite_comic" class="btn">
                                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <h4>about :</h4>
            <p>${results.description}</p>

            `;
            // console.log(results )
            content_comics.insertAdjacentHTML('afterbegin', comic)
}

const _fech_app_process=(url, funtion_action)=>{
    fetch(url)
    .then(res => res.json())
    .then(comics=> {
        if(comics.data.count===0){
            return funtion_action("lost_data")
        }
        comics.data.results.forEach(result => {
            funtion_action(result)
            
        })})
        .catch(err => console.error(err))
}

const get_appi_marvel=()=>{
    const date_ts= Date.now(),
    hash = md5(date_ts+private_key+public_key),
    url=`${url_comics}?ts=${date_ts}&apikey=${public_key}&hash=${hash}`
    _fech_app_process(url,all_data)
}
get_appi_marvel()

// capture when user serch a comic
// ?nameStartsWith=iron%20man&orderBy=name
const serch_data = results =>{
    if(results==="lost_data"){
        
        const comic=`<p>No se encontro tu busqueda, intenta con otro nombre</p>`;
        
        add_serch.insertAdjacentHTML('afterbegin', comic)
    }
    else if(typeof(results.title)==="undefined"){
       
        const comic_img=`${results.thumbnail.path}/portrait_uncanny.${results.thumbnail.extension}`,
            comic=`
            
                <div class="show_comics_add">
                    <h3 class="comic_title">${results.name}</h3>
                    <img src="${comic_img}" alt=${results.name}>
                    <button id="favorite_comics" class="btn">
                        <i class="fas fa-heart"></i>
                    </button>
                    <h4>about :</h4>
                    <p>${results.description}</p>
                    
                </div>`;    
        add_serch.insertAdjacentHTML('afterbegin', comic)
    }
    else{
        const comic_img=`${results.thumbnail.path}/portrait_uncanny.${results.thumbnail.extension}`,
        comic=`
        
            <div class="show_comics_add">
                <h3 class="comic_title">${results.title}</h3>
                <img src="${comic_img}" alt=${results.title}>
                <button id="favorite_comics" class="btn">
                    <i class="fas fa-heart"></i>
                </button>
                <h4>about :</h4>
                <p>${results.description}</p>
                
            </div>
        
        `;    
        add_serch.insertAdjacentHTML('afterbegin', comic)
    }   

}

const search_comics = name =>{
    const   date_ts= Date.now(),
            hash = md5(date_ts+private_key+public_key),
            comic=encodeURIComponent(name),
            search_comics_url=`${url_comics}?format=comic&formatType=comic&noVariants=true&titleStartsWith=${comic}&orderBy=title&ts=${date_ts}&apikey=${public_key}&hash=${hash}`,
            search_character_url=`${url_characters}?nameStartsWith=${comic}&orderBy=name&ts=${date_ts}&apikey=${public_key}&hash=${hash}`

    // get comics data
    _fech_app_process(search_comics_url,serch_data)

    //get characters data
     _fech_app_process(search_character_url,serch_data)
    
}

searh.addEventListener('keyup', key=>{
    if(key.keyCode === 13){
        add_serch.innerHTML=''
        search_comics(key.target.value.trim().replace(' ','-'))
        
    }
})
        


//capute when user cliked on bar menu

const bars_menu=()=>{
       console.log('Soy bar menu')
       let hidden_menu=document.querySelector('.menu')
       
       // Option menu close on cliked
       
       let add_exit=document.querySelector('.menu_movil i')
       if(hidden_menu.classList.toggle('menu_hidden')){
            add_exit.classList.remove('fa-bars')
            add_exit.classList.add('fa-times')

        }else{
            add_exit.classList.remove('fa-times')
            add_exit.classList.add('fa-bars')
       }
}
const bnt_favorite=()=>{
    console.log("Soy fav")

}

const listen_id= (id_name,funcion_acive)=>{
    const hidden_menu= document.querySelector(`#${id_name}`)
    hidden_menu.addEventListener('click',funcion_acive)
}

const listen_class= (class_name,funcion_acive)=>{
    const hidden_menus= document.querySelectorAll(`.${class_name}`)
    for (const hidden_menu of hidden_menus) {
        hidden_menu.addEventListener('click',funcion_acive)
    }
}

listen_id("menu_movil",bars_menu)
listen_class("hidden_options",bars_menu)
// listen_id("favorite_comic",bnt_favorite)