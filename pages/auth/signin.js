import { getProviders, signIn as SignInProvider } from "next-auth/react";
import React from "react";
import Header from "../../components/Header";

function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center ">
        <img
          className="h-28 w-80"
          src="https://links.papareact.com/ocw"
          alt=""
        />
        <p className="italic">
          This is not the real Instagram! just for education purpose
        </p>
        <div className="mt-40">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="bg-blue-500 text-white font-bold p-3 rounded-lg hover:italic   text-lg"
                onClick={() =>
                  SignInProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders(context);
  return {
    props: { providers },
  };
}

export default signIn;
