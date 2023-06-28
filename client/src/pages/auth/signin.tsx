import { useState } from 'react'
import Router from 'next/router'
import { useRequest } from '@/hooks/useRequest'

const signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await doRequest()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl mb-4">Sign In</h1>
      <div>
        <label>Email</label>
        <input
          type="text"
          className="border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          className="border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors && (
        <div className="text-red-700">
          <h3>The following error occurred:</h3>
          <span>{errors.message}</span>
        </div>
      )}
      <button>Sign In</button>
    </form>
  )
}

export default signin
