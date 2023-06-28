import { NextPageContext } from 'next'
import buildClient from './api/buildClient'

interface HomeProps {
  currentUser: {
    id: string
    email: string
  } | null
}

const Home = ({ currentUser }: HomeProps) => {
  return <main>{currentUser ? <h1>You are signed in</h1> : <h1>You are NOT signed in</h1>}</main>
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  try {
    const client = buildClient(ctx.req!)
    const { data } = await client.get('/api/users/current')

    return data
  } catch (error) {
    return { currentUser: null }
  }
}

export default Home
