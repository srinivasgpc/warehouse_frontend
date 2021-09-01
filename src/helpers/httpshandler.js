export const get = (url) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3001",
    },
  }
  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data
    })
}
export const post = (url, payload) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }

  return fetch(`${url}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data
    })
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      const error = (data && data.message) || response.statusText

      return Promise.reject(error)
    }
    return data
  })
}
