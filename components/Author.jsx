import React from 'react'

import Image from 'next/image'

const Author = ({ author }) => {
  return (
    <div className='relative text-center mt-20 mb-8 p-8 rounded-lg bg-blue-500 pb-12'>
      <div className='absolute left-0 right-0 -top-14'>
        <Image
          unoptimized='true'
          alt={author.name}
          src={author.photo.url}
          height='100px'
          width='100px'
          className='align-middle rounded-full'
        />
      </div>
      <h3 className='text-white my-8 text-xl font-bold'>{author.name}</h3>
      <p className='text-white text-lg'>{author.bio}</p>
    </div>
  )
}

export default Author
