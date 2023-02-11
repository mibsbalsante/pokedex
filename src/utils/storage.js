export const saveToStorage = list =>
  window.sessionStorage.setItem("pokemonlist", JSON.stringify(list))

export const getFromStorage = () =>
  JSON.parse(window.sessionStorage.getItem("pokemonlist")) || []
