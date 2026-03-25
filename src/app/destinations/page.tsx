import type { Metadata } from 'next';
import DestinationsClient from './DestinationsClient';

export const metadata: Metadata = {
  title: 'Destinations',
  description: "Explore our handpicked travel destinations from tropical beaches to ancient cities. Find your perfect destination with Hamdi's Travel Agency.",
};

export default function DestinationsPage() {
  return <DestinationsClient />;
}
