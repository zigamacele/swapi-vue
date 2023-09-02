import { Planet } from 'types/apiResponse'

export const getLocalStorage = () => {
  const favorites: Planet[] = JSON.parse(
    localStorage.getItem('favorites') ?? '[]',
  ) as Planet[]

  return { favorites, inStorage: favorites.map((item) => item.name) }
}

export const getRandomNumber = () => {
  return Math.floor(Math.random() * 5)
}
