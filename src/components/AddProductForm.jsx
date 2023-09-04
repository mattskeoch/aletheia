import { useState } from 'react'
import supabaseClient from '@/utils/supabaseClient'
import { useSession } from '@clerk/nextjs'

const AddProductForm = () => {
  const { session } = useSession()
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    cost_price: 0,
    sku: '',
    vendor: '',
    quantity: 0,
    category: '',
  })

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const supabaseAccessToken = await session.getToken({
      template: 'supabase',
    })
    const supabase = await supabaseClient(supabaseAccessToken)
    const { data, error } = await supabase.from('Products').insert([product])
    if (error) {
      alert(error.message)
    } else {
      alert('Part added successfully!')
    }
  }

  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Title
                </label>
                <input
                  name="title"
                  onChange={handleChange}
                  placeholder="title"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Part Description
                </label>
                <input
                  name="description"
                  onChange={handleChange}
                  placeholder="Description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Part Price
                </label>
                <input
                  name="price"
                  onChange={handleChange}
                  placeholder="Price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="cost_price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Part Cost Price
                </label>
                <input
                  name="cost_price"
                  onChange={handleChange}
                  placeholder="Cost Price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Part SKU
                </label>
                <input
                  name="sku"
                  onChange={handleChange}
                  placeholder="SKU"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="sku"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vendor
                </label>
                <input
                  name="vendor"
                  onChange={handleChange}
                  placeholder="Vendor"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Quantity
                </label>
                <input
                  name="quantity"
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Category
                </label>
                <input
                  name="category"
                  onChange={handleChange}
                  placeholder="Category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Part
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm
