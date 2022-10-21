const API_URL =
  process.env.NEXT_PUBLIC_API_BASE

export const fetchGet = async (url: string, data?: any) => {
    try {
      const qs = new URLSearchParams(data)
      const response = await fetch(API_URL + url + '?' + qs).then((res) => res.json())
      return response
    } catch (err: any) {
      console.log(err.message)
    }
  }
  
  export const fetchPost = async (url: string, data?: any) => {
    try {
      const response = await fetch(API_URL + url, {
        method: 'POST',
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
      })
      return await response.json() // parses JSON response into native JavaScript objects
    } catch (err: any) {
      console.log(err.message)
    }
  }