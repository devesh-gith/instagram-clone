import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";
import MiniProfile from "./MiniProfile";
import Suggestion from "./Suggestion";
import { useSession } from "next-auth/react";
function Feed() {
  const { data: session } = useSession();
  return (
    <main
      className={`mx-auto py-10 grid grid-cols-1 md:max-w-3xl md:grid-cols-2 xl:max-w-6xl xl:grid-cols-3 ${
        !session && "!grid-cols-1 !max-w-3xl"
      } `}
    >
      <section className="col-span-2 overflow-y-auto h-screen scrollbar-hide">
        {/* Stories */}
        <div>
          <Stories />
        </div>
        {/* Posts */}
        <Posts />
      </section>
      {session && (
        <section className=" col-span-1 hidden lg:inline-grid ">
          <div className="fixed top-20">
            {/* mini profile */}
            <MiniProfile />
            {/* suggestions */}
            <Suggestion />
          </div>
        </section>
      )}
    </main>
  );
}

export default Feed;
