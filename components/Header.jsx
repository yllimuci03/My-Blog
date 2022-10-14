import React from 'react'
import Link from 'next/link'

const Header = ({ categories }) => {
  return (
    <div className='container mx-auto px-8 mb-8'>
      <div className='border-b w-full inline-block border-blue-400 py-8'>
        <div className='md:float-left block'>
          <Link href='/'>
            <div>
              <span className='cursor-pointer font-bold text-4xl text-black-300'>
                Y
              </span>
              <span className='cursor-pointer font-bold text-4xl text-red-600'>
                M
              </span>
              <span className='cursor-pointer font-bold text-4xl text-black'>
                BLOG
              </span>
            </div>
          </Link>
        </div>
        <div className='hidden md:float-left md:contents'>
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`}>
              <span className='md:float-right mt-2 align-middle text-teal-700 ml-4 text-xl font-semibold hover:text-pink-600 cursor-pointer'>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
