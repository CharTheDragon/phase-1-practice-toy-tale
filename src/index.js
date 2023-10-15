let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.querySelector('.add-toy-form').addEventListener('submit',handleSubmit)

function handleSubmit(e){
  e.preventDefault()
  console.log(e.target.image.value)
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  
  renderOneToy(toyObj)
  addAToy(toyObj)
}

function renderOneToy(toy){
  let card = document.createElement('li')
  card.className = 'card'
  card.innerHTML = `
    <img src="${toy.image}" class="toy-avatar" />
    <div>
      <h2>${toy.name}</h4>
      <p>
        <span>${toy.likes} Likes!</span>
      <p>
    </div>
    <div class="like-btn" id="[toy_id]">
      <button> Like </button>
    </div>
  `
  card.querySelector('.like-btn').addEventListener('click',() => {
    toy.likes++
    card.querySelector('span').textContent = `${toy.likes} Likes!`
    addLikes(toy)
  })
  document.querySelector('#toy-collection').appendChild(card)
}



function addLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
})
  .then(res => res.json())
  .then(toyObj => console.log(toyObj))
}


function getAllToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => data.forEach(toy => renderOneToy(toy)))
}







function addAToy(toyObj){
  console.log(JSON.stringify(toyObj))
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObj)
    })
  .then(res => res.json())
  .then(data => console.log(data))
 }


function initialize(){
  getAllToys()
}
initialize()