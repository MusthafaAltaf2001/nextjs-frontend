"use client"

import { useState } from "react"
import Dropdown from "./components/Dropdown"


export default function page() {
  const [joke, setJoke] = useState("")
  const [jokeType, setJokeType] = useState("")
  // const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault()
    // if (joke && jokeType) {
    //   console.log("Submitted:", { joke, jokeType })
    //   toast({
    //     title: "Joke Submitted!",
    //     description: "Your joke has been successfully submitted.",
    //   })
    //   setJoke("")
    //   setJokeType("")
    // } else {
    //   toast({
    //     title: "Error",
    //     description: "Please fill in both the joke and its type.",
    //     variant: "destructive",
    //   })
    // }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 text-gray-100 rounded-2xl">
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
                <Dropdown options={["Pun", "Dad Joke", "Knock-Knock", "One-Liner"]} setSelectedJokeType={setJokeType}>
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
    </div>
  )
}