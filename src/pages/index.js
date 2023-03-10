import Head from "next/head";
import Link from "next/link";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { withSSRContext } from "aws-amplify";
import { listParks } from "@/graphql/queries";
import { ParkItem } from "@/components/ParkItem";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const SSR = withSSRContext();
  const { data } = await SSR.API.graphql({
    query: listParks,
  });
  return {
    props: {
      parks: data.listParks.items,
    },
  };
}

export default function Home({ parks }) {
  return (
    <>
      <Head>
        <title>AWS Amplify Intro</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <h1>National Parks</h1>
            <button className={styles.btn}>
              <Link href="/create-park">Add Park</Link>
            </button>
          </div>
          <div className="parks">
            {parks.map((park) => {
              return <ParkItem park={park} key={park.id} />;
            })}
          </div>
        </div>
      </main>
    </>
  );
}
