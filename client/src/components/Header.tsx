import Link from 'next/link'

interface HeaderProps {
  currentUser: {
    id: string
    email: string
  } | null
}

const Header = ({ currentUser }: HeaderProps) => {
  return (
    <header className="flex justify-between">
      <Link href="/">Betix</Link>
      <div>
        {currentUser ? (
          <Link href="/auth/signout">Sign Out</Link>
        ) : (
          <>
            <Link href="/auth/signin">Sign In</Link>
            <Link href="/auth/signup">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
