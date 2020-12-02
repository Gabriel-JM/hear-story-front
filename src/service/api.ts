const prefix = 'http://localhost:8000/api'

export const api = {
  get(url: string, customHeaders?: RequestInit) {
    return request(prefix + url, 'get', undefined, customHeaders)
  },

  post(url: string, content: object, customHeaders?: RequestInit) {
    return request(prefix + url, 'post', content, customHeaders)
  },

  put(url: string, content: object, customHeaders?: RequestInit) {
    return request(prefix + url, 'put', content, customHeaders)
  },

  delete(url: string, customHeaders?: RequestInit) {
    return request(prefix + url, 'delete', undefined, customHeaders)
  }
}

async function request(url: string, verb: string, content?: object, customHeaders?: RequestInit) {
  try {
    const response = await fetch(url, customHeaders || {
      headers: {
        'Content-Type': 'application/json'
      },
      method: verb.toLocaleUpperCase(),
      body: JSON.stringify(content),
      mode: 'cors'
    })

    const data = await response.json()

    return {
      status: response.status,
      data,
      ok: response.ok
    }

  } catch(catchedError) {
    return {
      ok: false,
      data: catchedError.message
    }
  }
}
