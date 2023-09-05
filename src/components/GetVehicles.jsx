import { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from '@clerk/nextjs'
import supabaseClient from '@/utils/supabaseClient'
import Link from 'next/link'
import Container from '@/components/Container'

const GetVehicles = () => {
  const { session } = useSession()
  const [loading, setLoading] = useState(true)
  const [vehicles, setVehicles] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const supabaseAccessToken = await session.getToken({
          template: 'supabase',
        })
        const supabase = await supabaseClient(supabaseAccessToken)
        const { data: vehicles } = await supabase.from('Vehicles').select('*')
        setVehicles(vehicles)
      } catch (e) {
        alert(e)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [session])

  if (loading) {
    return (
      <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">Loading...</div>
    )
  }

  return (
    <Container>
      <h1 className="mx-auto mt-8 max-w-3xl text-xl font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
        Vehicles
      </h1>
      <ul className="space-y-16 py-16 xl:space-y-20">
        {vehicles.map((vehicle, index) => (
          <li key={index}>
            {vehicle.make} {vehicle.model} {vehicle.year}
            <span>{vehicle.variant}</span>
            <Link
              className="text-sm font-medium leading-6 text-rose-600 hover:text-rose-800"
              href={`/vehicles/${vehicle.url_slug}`}
            >
              View
              <span className="hidden sm:inline"> vehicle</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}

export default GetVehicles
