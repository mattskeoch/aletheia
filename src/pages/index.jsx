import { Fragment, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import Container from '@/components/Container'

export default function Home() {
  const { isSignedIn, isLoading, user } = useUser()

  return (
    <Container>
      {' '}
      <>
        {isLoading ? (
          <> </>
        ) : (
          <main>
            <div className="relative isolate overflow-hidden pt-16">
              {isSignedIn ? (
                <>
                  <div>Welcome {user.firstName}!</div>
                </>
              ) : (
                <div>Sign in to access!</div>
              )}
            </div>
          </main>
        )}
      </>{' '}
    </Container>
  )
}
