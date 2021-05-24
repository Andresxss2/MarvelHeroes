"use strict"

const   public_key='fe473f988e6a09d2d31fd7a529f0aaa2',
        private_key='5205fbcb0810b5ef7ac98535856a1d7904c90a71',
        url_characters='http://gateway.marvel.com/v1/public/characters',
        url_comics='http://gateway.marvel.com/v1/public/comics',
        content_comics=document.querySelector('#content_comics')
        

const all_data = results =>{
    const comic_img=`${results.thumbnail.path}/portrait_uncanny.${results.thumbnail.extension}`
    const comic=` 
    <h3 class="comic_title">${results.title}</h3>
    <img src="${comic_img}" alt=${results.title}>
    <div class="show_comics">
        <button value=${results.id} id="favorite_comic" class="btn">
                            <i class="fas fa-heart"></i>
        </button>
    </div>
    `;
    content_comics.insertAdjacentHTML('afterbegin', comic)
}

const get_appi_marvel=()=>{

    const date_ts= Date.now(),
        hash = md5(date_ts+private_key+public_key),
        url=`${url_comics}?ts=${date_ts}&apikey=${public_key}&hash=${hash}`

    fetch(url)
    .then(res => res.json())
    .then(comics=> {
        comics.data.results.forEach(result => {
            //console.log(result)
            all_data(result)
        })
    }).catch(err => console.error(err))
}
get_appi_marvel()
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
listen_id("favorite_comic",bnt_favorite)