import { useEffect } from 'react'
import { useState } from 'react'
import { useSession } from '@clerk/nextjs'
import supabaseClient from '@/utils/supabaseClient'
import { PlusSmallIcon } from '@heroicons/react/20/solid'
import { columns } from '@/pages/products/columns'
import { DataTable } from '@/pages/products/data-table'

import Link from 'next/link'
import Container from '@/components/Container'

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
        const { data: products } = await supabase.from('Products').select('*', {
          columns: ['*', 'product_url_slug'],
        })
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
        <div className="space-y-16 py-16 xl:space-y-20">
          <div>
            <div className="mx-auto flex max-w-7xl ">
              <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                All products
              </h2>
              <a
                href="/products/new"
                className="ml-auto flex items-center gap-x-1 rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
                Add product
              </a>
            </div>
            <div className="mx-auto py-10">
              <DataTable columns={columns} data={products} />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default GetProducts
