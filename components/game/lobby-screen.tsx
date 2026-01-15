"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Check, Plus, Play } from "lucide-react"
import { useState } from "react"
import { SpotifyLogo } from "./spotify-logo"
import { Equalizer } from "./equalizer"
import type { Player, GameConfig } from "@/lib/game-types"

interface LobbyScreenProps {
  players: Player[]
  config: GameConfig
  onConfigChange: (config: GameConfig) => void
  onToggleReady: (playerId: string) => void
  onAddBot: () => void
  onStart: () => void
  onBack: () => void
  gameCode: string
}

export function LobbyScreen({
  players,
  config,
  onConfigChange,
  onToggleReady,
  onAddBot,
  onStart,
  onBack,
  gameCode,
}: LobbyScreenProps) {
  const [copied, setCopied] = useState(false)
  const allReady = players.every((p) => p.isReady)
  const canStart = players.length >= 2 && allReady

  const copyCode = () => {
    navigator.clipboard.writeText(gameCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Leave
        </button>

        {/* Game Code */}
        <button
          onClick={copyCode}
          className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#282828] hover:bg-[#333] transition-colors"
        >
          <span className="font-bold text-xl tracking-wider">{gameCode}</span>
          {copied ? <Check className="w-5 h-5 text-spotify-green" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 max-w-lg mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-8">
          <SpotifyLogo className="w-8 h-8 text-spotify-green mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Waiting Room</h2>
          <p className="text-muted-foreground">Share the code with friends to join</p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {players.map((player) => (
            <button
              key={player.id}
              onClick={() => onToggleReady(player.id)}
              className={`p-4 rounded-xl transition-all ${
                player.isReady
                  ? "bg-spotify-green/20 border-2 border-spotify-green"
                  : "bg-[#282828] border-2 border-transparent hover:border-[#535353]"
              }`}
            >
              <div className="text-3xl mb-2">{player.avatar}</div>
              <div className="font-bold truncate">{player.name}</div>
              <div
                className={`text-xs mt-1 font-semibold ${player.isReady ? "text-spotify-green" : "text-muted-foreground"}`}
              >
                {player.isReady ? "Ready" : "Tap to ready"}
              </div>
              {player.isHost && <div className="text-xs text-spotify-green mt-1 font-bold">HOST</div>}
            </button>
          ))}

          {/* Add Player Slot */}
          {players.length < 8 && (
            <button
              onClick={onAddBot}
              className="p-4 rounded-xl border-2 border-dashed border-[#535353] hover:border-white transition-colors flex flex-col items-center justify-center"
            >
              <Plus className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground font-semibold">Add Bot</span>
            </button>
          )}
        </div>

        {/* Game Settings */}
        <div className="space-y-3 mb-8">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Settings</h3>

          <div className="flex items-center justify-between p-4 rounded-lg bg-[#282828]">
            <span className="font-semibold">Rounds</span>
            <div className="flex items-center gap-2">
              {[3, 5, 7].map((r) => (
                <button
                  key={r}
                  onClick={() => onConfigChange({ ...config, rounds: r })}
                  className={`w-10 h-10 rounded-full font-bold transition-all ${
                    config.rounds === r ? "bg-spotify-green text-black" : "bg-[#333] hover:bg-[#444]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-[#282828]">
            <span className="font-semibold">Time</span>
            <div className="flex items-center gap-2">
              {[15, 30, 45].map((t) => (
                <button
                  key={t}
                  onClick={() => onConfigChange({ ...config, timePerRound: t })}
                  className={`px-4 h-10 rounded-full font-bold transition-all ${
                    config.timePerRound === t ? "bg-spotify-green text-black" : "bg-[#333] hover:bg-[#444]"
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Equalizer */}
        <div className="flex justify-center mb-6">
          <Equalizer className="opacity-40" barCount={5} />
        </div>

        {/* Start Button */}
        <Button
          size="lg"
          className="w-full h-14 text-lg font-bold rounded-full bg-spotify-green text-black hover:bg-spotify-green-light spotify-btn disabled:opacity-50 disabled:hover:scale-100"
          disabled={!canStart}
          onClick={onStart}
        >
          <Play className="w-5 h-5 mr-2" />
          {canStart ? "Start Game" : `Waiting for ${2 - players.filter((p) => p.isReady).length} more`}
        </Button>
      </div>
    </div>
  )
}
