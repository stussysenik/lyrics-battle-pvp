"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Trophy, Medal } from "lucide-react"
import { SpotifyLogo } from "./spotify-logo"
import type { Player } from "@/lib/game-types"

interface LeaderboardScreenProps {
  players: Player[]
  onBack: () => void
  onHome: () => void
}

// Mock all-time leaderboard
const allTimeLeaders = [
  { name: "LyricKing", score: 12450, avatar: "👑" },
  { name: "FlowMaster", score: 11200, avatar: "🎤" },
  { name: "BeatDropper", score: 10800, avatar: "🎵" },
  { name: "RhymeTime", score: 9600, avatar: "⚡" },
  { name: "VerseVirtuoso", score: 8900, avatar: "🔥" },
]

export function LeaderboardScreen({ players, onBack, onHome }: LeaderboardScreenProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button onClick={onHome} className="p-2 rounded-full hover:bg-[#282828] transition-colors">
          <Home className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-lg mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <Trophy className="w-10 h-10 text-spotify-green mx-auto mb-2" />
          <h1 className="text-3xl font-bold">Leaderboard</h1>
        </div>

        {/* This Game */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">This Game</h2>
          <div className="space-y-2">
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center gap-3 p-4 rounded-xl ${
                  index === 0 ? "bg-spotify-green/20 border border-spotify-green" : "bg-[#282828]"
                }`}
              >
                <span
                  className={`w-8 text-lg font-bold ${index === 0 ? "text-spotify-green" : "text-muted-foreground"}`}
                >
                  {index + 1}
                </span>
                {index === 0 && <Medal className="w-5 h-5 text-spotify-green" />}
                <span className="text-2xl">{player.avatar}</span>
                <span className="flex-1 font-bold">{player.name}</span>
                <span className="font-bold text-lg">{player.score}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All Time */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">All Time Best</h2>
          <div className="space-y-2">
            {allTimeLeaders.map((leader, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-[#282828]">
                <span className={`w-8 text-sm font-bold ${index < 3 ? "text-spotify-green" : "text-muted-foreground"}`}>
                  {index + 1}
                </span>
                <span className="text-xl">{leader.avatar}</span>
                <span className="flex-1 text-sm font-semibold">{leader.name}</span>
                <span className="font-bold text-sm text-muted-foreground">{leader.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Home Button */}
        <Button
          size="lg"
          className="w-full h-14 rounded-full font-bold bg-spotify-green text-black hover:bg-spotify-green-light spotify-btn"
          onClick={onHome}
        >
          <Home className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
      </div>

      {/* Footer */}
      <div className="fixed bottom-6 left-6 flex items-center gap-2">
        <SpotifyLogo className="w-4 h-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Lyrics Battle</p>
      </div>
    </div>
  )
}
