'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const BASE_URL = 'http://localhost:3003'

const page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${BASE_URL}/login`, { email: email, password: password })
                .then(res => {
                    console.log(res.data.token)
                    if (res.data.token) {
                        router.push('/admin')
                        // Not a good practice to store token in local storage.
                        // Implemented it this way due to time constraints
                        localStorage.setItem('token', res.data.token)
                    } else {
                        console.log('Ivalid Credentials')
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 rounded-2xl p-4">
                <div>
                    <div className="text-2xl font-bold">Login</div>
                    <div>Enter your credentials to access your account</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 ">
                        <div className="space-y-2 flex gap-10 items-center">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='rounded-lg px-2 py-1 text-black'
                            />
                        </div>
                        <div className="space-y-2 flex gap-2 items-center">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='rounded-lg px-2 py-1 text-black'
                            />
                        </div>
                    </div>
                    <div className="p-4">
                        <button onClick={() => handleSubmit} className="w-48 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-2xl py-1">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default page