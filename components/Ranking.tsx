import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Ranking() {
  const { data, error } = useSWR('/api/ranking', fetcher);

  if (error) return <div>Failed to load ranking</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ol>
      {data.users.map((user: any, index: number) => (
        <li key={user.id}>
          {index + 1}. {user.name} - {user.points} pts
        </li>
      ))}
    </ol>
  );
}