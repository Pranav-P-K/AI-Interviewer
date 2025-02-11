import React from 'react'
import Navbar from './_components/Navbar'

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div>
      <Navbar />
      <div className='mx- md:mx-20 lg:mx-36'>
        {children}
      </div>
    </div>
  )
}