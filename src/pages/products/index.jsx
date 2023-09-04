import { useUser } from '@clerk/nextjs'
import GetProducts from '@/components/GetProducts'

const ProductsHome = () => {
  const { isSignedIn, isLoading, user } = useUser()

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <main>
          <div className="relative isolate overflow-hidden ">
            {isSignedIn ? <GetProducts /> : <div>Sign in to access!</div>}
          </div>
        </main>
      )}
    </>
  )
}

export default ProductsHome
