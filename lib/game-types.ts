export interface Player {
  id: string
  name: string
  avatar: string
  score: number
  isHost: boolean
  isReady: boolean
}

export interface GameConfig {
  rounds: number
  timePerRound: number
  difficulty: "easy" | "medium" | "hard"
  genre: string
}

export interface GameState {
  screen: "home" | "join" | "lobby" | "game" | "results" | "leaderboard"
  players: Player[]
  config: GameConfig
  currentRound: number
}

export interface LyricLine {
  text: string
  startTime: number
  endTime: number
}

export interface Song {
  id: string
  title: string
  artist: string
  lyrics: LyricLine[]
  audioUrl?: string
}
