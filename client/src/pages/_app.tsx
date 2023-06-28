import '@/styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import buildClient from './api/buildClient'
import Header from '@/components/Header'

interface ExtendedAppProps extends AppProps {
  currentUser: {
    id: string
    email: string
  } | null
}

export default function App({ Component, pageProps, currentUser }: ExtendedAppProps) {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  )
}

App.getInitialProps = async (appCtx: AppContext) => {
  try {
    const client = buildClient(appCtx.ctx.req!)
    const { data } = await client.get('/api/users/current')
    let pageProps = {}
    if (appCtx.Component.getInitialProps) {
      pageProps = await appCtx.Component.getInitialProps(appCtx.ctx)
    }

    return { pageProps, ...data }
  } catch (e) {
    return {}
  }
}
