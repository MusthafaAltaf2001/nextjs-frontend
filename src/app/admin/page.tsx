'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from '@/components/Dropdown'
import { headers } from 'next/headers'

const BASE_URL = 'http://localhost:3003'

const DELIVER_JOKES_URL = 'http://localhost:3010'

const SUBMIT_JOKES_URL = 'http://localhost:3005'


const page = () => {
    const [jokes, setJokes] = useState([])
    const [jokeTypes, setJokeType] = useState([])
    const [newJokeType, setNewJokeType] = useState('')
    const [jokesChanges, setJokesChanges] = useState([])
    const token = localStorage.getItem('token')


    const fetchJokes = async () => {
        await axios.get(`${BASE_URL}/jokes`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                setJokes(res.data)
            })
    }

    useEffect(() => {
        fetchJokes()
    }, [])

    const fetchJokesTypes = async () => {
        await axios.get(`${SUBMIT_JOKES_URL}/jokes`)
            .then(res => {
                console.log(res.data)
                setJokeType(res.data)
            })
    }

    useEffect(() => {
        fetchJokesTypes()
    }, [])


    const approveJoke = async (id: string) => {
        // Find id of joke in jokeChanges
        const index = jokes.findIndex((joke) => joke._id === id)

        await axios.post(`${BASE_URL}/approveJoke`, {
            id: id,
            content: jokes[index].content,
            type: jokes[index].type,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                fetchJokes()
            })
    }

    const rejectJoke = async (id: string) => {
        // Find id of joke in jokeChanges
        const index = jokes.findIndex((joke) => joke._id === id)

        await axios.post(`${BASE_URL}/rejectJoke`, {
            id: id,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                fetchJokes()
            })
    }

    const addNewJokeType = async () => {
        try {
            await axios.post(`${DELIVER_JOKES_URL}/jokes/newJokeType`, { type: newJokeType })
                .then(() => {
                    fetchJokesTypes()
                })
        } catch (e) {
            console.log(e)
        }
    }

    const handleJokesChange = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        // Find the index of the joke to update
        const index = jokesChanges.findIndex((joke) => joke.id === id)

        if (index === -1) {
            const changes = {
                id: id,
                [name]: value
            }
            setJokesChanges([...jokesChanges, changes])
        } else {
            const changes = {
                ...jokesChanges[index],
                _id: id,
                [name]: value
            }
            const updatedJokesChange = [...jokesChanges]
            updatedJokesChange[index] = changes
            setJokesChanges(updatedJokesChange)
        }

        const jokesIndex = jokes.findIndex((joke) => joke._id === id)
        const changes = {
            ...jokes[jokesIndex],
            _id: id,
            [name]: value
        }
        const updatedJokes = [...jokes]
        updatedJokes[jokesIndex] = changes
        setJokes(updatedJokes)
    }


    return (
        <div className="bg-gray-900 px-4 min-h-screen">
            <header>
                <title>Admin</title>
            </header>
            <h1 className="text-2xl font-bold mb-5">Admin</h1>
            <div className="border rounded-lg overflow-hidden w-full">
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className="w-[50%]">Joke</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th className="text-right px-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jokes.map((joke) => (
                            <tr key={joke.id} className="hover:bg-gray-600 transition duration-300">
                                <td className="font-medium p-2">
                                    {joke.status === 'PENDING' ?
                                        <textarea
                                            value={joke.content}
                                            name='content'
                                            onChange={(e) => handleJokesChange(joke._id, e)}
                                            className="bg-gray-800 min-h-24 w-full border-gray-700 text-white rounded-lg p-2"
                                        />
                                        :
                                        <span>{joke.content}</span>
                                    }

                                </td>
                                <td className='px-2'>
                                    {joke.status === 'PENDING' ?
                                        <select name='type' onChange={(e) => handleJokesChange(joke._id, e)} className="bg-gray-800 border-gray-700 text-white rounded-lg p-2">

                                            <option className='rounded-lg p-2' value={joke.type} selected>{joke.type}</option>
                                            {jokeTypes.map((type) => {
                                                return (
                                                    <option value={type.joke_type_text} key={type.joke_type_id} className='rounded-lg p-2'>
                                                        {type.joke_type_text}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                        :
                                        <span>{joke.type}</span>
                                    }

                                </td>
                                <td className='px-2'>
                                    <div
                                        variant={joke.status === 'APPROVED' ? 'success' : joke.status === 'REJECTED' ? 'destructive' : 'secondary'}
                                    >
                                        {joke.status}
                                    </div>
                                </td>
                                <td className="text-right px-2 flex flex-col gap-2 my-2 justify-center">
                                    <button
                                        size="sm"
                                        variant="outline"
                                        className="w-full bg-green-800 hover:bg-green-700 rounded-2xl p-1 transition duration-300"
                                        onClick={() => { approveJoke(joke._id) }}
                                        disabled={joke.status !== 'PENDING'}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        size="sm"
                                        variant="outline"
                                        className='bg-red-800 w-full hover:bg-red-700 rounded-2xl p-1 transition duration-300'
                                        onClick={() => { rejectJoke(joke._id) }}
                                        disabled={joke.status !== 'PENDING'}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='mt-4 flex flex-row gap-2'>
                <span>Add new Joke Type</span>
                <input
                    value={newJokeType}
                    onChange={(e) => setNewJokeType(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white rounded-lg p-2"
                />
                <button onClick={addNewJokeType} className="w-24 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-2xl py-1">
                    Add
                </button>
            </div>
        </div>
    )
}

export default page