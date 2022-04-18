import { signOut, useSession } from "next-auth/react";
import React from "react";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center space-x-2 p-6">
      <img className="h-14 w-14 rounded-full" src={session.user.image} alt="" />

      <div className="flex-1">
        <p className="font-bold">{session.user.name}</p>
        <p className="text-sm text-gray-500">Welcome to Instagram</p>
      </div>
      <button
        onClick={signOut}
        className=" text-sm font-semibold text-blue-500"
      >
        Sign out
      </button>
    </div>
  );
}

export default MiniProfile;
