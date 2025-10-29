import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function EventList() {
  const { data, error } = useSWR('/api/events', fetcher);

  if (error) return <div>Failed to load events</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.markets.map((event: any) => (
        <li key={event.id} className="mb-2">
          <Link href={`/event/${event.id}`}>
            <a className="text-blue-600 hover:underline">{event.question}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}