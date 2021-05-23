"use strict"
console.log("Hola soy code");

// const hidden_menu = ()=>{
//     menu_bar("menu","menu_open")
// }
// const listen=(elemet_listen,fun_accion)=>{
//     let bar_menu=document.querySelector(`${elemet_listen}`)
//     bar_menu.addEventListener('click',fun_accion)
// }
// const menu_bar= (id, add_class)=>{
//     let nav_menu=document.querySelector(`#${id}`)
//     nav_menu.classList.toggle(`${add_class}`)
// }
// listen("menu_movil",hidden_menu)
    
// Whit this funtion you can add events to buttons
const hidden_menu=()=>{
       console.log('Soy bar menu')
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

const listen= (id_name,funcion_acive)=>{
    const hidden_menu= document.querySelector(`#${id_name}`)
    hidden_menu.addEventListener('click',funcion_acive)
}
listen("menu_movil",hidden_menu)
listen("searh_izq",btn_izq)
listen("searh_der",btn_der)
listen("favorite_heroe",bnt_favorite)