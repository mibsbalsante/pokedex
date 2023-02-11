export const formatPokemonData = (
  { id, abilities, height, name, sprites, types, weight },
  { chain }
) => {
  const evolutionChain = [[chain.species.name]]
  let currentPokemon = chain.evolves_to

  while (currentPokemon?.[0]) {
    evolutionChain.push(currentPokemon.map(({ species }) => species.name))
    currentPokemon = currentPokemon[0].evolves_to
  }

  return {
    id,
    abilities: abilities.map(({ ability }) => ability.name),
    height,
    name,
    sprites: {
      back_default: sprites.back_default,
      front_default: sprites.front_default,
      other: sprites.other,
    },
    types: types.map(({ type }) => type.name),
    weight,
    evolutionChain,
  }
}
