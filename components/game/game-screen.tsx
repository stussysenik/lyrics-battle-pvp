"use client"

import { useState, useEffect, useCallback } from "react"
import { LyricsTyping } from "./lyrics-typing"
import { RoundIntro } from "./round-intro"
import { RoundResults } from "./round-results"
import { getRandomSong } from "@/lib/sample-songs"
import type { Player, GameConfig, Song } from "@/lib/game-types"

interface GameScreenProps {
  players: Player[]
  config: GameConfig
  currentRound: number
  onRoundComplete: (scores: { playerId: string; points: number }[]) => void
  onGameEnd: () => void
}

type RoundPhase = "intro" | "playing" | "results"

export function GameScreen({ players, config, currentRound, onRoundComplete, onGameEnd }: GameScreenProps) {
  const [phase, setPhase] = useState<RoundPhase>("intro")
  const [song, setSong] = useState<Song>(getRandomSong())
  const [roundScores, setRoundScores] = useState<Map<string, number>>(new Map())

  useEffect(() => {
    setSong(getRandomSong())
    setPhase("intro")
    setRoundScores(new Map())
  }, [currentRound])

  const handleTypingComplete = useCallback(
    (accuracy: number, wpm: number) => {
      const points = Math.round(accuracy * 10 + wpm)
      setRoundScores((prev) => new Map(prev).set("1", points))

      // Simulate other players
      players.slice(1).forEach((player) => {
        const botPoints = Math.round(Math.random() * 50 + 30)
        setRoundScores((prev) => new Map(prev).set(player.id, botPoints))
      })

      setTimeout(() => setPhase("results"), 500)
    },
    [players],
  )

  const handleNextRound = () => {
    const scores = Array.from(roundScores.entries()).map(([playerId, points]) => ({
      playerId,
      points,
    }))
    onRoundComplete(scores)
  }

  if (phase === "intro") {
    return (
      <RoundIntro
        roundNumber={currentRound}
        totalRounds={config.rounds}
        song={song}
        onStart={() => setPhase("playing")}
      />
    )
  }

  if (phase === "results") {
    return (
      <RoundResults
        players={players}
        roundScores={roundScores}
        roundNumber={currentRound}
        totalRounds={config.rounds}
        onNext={handleNextRound}
        isLastRound={currentRound >= config.rounds}
      />
    )
  }

  return (
    <LyricsTyping song={song} timeLimit={config.timePerRound} onComplete={handleTypingComplete} players={players} />
  )
}
