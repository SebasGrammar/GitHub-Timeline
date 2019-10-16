let test = document.querySelector(".test")
let container = document.querySelector(".timeline")

let submit = document.querySelector("#submit")
let username = document.querySelector("#username")

//let timeline = document.querySelector(".timeline")
let timeline = document.querySelector(".wrap")


function getUsername() {
  console.log(username.value)
  return username.value
}

function cleanScreen() {
  while (timeline.firstChild) {
    timeline.firstChild.remove();
  }
}

function component(property, text, rName) {

  let item = document.createElement("li")
  let content = document.createElement("div")
  let name = document.createElement("h4")
  let date = document.createElement("p")
  let url = document.createElement("a")

  /*******/

  /*******/

  name.textContent = rName
  setAttributes(url, property)
  content.className = "content";
  console.log(text.split("-"))
  date.textContent = new Date(text)


  /*******/

  content.appendChild(name)
  content.appendChild(url)
  content.appendChild(date)
  item.appendChild(content)
  timeline.appendChild(item)

  return item
}

function setAttributes(element, value) {
  element.setAttribute("href", value)
  element.textContent = value
}

async function retrieveData(username) {

  cleanScreen()

  let data = await fetch(`https://api.github.com/users/${getUsername()}/repos`)
  let test = await data.json()

  test.sort((a, b) => {
    let dateA = new Date(a.created_at),
      dateB = new Date(b.created_at);
    return dateA - dateB;
  })

  let array = []

  console.log(test)

  test.forEach(repository => {
    console.log(repository.created_at)
    let item = component(repository.html_url, repository.created_at, repository.name)


    array.push(item)

    timeline.appendChild(item)

  })

  return array

}

submit.addEventListener("click", retrieveData)
username.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    retrieveData()
  }
})


