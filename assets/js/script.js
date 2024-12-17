// Inizio script prima pagina


let termsConditions = document.querySelector('#terms input')

let proceed = document.querySelector('#proceed')


let checkAndGo = function (){
    if (termsConditions.checked && termsConditions.value === "ok"){

        window.location.href = "./test" } else {
            window.alert("Flag Your Promise or Go Home !!!")
        }

}

proceed.addEventListener('click', checkAndGo)

// Fine script prima pagina