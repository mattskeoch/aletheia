import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from '@clerk/nextjs'
import supabaseClient from '@/utils/supabaseClient'
import { Container } from '@/components/Container'
import VehicleCompatibility from '@/components/VehicleCompatibility';

const VehiclePage = () => {
  const router = useRouter()
  const { slug } = router.query
  const { session } = useSession()
  const [loading, setLoading] = useState(true)
  const [vehicle, setVehicle] = useState(null)

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        setLoading(true)
        const supabaseAccessToken = await session?.getToken({
          template: 'supabase',
        })
        const supabase = await supabaseClient(supabaseAccessToken)
        const { data } = await supabase
          .from('Vehicles')
          .select('*')
          .eq('url_slug', slug)
        setVehicle(data[0])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (slug && session) {
      fetchVehicle()
    }
  }, [slug, session])

  return (
    <>
      {' '}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Container>
            <h1 className="mx-auto mt-8 max-w-3xl text-xl font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
              {vehicle?.make}
            </h1>
          </Container>
          <Container>
            <main>
              <p>{vehicle?.make}</p>
              <p>{vehicle?.modle}</p>
              <p>{vehicle?.year}</p>
              <p>{vehicle?.variant}</p>
              <VehicleCompatibility vehicleId={vehicle.vehicle_id} />
            </main>
          </Container>
        </>
      )}
    </>
  )
}

export default VehiclePage
