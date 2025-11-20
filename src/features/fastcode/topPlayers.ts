export interface TopPlayer {
  name: string
  wpm: number
  accuracy: number
  streak: string
}

export const TOP_PLAYERS: TopPlayer[] = [
  { name: 'Moorfo', wpm: 132, accuracy: 98, streak: '12 days' },
  { name: 'Alex D.', wpm: 118, accuracy: 96, streak: '8 days' },
  { name: 'Priya S.', wpm: 112, accuracy: 95, streak: '5 days' },
  { name: 'Marina G.', wpm: 108, accuracy: 94, streak: '4 days' },
  { name: 'Kenji T.', wpm: 104, accuracy: 93, streak: '3 days' },
  { name: 'Amelia R.', wpm: 101, accuracy: 92, streak: '2 days' },
]

