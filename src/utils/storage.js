export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    console.log(err)

    return data
  }
}

export const setItem = (name, value) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value
  window.localStorage.setItem(name, data)
}

export const remove = name => {
  window.localStorage.removeItem(name)
}
