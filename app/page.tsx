"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/game/home-screen"
import { JoinScreen } from "@/components/game/join-screen"
import { LobbyScreen } from "@/components/game/lobby-screen"
import { GameScreen } from "@/components/game/game-screen"
import { ResultsScreen } from "@/components/game/results-screen"
import { LeaderboardScreen } from "@/components/game/leaderboard-screen"
import { DevConsole } from "@/components/game/dev-console"
import type { GameState, Player, GameConfig } from "@/lib/game-types"

const initialPlayers: Player[] = [{ id: "1", name: "You", avatar: "🎤", score: 0, isHost: true, isReady: true }]

const defaultConfig: GameConfig = {
  rounds: 3,
  timePerRound: 30,
  difficulty: "medium",
  genre: "hip-hop",
}

export default function LyricsBattle() {
  const [screen, setScreen] = useState<GameState["screen"]>("home")
  const [players, setPlayers] = useState<Player[]>(initialPlayers)
  const [config, setConfig] = useState<GameConfig>(defaultConfig)
  const [currentRound, setCurrentRound] = useState(1)
  const [showDevConsole, setShowDevConsole] = useState(false)

  const addPlayer = (name: string) => {
    const newPlayer: Player = {
      id: String(players.length + 1),
      name,
      avatar: ["🎵", "🎶", "🎸", "🥁", "🎹"][players.length % 5],
      score: 0,
      isHost: false,
      isReady: false,
    }
    setPlayers([...players, newPlayer])
  }

  const toggleReady = (playerId: string) => {
    setPlayers(players.map((p) => (p.id === playerId ? { ...p, isReady: !p.isReady } : p)))
  }

  const updateScore = (playerId: string, points: number) => {
    setPlayers(players.map((p) => (p.id === playerId ? { ...p, score: p.score + points } : p)))
  }

  const resetGame = () => {
    setPlayers(initialPlayers)
    setCurrentRound(1)
    setScreen("home")
  }

  return (
    <main className="min-h-screen bg-background">
      {screen === "home" && (
        <HomeScreen
          onHost={() => setScreen("lobby")}
          onJoin={() => setScreen("join")}
          onDevConsole={() => setShowDevConsole(true)}
        />
      )}

      {screen === "join" && (
        <JoinScreen
          onJoin={(code) => {
            addPlayer("Guest")
            setScreen("lobby")
          }}
          onBack={() => setScreen("home")}
        />
      )}

      {screen === "lobby" && (
        <LobbyScreen
          players={players}
          config={config}
          onConfigChange={setConfig}
          onToggleReady={toggleReady}
          onAddBot={() => addPlayer(`Bot ${players.length}`)}
          onStart={() => setScreen("game")}
          onBack={() => setScreen("home")}
          gameCode="LYRIC"
        />
      )}

      {screen === "game" && (
        <GameScreen
          players={players}
          config={config}
          currentRound={currentRound}
          onRoundComplete={(scores) => {
            scores.forEach(({ playerId, points }) => updateScore(playerId, points))
            if (currentRound >= config.rounds) {
              setScreen("results")
            } else {
              setCurrentRound(currentRound + 1)
            }
          }}
          onGameEnd={() => setScreen("results")}
        />
      )}

      {screen === "results" && (
        <ResultsScreen players={players} onPlayAgain={resetGame} onLeaderboard={() => setScreen("leaderboard")} />
      )}

      {screen === "leaderboard" && (
        <LeaderboardScreen players={players} onBack={() => setScreen("results")} onHome={resetGame} />
      )}

      {showDevConsole && (
        <DevConsole
          config={config}
          onConfigChange={setConfig}
          onNavigate={setScreen}
          onClose={() => setShowDevConsole(false)}
          currentScreen={screen}
        />
      )}
    </main>
  )
}
