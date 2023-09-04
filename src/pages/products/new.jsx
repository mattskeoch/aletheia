import { useUser } from '@clerk/nextjs'
import AddPart from '@/components/AddProductForm'
import Container from '@/components/Container'

const newProductHome = () => {
  const { isSignedIn, isLoading, user } = useUser()

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <main>
          <div className="relative isolate overflow-hidden pt-16">
            {isSignedIn ? <AddPart /> : <div>Sign in to access!</div>}
          </div>
        </main>
      )}
    </>
  )
}

export default newProductHome
