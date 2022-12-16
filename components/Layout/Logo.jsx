import Link from 'next/link'
import React from 'react'
export default function Logo()
{
  return (
    <div className="logo">
      <Link href='/' className="logo_link">mrkto</Link>
    </div>
  )
}