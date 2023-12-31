import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from '@clerk/nextjs'
import supabaseClient from '@/utils/supabaseClient'
import { Container } from '@/components/Container'
import ProductCompatibility from '@/components/ProductCompatibility'

const ProductPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const { session } = useSession()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const supabaseAccessToken = await session?.getToken({
          template: 'supabase',
        })
        const supabase = await supabaseClient(supabaseAccessToken)
        const { data } = await supabase
          .from('Products')
          .select('*')
          .eq('url_slug', slug)
        setProduct(data[0])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (slug && session) {
      fetchProduct()
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
            <main>
              <h1 className="mx-auto mt-8 max-w-3xl text-xl font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                {product?.title}
              </h1>
              <p>{product?.description}</p>
              <p>{product?.sku}</p>
              <p>{product?.vendor}</p>
              <p>{product?.price}</p>
              <p>{product?.cost_price}</p>
              <ProductCompatibility productId={product?.product_id} />
            </main>
          </Container>
        </>
      )}
    </>
  )
}

export default ProductPage
