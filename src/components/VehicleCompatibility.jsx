import { useEffect, useState } from 'react';
import supabaseClient from '@/utils/supabaseClient';
import { useSession } from '@clerk/nextjs';
import Link from 'next/link';

const VehicleCompatibility = ({ vehicleId }) => {
    const [compatibleParts, setCompatibleParts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { session } = useSession()
  
    useEffect(() => {
      const fetchCompatibleParts = async () => {
        try {
          setLoading(true);
  
          const supabaseAccessToken = await session?.getToken({
            template: 'supabase',
          });
  
          const supabase = await supabaseClient(supabaseAccessToken);
  
          const { data } = await supabase
            .from('VehiclesProductsCompatibility')
            .select(`product_id,
            Products:Products(title, url_slug)`)
            .eq('vehicle_id', vehicleId);
  
            const flattenedData = data.map((item) => ({
              ...item.Products,
              product_id: item.product_id,
            }))
    
            setCompatibleParts(flattenedData)
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCompatibleParts();
    }, [vehicleId]);
  
    return (
      <div>
        <h2 className='mt-8 font-semibold'>Compatible Parts:</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {compatibleParts.map((product) => (
              <li key={product.product_id}>
              <Link
              className="text-sm font-medium leading-6 text-rose-600 hover:text-rose-800"
              href={`/products/${product.url_slug}`}
            >
              {product.title}
            </Link>
            </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default VehicleCompatibility;