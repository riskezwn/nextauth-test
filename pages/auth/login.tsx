import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

export default function LoginPage() {
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  console.log(providers);
  

  return (
    <>
      <h1>Login</h1>
      dfdffdff
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <button
            onClick={() => {
              signIn('google')
            }}
          >
            Sign In with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};