import { toast } from 'react-toastify'

const apiFetch = async ({ url, method, data }) => {
  try {
    const response = await fetch(`http://localhost:3001/${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if (responseData.msg.includes('!')) {
      toast.success(responseData.msg)
      return responseData // Return the data if successful
    } else {
      toast.error(responseData.msg)
    }
  } catch (error) {
    if (error.response) {
      error.response.json().then((errorMessage) => {
        console.log(errorMessage)
      })
    } else {
      console.log(error.message)
    }
    throw error // Rethrow the error to handle it in the calling function
  }
}

export default apiFetch
