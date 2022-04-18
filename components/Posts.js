import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { db } from "../firebase";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  console.log(posts);
  return (
    <div className="my-8 space-y-6">
      {posts.map((post) => (
        <Post
          id={post.id}
          key={post.id}
          username={post.data().username}
          userImg={post.data().image}
          img={post.data().profileImg}
          caption={post.data().caption}
        />
      ))}
    </div>
  );
}

export default Posts;
