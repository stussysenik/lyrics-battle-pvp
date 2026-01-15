"use client"

import { Button } from "@/components/ui/button"
import { Trophy, RotateCcw, BarChart3, Share2, Crown } from "lucide-react"
import { useEffect, useState } from "react"
import Confetti from "react-confetti"
import { SpotifyLogo } from "./spotify-logo"
import type { Player } from "@/lib/game-types"

interface ResultsScreenProps {
  players: Player[]
  onPlayAgain: () => void
  onLeaderboard: () => void
}

export function ResultsScreen({ players, onPlayAgain, onLeaderboard }: ResultsScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const winner = sortedPlayers[0]

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {showConfetti && (
        <Confetti recycle={false} numberOfPieces={200} colors={["#1db954", "#1ed760", "#ffffff", "#b3b3b3"]} />
      )}

      {/* Trophy */}
      <div className="mb-8">
        <div className="w-24 h-24 rounded-full bg-spotify-green/20 flex items-center justify-center animate-bounce">
          <Trophy className="w-12 h-12 text-spotify-green" />
        </div>
      </div>

      {/* Winner announcement */}
      <div className="text-center mb-8">
        <p className="text-muted-foreground mb-2 font-semibold uppercase tracking-wider text-sm">Champion</p>
        <div className="flex items-center justify-center gap-3 mb-2">
          <Crown className="w-8 h-8 text-spotify-green" />
          <span className="text-5xl">{winner?.avatar}</span>
          <Crown className="w-8 h-8 text-spotify-green" />
        </div>
        <h1 className="text-4xl font-bold mb-2">{winner?.name}</h1>
        <p className="text-2xl text-spotify-green font-bold">{winner?.score} points</p>
      </div>

      {/* Podium */}
      <div className="flex items-end justify-center gap-2 mb-12 h-48">
        {/* 2nd place */}
        {sortedPlayers[1] && (
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">{sortedPlayers[1].avatar}</span>
            <div className="w-20 h-24 bg-[#282828] rounded-t-lg flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">2</span>
              <span className="text-xs text-muted-foreground truncate w-16 text-center">{sortedPlayers[1].name}</span>
              <span className="text-sm font-bold">{sortedPlayers[1].score}</span>
            </div>
          </div>
        )}

        {/* 1st place */}
        <div className="flex flex-col items-center">
          <span className="text-4xl mb-2">{winner?.avatar}</span>
          <div className="w-24 h-36 bg-spotify-green rounded-t-lg flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-black">1</span>
            <span className="text-xs text-black/70 truncate w-20 text-center font-semibold">{winner?.name}</span>
            <span className="text-sm font-bold text-black">{winner?.score}</span>
          </div>
        </div>

        {/* 3rd place */}
        {sortedPlayers[2] && (
          <div className="flex flex-col items-center">
            <span className="text-3xl mb-2">{sortedPlayers[2].avatar}</span>
            <div className="w-20 h-16 bg-[#282828] rounded-t-lg flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">3</span>
              <span className="text-xs text-muted-foreground truncate w-16 text-center">{sortedPlayers[2].name}</span>
              <span className="text-sm font-bold">{sortedPlayers[2].score}</span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Button
          size="lg"
          className="flex-1 h-14 rounded-full font-bold bg-spotify-green text-black hover:bg-spotify-green-light spotify-btn"
          onClick={onPlayAgain}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex-1 h-14 rounded-full font-bold border-muted-foreground/30 hover:border-white bg-transparent"
          onClick={onLeaderboard}
        >
          <BarChart3 className="w-5 h-5 mr-2" />
          Leaderboard
        </Button>
      </div>

      {/* Share */}
      <button className="mt-6 flex items-center gap-2 text-muted-foreground hover:text-white transition-colors font-semibold">
        <Share2 className="w-4 h-4" />
        Share Results
      </button>

      {/* Footer */}
      <div className="fixed bottom-6 left-6 flex items-center gap-2">
        <SpotifyLogo className="w-4 h-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Lyrics Battle</p>
      </div>
    </div>
  )
}
