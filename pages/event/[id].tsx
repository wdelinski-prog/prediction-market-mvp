import { useRouter } from 'next/router';
import EventDetail from '../../components/EventDetail';

export default function EventPage() {
  const router = useRouter();
  const { id } = router.query;

  return <EventDetail eventId={id as string} />;
}