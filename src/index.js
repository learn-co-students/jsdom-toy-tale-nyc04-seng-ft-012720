let addToy = false;

document.addEventListener("DOMContentLoaded", () => {


  const toyList = document.querySelector("#toy-collection")
  const addBtn = document.querySelector("#new-toy-btn")
  const toyForm = document.querySelector(".container")
  const newToyForm = document.querySelector(".add-toy-form")
  fetch("http://localhost:3000/toys")
       .then(response => response.json())
       .then(actualToyData => {
             renderAllToys(actualToyData)
       })
  function renderAllToys(toys) {
           toys.forEach(renderOneToy)
  }

  newToyForm.addEventListener("submit", handleFormSubmit)
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form  
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = "block"
    } else {
      toyForm.style.display = "none"
    }
  })
    
  function handleFormSubmit(event) {
      event.preventDefault()
      const newToy = {
            name: event.target["name"].value,
            image: event.target["image"].value,
            likes: 0
            }
      debugger
      fetch("http://localhost:3000/toys", {
             method: "POST",
             headers: {
                       "Content-Type": "application/json",
                       "Accept": "application/json" 
                      },
             body: JSON.stringify(newToy)
             })
            .then(response => response.json())
            .then(actualNewToy => {
                 console.log(actualNewToy)
                 debugger
                 renderOneToy(actualNewToy)
            })
  }
  function renderOneToy(toyObj) {
      const cardDiv = document.createElement('div')
      cardDiv.className = "card"
      cardDiv.dataset.id = toyObj.id
      cardDiv.innerHTML = `
      <h2 class="name">${toyObj.name}</h2>
      <img class="toy-avatar" src="${toyObj.image}" alt="${toyObj.name}">
      <p class="likes"><strong>${toyObj.likes} Likes</strong></p>
      <button data-action="like" class="like-btn">❤️</button>
    `
    toyList.append(cardDiv)
  }

})

