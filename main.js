let test = document.querySelector(".test")
let container = document.querySelector(".timeline")

let submit = document.querySelector("#submit")
let username = document.querySelector("#username")

//let timeline = document.querySelector(".timeline")
let timeline = document.querySelector(".wrap")

let userInfo = document.querySelector(".user-info")

function getUsername() {
  console.log(username.value)
  return username.value
}

function cleanScreen() {
  while (timeline.firstChild) {
    timeline.firstChild.remove();
  }
  userInfo.firstChild.remove()
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
  let userProfile = await fetch(`https://api.github.com/users/${getUsername()}`)
  //let userProfile = await fetch(`https://api.github.com/users/patilankita79`)
  //https://api.github.com/users/patilankita79
  let test = await data.json()
  let profile = await userProfile.json()

  let lol = document.createElement("div")
  lol.className = "profile-info"

  let oe = document.createElement("div")
  let nickname = document.createElement("h3")
  let location = document.createElement("p")
  location.textContent = profile.location
  nickname.textContent = profile.login
  let pic = document.createElement("img")
  pic.setAttribute("src", `${profile.avatar_url}`)

  let userLink = document.createElement("a")
  userLink.textContent = "Visit profile"
  userLink.setAttribute("href", profile.html_url)

  console.log(userLink)
  
  lol.appendChild(pic)
  oe.appendChild(nickname)
  
  oe.appendChild(location)
  oe.appendChild(userLink)
  //lol.appendChild(nickname)
  //lol.appendChild(location)
  lol.appendChild(oe)
  pic.className = "avatar"
  userInfo.appendChild(lol)
  
  test.sort((a, b) => {
    let dateA = new Date(a.created_at),
      dateB = new Date(b.created_at);
    return dateA - dateB;
  })

  let array = []

  console.log(test)
  console.log(profile)

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


