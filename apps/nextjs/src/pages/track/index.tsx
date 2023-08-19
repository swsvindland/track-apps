import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/layout";
import { Login } from "../../components/login";
import { useAuth } from "@clerk/nextjs";

const Index: NextPage = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Login />;
  }

  return (
    <>
      <Head>
        <title>Food</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main className="flex h-screen flex-col items-center">
          <div className="container grid grid-cols-1 gap-4">
            <h1>Home</h1>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Index;
