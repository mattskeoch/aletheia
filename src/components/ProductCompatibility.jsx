import { useEffect, useState } from 'react'

import { useSession } from '@clerk/nextjs'
import supabaseClient from '@/utils/supabaseClient'

const CompatibilityChecker = ({ productId }) => {
  const [compatibleVehicles, setCompatibleVehicles] = useState([])
  const [loading, setLoading] = useState(false)
  const { session } = useSession()

  useEffect(() => {
    const fetchCompatibleVehicles = async () => {
      try {
        setLoading(true)

        const supabaseAccessToken = await session?.getToken({
          template: 'supabase',
        })

        const supabase = await supabaseClient(supabaseAccessToken)
        
        const { data } = await supabase
          .from('VehiclesProductsCompatibility')
          .select(`
            vehicle_id,
            Vehicles:Vehicles (make, model, year)
          `)
          .eq('product_id', productId)

        const flattenedData = data.map((item) => ({
          ...item.Vehicles,
          vehicle_id: item.vehicle_id,
        }))

        setCompatibleVehicles(flattenedData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompatibleVehicles()
  }, [productId])

  return (
    <div>
      <h2 className='mt-8 font-semibold '>Compatible Vehicles:</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {compatibleVehicles.map((vehicle) => (
            <li key={vehicle.vehicle_id}>{vehicle.make} {vehicle.model} {vehicle.year}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CompatibilityChecker
