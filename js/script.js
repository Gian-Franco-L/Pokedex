const pokeName = document.querySelector(".pokemonData__name")
const pokeNumber = document.querySelector(".pokemonData__number")
const pokeImage = document.querySelector(".pokemon__image")
const pokeForm = document.querySelector(".form")
const pokeInput = document.querySelector(".form__search")
const pokePrev = document.querySelector(".btn-prev")
const pokeNext = document.querySelector(".btn-next")

let pokeSearch = 25

const pokeFetch = async (pokemon) =>{
  const APIResp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  if(APIResp.status === 200){
    const data = await APIResp.json()
    return data
  }
}

const pokeRender = async (pokemon) =>{
  pokeName.innerHTML = "Loading ..."
  const data = await pokeFetch(pokemon)

  if(data){
    if(data.id<650){
      pokeImage.style.display = "block"
      pokeName.innerHTML = data.name
      pokeNumber.innerHTML = data.id
      pokeImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
      pokeInput.value = ""
      pokeSearch = data.id
    }
  }else{
    pokeName.innerHTML = "Not Found"
    pokeImage.style.display = "none"
    pokeNumber.innerHTML = "0"
  }
}

pokeForm.addEventListener("submit", (event) =>{
  event.preventDefault()
  pokeRender(pokeInput.value.toLowerCase())
})

pokeNext.addEventListener("click", () =>{
  if(pokeSearch < 649){
    pokeSearch++
    pokeRender(pokeSearch)
  }
})

pokePrev.addEventListener("click", () =>{
  if(pokeSearch > 1){
    pokeSearch--
    pokeRender(pokeSearch)
  }
})

pokeRender(pokeSearch)