import faker from '@faker-js/faker'
import React, { useEffect, useState } from 'react'

function Suggestion() {
  const [suggestions, setSuggestions] = useState([])
  useEffect(() => {
    const suggestion = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }))

    setSuggestions(suggestion)
    console.log(suggestion)
  }, [])
  return (
    <div className=" ">
      <div className="mx-3 space-y-2">
        <div className=" flex items-center justify-between">
          <p className="text-gray-500">Suggestion for you</p>
          <p className="font-semibold">See all</p>
        </div>

        {suggestions.map((profile) => (
          <div key={profile.id} className="flex items-center  space-x-3">
            <img
              className="h-10 cursor-pointer rounded-full transition duration-100 ease-out hover:scale-105"
              src={profile.avatar}
              alt=""
            />

            <div className="flex-1">
              <p className="text-sm">{profile.username}</p>
              <p className="text-xs text-gray-500">{profile.company.name}</p>
            </div>
            <button className="text-sm font-semibold text-blue-500">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Suggestion
