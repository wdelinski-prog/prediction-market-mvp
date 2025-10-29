import Head from 'next/head';
import EventList from '../components/EventList';

export default function Home() {
  return (
    <>
      <Head>
        <title>teste 3.0 - Prediction Market</title>
      </Head>
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Prediction Markets</h1>
        <EventList />
      </main>
    </>
  );
}