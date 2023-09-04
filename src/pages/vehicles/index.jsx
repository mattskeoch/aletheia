import { useUser } from '@clerk/nextjs'
import GetVehicles from '@/components/GetVehicles'

const VehiclesHome = () => {
  const { isSignedIn, isLoading, user } = useUser()

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <main>
          <div className="relative isolate overflow-hidden ">
            {isSignedIn ? <GetVehicles /> : <div>Sign in to access!</div>}
          </div>
        </main>
      )}
    </>
  )
}

export default VehiclesHome
