"use client"

import { Button } from "@/components/ui/button"
import { Trophy, ArrowRight, Crown } from "lucide-react"
import { Equalizer } from "./equalizer"
import type { Player } from "@/lib/game-types"

interface RoundResultsProps {
  players: Player[]
  roundScores: Map<string, number>
  roundNumber: number
  totalRounds: number
  onNext: () => void
  isLastRound: boolean
}

export function RoundResults({
  players,
  roundScores,
  roundNumber,
  totalRounds,
  onNext,
  isLastRound,
}: RoundResultsProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    const scoreA = roundScores.get(a.id) || 0
    const scoreB = roundScores.get(b.id) || 0
    return scoreB - scoreA
  })

  const winner = sortedPlayers[0]
  const winnerScore = roundScores.get(winner?.id || "") || 0

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Round indicator */}
      <div className="text-sm text-muted-foreground mb-8 uppercase tracking-wider font-bold">
        Round {roundNumber} Complete
      </div>

      {/* Winner */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{winner?.avatar}</div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-spotify-green" />
          <h2 className="text-2xl font-bold">{winner?.name}</h2>
        </div>
        <p className="text-spotify-green text-xl font-bold">+{winnerScore} pts</p>
      </div>

      {/* All scores */}
      <div className="w-full max-w-sm space-y-2 mb-8">
        {sortedPlayers.map((player, index) => {
          const score = roundScores.get(player.id) || 0
          return (
            <div
              key={player.id}
              className={`flex items-center gap-3 p-4 rounded-xl ${
                index === 0 ? "bg-spotify-green/20 border border-spotify-green" : "bg-[#282828]"
              }`}
            >
              <span className={`w-6 font-bold ${index === 0 ? "text-spotify-green" : "text-muted-foreground"}`}>
                {index + 1}
              </span>
              <span className="text-2xl">{player.avatar}</span>
              <span className="flex-1 font-bold">{player.name}</span>
              <span className={`font-bold ${index === 0 ? "text-spotify-green" : "text-white"}`}>+{score}</span>
            </div>
          )
        })}
      </div>

      {/* Equalizer */}
      <Equalizer className="mb-8 opacity-40" barCount={5} />

      {/* Next button */}
      <Button
        size="lg"
        className="h-14 px-10 text-lg font-bold rounded-full bg-spotify-green text-black hover:bg-spotify-green-light spotify-btn"
        onClick={onNext}
      >
        {isLastRound ? (
          <>
            <Trophy className="w-5 h-5 mr-2" />
            See Final Results
          </>
        ) : (
          <>
            Next Round
            <ArrowRight className="w-5 h-5 ml-2" />
          </>
        )}
      </Button>
    </div>
  )
}
