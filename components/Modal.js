import { Dialog, Transition } from "@headlessui/react";
import React, { useRef, useState } from "react";
import { Fragment } from "react/cjs/react.development";
import { CameraIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { db, storage } from "../firebase";
import { modalState } from "../atom/modalAtom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
function Modal() {
  const { data: session } = useSession();
  console.log(session);
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [loading, setloading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const addFileToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  const uploadPost = async () => {
    if (loading) return;

    setloading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imgRef = ref(storage, `posts/${docRef.id}/image`);
    console.log("the reference id is :", imgRef);

    await uploadString(imgRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imgRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );
    setOpen(false);
    setloading(false);
    setSelectedFile(null);
  };

  // setOpen(false);
  // setloading(false);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 overflow-y-auto inset-0"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overfow-hidden shadow-xl transform transtion-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    alt=""
                  />
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        type="file"
                        hidden
                        ref={filePickerRef}
                        onChange={addFileToPost}
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        ref={captionRef}
                        type="text"
                        className="border-none focus:ring-0 w-full text-center"
                        placeholder="Please enter a caption..."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  disabled={!selectedFile}
                  onClick={uploadPost}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border-transparent shadow-sm px-4 py-2 bg-red-6-- text-base font-medium text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled-bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                >
                  {loading ? "Uploading..." : "Upload Post"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
