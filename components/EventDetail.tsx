import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function EventDetail({ eventId }: { eventId: string }) {
  const { data, error } = useSWR(`/api/events/${eventId}`, fetcher);

  if (error) return <div>Failed to load event</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold">{data.question}</h2>
      <p>{data.description}</p>
      <ul>
        {data.outcomes.map((outcome: any) => (
          <li key={outcome.name}>
            {outcome.name}: {Math.round(outcome.probability * 100)}%
          </li>
        ))}
      </ul>
    </div>
  );
}