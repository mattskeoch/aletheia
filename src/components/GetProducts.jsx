import { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from '@clerk/nextjs'
import supabaseClient from '@/utils/supabaseClient'
import Link from 'next/link'
import Container from '@/components/Container'
import { PlusSmallIcon } from '@heroicons/react/20/solid'

const statuses = {
  Average: 'text-green-700 bg-green-50 ring-green-600/20',
  High: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Low: 'text-red-700 bg-red-50 ring-red-600/10',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const GetProducts = () => {
  const { session } = useSession()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const supabaseAccessToken = await session.getToken({
          template: 'supabase',
        })
        const supabase = await supabaseClient(supabaseAccessToken)
        const { data: products } = await supabase.from('Products').select('*')
        setProducts(products)
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
    <>
      <Container>
        <h1 className="mx-auto mt-8 max-w-3xl text-xl font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
          Products
        </h1>
      </Container>
      <Container>
        <div className="space-y-16 py-16 xl:space-y-20">
          <div>
            <div className="mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                Recent products
              </h2>
              <a
                href="/products/new"
                className="ml-auto flex items-center gap-x-1 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                Add product
              </a>
            </div>

            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              {products.map((product, index) => (
                <ul>
                  <li key={index}>
                    <Link href={`/products/${product.url_slug}`}>
                      {product.title}
                    </Link>
                  </li>
                  <li key={index}>
                    <p>{product.description}</p>
                  </li>
                  <li key={index}> {product.sku}</li>
                  <li key={index}> Vendor: {product.vendor}</li>
                  <li key={index}>Price: ${product.price}</li>
                  <li key={index}> Cost Price: ${product.cost_price}</li>

                  <li key={index}>
                    <Link
                      className="text-sm font-medium leading-6 text-rose-600 hover:text-rose-800"
                      href={`/products/${product.url_slug}`}
                    >
                      View
                      <span className="hidden sm:inline"> product</span>
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default GetProducts
