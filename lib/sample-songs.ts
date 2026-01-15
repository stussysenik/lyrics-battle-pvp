import type { Song } from "./game-types"

export const sampleSongs: Song[] = [
  {
    id: "1",
    title: "Sample Track",
    artist: "Demo Artist",
    lyrics: [
      { text: "Tripping off the beat kinda", startTime: 0, endTime: 3 },
      { text: "dripping off the meat grinder", startTime: 3, endTime: 6 },
      { text: "Heat niner, pimping, stripping", startTime: 6, endTime: 9 },
      { text: "soft sweet minor", startTime: 9, endTime: 12 },
    ],
  },
  {
    id: "2",
    title: "Flow State",
    artist: "Lyric Master",
    lyrics: [
      { text: "Started from the bottom now we here", startTime: 0, endTime: 3 },
      { text: "Started from the bottom now the whole team here", startTime: 3, endTime: 6 },
      { text: "Running through the city with my woes", startTime: 6, endTime: 9 },
      { text: "Counting up the days till I'm home", startTime: 9, endTime: 12 },
    ],
  },
  {
    id: "3",
    title: "Midnight Rhymes",
    artist: "Beat Poet",
    lyrics: [
      { text: "Look, if you had one shot", startTime: 0, endTime: 2 },
      { text: "Or one opportunity", startTime: 2, endTime: 4 },
      { text: "To seize everything you ever wanted", startTime: 4, endTime: 7 },
      { text: "Would you capture it or just let it slip", startTime: 7, endTime: 10 },
    ],
  },
]

export function getRandomSong(): Song {
  return sampleSongs[Math.floor(Math.random() * sampleSongs.length)]
}
