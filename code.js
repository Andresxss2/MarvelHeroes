"use strict"
console.log("Hola soy code");

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

const btn_izq=()=>{
    console.log("Soy btn_izq")

}
const btn_der=()=>{
    console.log("Soy btn_der")

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
listen_id("searh_izq",btn_izq)
listen_id("searh_der",btn_der)
listen_id("favorite_heroe",bnt_favorite)
listen_class("hidden_options",bars_menu)