import { toast } from 'react-toastify'

const apiFetch = async ({ url, method, data }) => {
  try {
    const token = localStorage.getItem('token')

    const response = await fetch(`http://localhost:3001/${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(data)
    })

    const responseData = await response.json()

    if (responseData.msg && responseData.msg.includes('!')) {
      toast.success(responseData.msg)
      return responseData
    } else if (responseData.msg) {
      toast.error(responseData.msg)
    } else {
      return responseData
    }
  } catch (error) {
    if (error.response) {
      error.response.json().then((errorMessage) => {
        console.log(errorMessage)
      })
    } else {
      console.log(error.message)
    }
    throw error
  }
}

export default apiFetch
