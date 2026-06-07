'use client';

import { create } from 'zustand';
import type { GardenAgent } from '@/lib/gardenData';
import { agents } from '@/lib/gardenData';

type GardenState = {
  selectedAgent: GardenAgent;
  setSelectedAgent: (agent: GardenAgent) => void;
};

export const useGardenStore = create<GardenState>((set) => ({
  selectedAgent: agents[0],
  setSelectedAgent: (selectedAgent) => set({ selectedAgent }),
}));
