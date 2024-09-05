"use client"

import { useState, useEffect } from "react"
import Dropdown from "../components/Dropdown"
import axios from 'axios'
import { useRouter } from "next/navigation"

const BASE_URL = 'http://localhost:3001'

const SUBMIT_JOKES_URL = 'http://localhost:3005'

const DELIVER_JOKES_URL = 'http://localhost:3010'


export default function page() {
  const [joke, setJoke] = useState("")
  const [jokeType, setJokeType] = useState("")
  const [allJokeTypes, setAllJokesTypes] = useState([])
  const [retrievedJoke, setRetrievedJoke] = useState("")
  const [activeTab, setActiveTab] = useState('submit');
  const router = useRouter()
  // const { toast } = useToast()

  const fetchJokesTypes = async () => {
    await axios.get(`${SUBMIT_JOKES_URL}/jokes`)
      .then(res => {
        console.log(res.data)
        setAllJokesTypes(res.data)
      })
  }

  useEffect(() => {
    fetchJokesTypes()
  }, [])

  const retrieveRandomJoke = async () => {
    try {
      await axios.post(`${DELIVER_JOKES_URL}/jokes/random`, { type: jokeType.joke_type_id })
        .then(res => {
          setRetrievedJoke(res.data.content)
        })
    } catch (e) {
      console.log(e)
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (joke && jokeType) {
      console.log("Submitted:", { joke, jokeType })
      await axios.post(`${SUBMIT_JOKES_URL}/jokes`, { content: joke, type: jokeType.joke_type_text })
      setJoke("")
      setJokeType("")
    } else {
      console.log("Please fill in both the joke and its type.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 pb-4">
      <button onClick={() => router.push('/login')} className="px-3 m-4 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-2xl py-1">
        Login
      </button>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center max-w-96">
          <div className="flex border-b-2 border-gray-800 mb-4">
            <div
              className={`cursor-pointer py-2 px-4 text-lg ${activeTab === 'submit' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                } transition duration-300 ease-in-out`}
              onClick={() => setActiveTab('submit')}
            >
              Submit a Joke
            </div>
            <div
              className={`cursor-pointer py-2 px-4 text-lg ${activeTab === 'retrieve' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                } transition duration-300 ease-in-out`}
              onClick={() => setActiveTab('retrieve')}
            >
              Retrieve a Joke
            </div>
          </div>

          <div className="w-full max-w-md">
            {activeTab === 'submit' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <header>
                  <title className="text-2xl font-bold text-center">Submit a Joke</title>
                </header>
                <h1 className="text-2xl font-bold text-center pt-4">
                  Submit a Joke
                </h1>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2 flex flex-col px-4 pt-2">
                      <label htmlFor="joke" className="text-sm font-medium text-gray-200">
                        Your Joke
                      </label>
                      <textarea
                        id="joke"
                        placeholder="Type your joke here..."
                        value={joke}
                        onChange={(e) => setJoke(e.target.value)}
                        className="min-h-[100px] bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500 focus:border-blue-500 rounded-2xl p-2"
                      />
                    </div>
                    <div className="space-y-2 flex flex-col px-4 pt-2">
                      <label htmlFor="jokeType" className="text-sm font-medium text-gray-200">
                        Joke Type
                      </label>
                      <div value={jokeType} onValueChange={setJokeType}>
                        <Dropdown options={allJokeTypes} setSelectedJokeType={setJokeType}>
                          Select a Joke Type
                        </Dropdown>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-2xl py-1">
                      Submit Joke
                    </button>
                  </div>
                </form>
              </div>
            )}
            {activeTab === 'retrieve' && (
              <div className="bg-gray-800 rounded-lg p-6">
                <header>
                  <title className="text-2xl font-bold text-center">Retrieve a Joke</title>
                </header>
                <div>
                  <h1 className="text-2xl font-bold text-center pt-4">
                    Retrieve a Joke
                  </h1>
                  <div className="p-4">
                    <Dropdown options={allJokeTypes} setSelectedJokeType={setJokeType}>
                      Select a Joke Type
                    </Dropdown>
                  </div>
                  <div className="p-4">
                    <button onClick={retrieveRandomJoke} className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-2xl py-1">
                      Retrieve Joke
                    </button>
                  </div>
                  <div>
                    <span>{retrievedJoke}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}