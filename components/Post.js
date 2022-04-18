import React, { useEffect, useState } from "react";
import {
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

import { useSession } from "next-auth/react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import Moment from "react-moment";

function Post({ id, username, img, userImg, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "comment")), (snapshot) =>
        setComments(snapshot.docs)
      ),
    [db, id]
  );
  useEffect(
    () =>
      onSnapshot(query(collection(db, "posts", id, "likes")), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );
  const likePosts = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
        id: session.user.uid,
      });
    }
  };
  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comment"), {
      comment: commentToSend,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
  };
  console.log(likes);
  console.log(hasLiked);
  return (
    <div className=" rounded-sm border bg-white ">
      <div className="my-4 mx-4 flex items-center space-x-2 ">
        <img
          className="w-12 rounded-full border-2 border-red-500 p-[1.5px] "
          src={img}
          alt=""
        />
        <p className="flex-1 font-bold ">{username}</p>
        <DotsHorizontalIcon className="h-5 w-5" />
      </div>

      <img className="w-full" src={userImg} alt="" />
      <div className="flex justify-between items-center p-2 font-bold">
        <div>{likes.length > 0 && <p>{likes.length} likes</p>}</div>
        <div>{comments.length > 0 && <p>{comments.length} comments</p>}</div>
      </div>

      <div className="flex justify-between p-3">
        <div className="flex space-x-3">
          {hasLiked ? (
            <HeartIconFilled onClick={likePosts} className="btn text-red-500" />
          ) : (
            <HeartIcon onClick={likePosts} className="btn" />
          )}

          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      <div className="flex p-2 ">
        <p className="font-bold">{username}</p>
        <p className="mx-2">{caption}</p>
      </div>

      {/* comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3 ">
              <img
                src={comment.data().userImg}
                alt=""
                className="h-7 rounded-full"
              />
              <p className="text-sm flex-1 space-x-1">
                <span className="font-bold">{comment.data().username}</span>
                <span className="text-gray-600 text-sm">
                  {comment.data().comment}
                </span>
              </p>
              {/* <Moment fromNow className="text-sm pr-5">
                {comment.date().timestamp.toDate()}
              </Moment> */}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center p-3 ">
        <EmojiHappyIcon className="h-8 w-8" />
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 border-none outline-none focus:ring-0"
          type="text"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          onClick={sendComment}
          disabled={!comment.trim()}
          className="text-sm text-blue-500"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Post;
