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
          .select('*')
          .eq('product_id', productId)

        const vehicleIds = data.map((compatibility) => compatibility.vehicle_id)
        setCompatibleVehicles(vehicleIds)
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
      <h2>Compatible Vehicles:</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {compatibleVehicles.map((vehicleId) => (
            <li key={vehicleId}>{vehicleId}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CompatibilityChecker
