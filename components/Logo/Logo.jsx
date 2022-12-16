import React from 'react'
import Link from 'next/link'

export default function Logo()
{
    return (
        <Link href="/" className='logo__litter' style={{ color: "#fff" }}>
            Moz
        </Link>
    )
}