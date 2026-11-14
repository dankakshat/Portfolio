import { create } from 'zustand'

export type Location = 'home' | 'identity' | 'archives' | 'skills' | 'chronicles' | 'laboratory' | 'contact'
export type Quality = 'cinematic' | 'balanced' | 'lite'

type NexusStore = {
  location: Location
  quality: Quality
  portal: Location | null
  setLocation: (location: Location) => void
  setPortal: (portal: Location | null) => void
  cycleQuality: () => void
}

export const useNexusStore = create<NexusStore>((set) => ({
  location: 'home', quality: 'balanced', portal: null,
  setLocation: (location) => set({ location, portal: null }),
  setPortal: (portal) => set({ portal }),
  cycleQuality: () => set((s) => ({ quality: s.quality === 'cinematic' ? 'balanced' : s.quality === 'balanced' ? 'lite' : 'cinematic' })),
}))
