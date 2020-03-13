let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });


const toyBox = document.querySelector("#toy-collection")
document.addEventListener("submit",handleFormSubmit)

function handleFormSubmit(event){
  event.preventDefault()
  
  toyFormTarget = event.target

  const toyName = toyFormTarget["name"].value
  const toyImage = toyFormTarget["image"].value

  const toyObj = {
    name: toyName,
    image: toyImage,
    likes: 0
  } 
    fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json" 
    },
    body: JSON.stringify(toyObj)
  })
    .then(response => response.json())
    .then(actualNewToy => {
      renderOneToy(actualNewToy)
    })

}

function renderOneToy(toy) {
  
  const outerDiv = document.createElement("div")
  outerDiv.className = "card"
  outerDiv.dataset.id = toy.id

  outerDiv.innerHTML = `
    <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} </p>
  <button class="like-btn">Like <3</button>
  `
  
  toyBox.append(outerDiv)
}

function renderAllToys(toyList) {
  toyList.forEach(renderOneToy)
}

/**************** Initial Render ****************/
fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(actualToysData => {
    // in here, we can access the data
    renderAllToys(actualToysData)
  })

  toyBox.addEventListener("click", e =>{
    if(e.target.className === "like-btn"){
      const card = e.target.closest(".card")
      const likesCount = card.querySelector("p")
      const newLikes = parseInt(likesCount.textContent) + 1
      const toyId = card.dataset.id

      fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify({ likes: newLikes })
    })

    likesCount.textContent = newLikes
  }
      
    })
});

