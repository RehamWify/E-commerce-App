import Image from 'next/image'
import React from 'react'
import errorImage from './../assets/screens/404.jpg'

const ErrorPage = () => {
  return (
    <div className='w-full md:w-[80%] mx-auto my-5 px-5 md:px-0'>
        <Image src={errorImage} alt='error image'/>
    </div>
  )
}

export default ErrorPage