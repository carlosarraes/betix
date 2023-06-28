import axios, { AxiosError, Method } from 'axios'
import { useState } from 'react'

export interface ErrorResponse {
  message: string
  field?: string
}

interface UseRequestProps {
  url: string
  method: Method
  body?: any
  onSuccess?: () => void
}

export const useRequest = ({ url, method, body, onSuccess }: UseRequestProps) => {
  const [errors, setErrors] = useState<ErrorResponse | null>(null)

  const isAxiosError = (error: any): error is AxiosError<ErrorResponse> =>
    (error as AxiosError<ErrorResponse>).response !== undefined

  const doRequest = async () => {
    setErrors(null)
    try {
      let response: any
      switch (method.toLowerCase()) {
        case 'get':
          response = await axios.get(url, { params: body })
          if (onSuccess) {
            onSuccess()
          }

          return response.data

        case 'post':
          response = await axios.post(url, body)
          if (onSuccess) {
            onSuccess()
          }

          return response.data

        case 'put':
          response = await axios.put(url, body)
          if (onSuccess) {
            onSuccess()
          }

          return response.data

        case 'delete':
          response = await axios.delete(url, { data: body })
          if (onSuccess) {
            onSuccess()
          }

          return response.data

        default:
          throw new Error(`Method ${method} not supported`)
      }
    } catch (e) {
      if (isAxiosError(e)) {
        setErrors(e?.response?.data || null)
      } else {
        setErrors(null)
      }
    }
  }

  return { doRequest, errors }
}
