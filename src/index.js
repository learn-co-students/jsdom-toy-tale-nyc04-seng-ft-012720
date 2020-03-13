let addToy = false;
let collection = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
    /*Grab all the data from our backend using fetch. Throw it in a function
    might use it later*/
    
    function toyList(){
    fetch('http://localhost:3000/toys')
    // .then(res => res.json())
    console.log("done")
    }
})

