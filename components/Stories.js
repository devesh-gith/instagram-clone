import React, { useState } from "react";
import { useEffect } from "react";
import faker from "@faker-js/faker";
import Story from "../components/Story";
function Stories() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestion = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestion);
  }, []);
  return (
    <div className="flex space-x-2 overflow-x-scroll rounded-sm border  border-gray-200 bg-white p-6 scrollbar-thin scrollbar-thumb-black">
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          username={profile.username}
          img={profile.avatar}
        />
      ))}
    </div>
  );
}

export default Stories;
