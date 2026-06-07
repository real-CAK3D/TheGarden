import { DashboardOverlay } from '@/components/DashboardOverlay';
import { GardenWorld } from '@/components/GardenWorld';

export default function Home() {
  return (
    <main>
      <GardenWorld />
      <DashboardOverlay />
    </main>
  );
}
