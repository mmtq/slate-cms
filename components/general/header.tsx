import { BringToFront } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import InUpButton from '../auth/in-up-button'

export default function Header() {
    return (
        <header className="w-full">
            <div className="flex items-center justify-between px-2 md:px-4 py-2 text-chart-3 max-w-7xl mx-auto">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <BringToFront className="w-4 h-4 hidden md:block" />
                    <h1 className="text-xl font-bold">Neuro Press</h1>
                </Link>
            </div>
        </header>
    )
}
