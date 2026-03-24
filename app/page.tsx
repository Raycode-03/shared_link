import React from 'react'
import LandingPage from '@/components/base/landingPage'
import { notFound } from 'next/navigation';
function page() {
  return (
    <>
      {notFound()}
      {/* <LandingPage/> */}
    </>
  )
}

export default page