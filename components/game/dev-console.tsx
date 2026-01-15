"use client"

import { Button } from "@/components/ui/button"
import { X, Play, ArrowRight } from "lucide-react"
import { SpotifyLogo } from "./spotify-logo"
import type { GameConfig, GameState } from "@/lib/game-types"

interface DevConsoleProps {
  config: GameConfig
  onConfigChange: (config: GameConfig) => void
  onNavigate: (screen: GameState["screen"]) => void
  onClose: () => void
  currentScreen: GameState["screen"]
}

const screens: { name: GameState["screen"]; label: string; desc: string }[] = [
  { name: "home", label: "Home", desc: "Landing screen" },
  { name: "join", label: "Join", desc: "Enter game code" },
  { name: "lobby", label: "Lobby", desc: "Wait for players" },
  { name: "game", label: "Game", desc: "Type lyrics!" },
  { name: "results", label: "Results", desc: "See winner" },
  { name: "leaderboard", label: "Scores", desc: "All-time best" },
]

export function DevConsole({ config, onConfigChange, onNavigate, onClose, currentScreen }: DevConsoleProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#181818] border border-[#282828] rounded-xl overflow-hidden animate-in slide-in-from-bottom">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#282828]">
          <div className="flex items-center gap-3">
            <SpotifyLogo className="w-6 h-6 text-spotify-green" />
            <h2 className="font-bold text-lg">Screen Navigator</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-[#282828] transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6 max-h-[70vh] overflow-y-auto">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Jump to Screen</h3>
            <div className="grid gap-2">
              {screens.map((screen) => (
                <button
                  key={screen.name}
                  onClick={() => {
                    onNavigate(screen.name)
                    onClose()
                  }}
                  className={`flex items-center justify-between p-4 rounded-lg text-left transition-all ${
                    currentScreen === screen.name ? "bg-spotify-green text-black" : "bg-[#282828] hover:bg-[#333333]"
                  }`}
                >
                  <div>
                    <p className="font-semibold">{screen.label}</p>
                    <p
                      className={`text-sm ${currentScreen === screen.name ? "text-black/70" : "text-muted-foreground"}`}
                    >
                      {screen.desc}
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 ${currentScreen === screen.name ? "text-black" : "text-muted-foreground"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Game Config */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Game Settings</h3>
            <div className="space-y-4 p-4 bg-[#282828] rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Rounds</span>
                <div className="flex gap-1">
                  {[1, 3, 5].map((r) => (
                    <button
                      key={r}
                      onClick={() => onConfigChange({ ...config, rounds: r })}
                      className={`w-10 h-8 rounded-full text-sm font-bold transition-all ${
                        config.rounds === r ? "bg-spotify-green text-black" : "bg-[#333] hover:bg-[#444]"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Time (sec)</span>
                <div className="flex gap-1">
                  {[15, 30, 45].map((t) => (
                    <button
                      key={t}
                      onClick={() => onConfigChange({ ...config, timePerRound: t })}
                      className={`w-10 h-8 rounded-full text-sm font-bold transition-all ${
                        config.timePerRound === t ? "bg-spotify-green text-black" : "bg-[#333] hover:bg-[#444]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-sm text-muted-foreground p-4 bg-[#282828] rounded-lg">
            <p className="font-semibold text-white mb-2">Testing the Prototype</p>
            <p>
              Click any screen above to jump directly to it. The Game screen has a working typing mechanism - just start
              typing the lyrics!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#282828]">
          <Button
            className="w-full h-12 rounded-full font-bold bg-spotify-green text-black hover:bg-spotify-green-light spotify-btn"
            onClick={onClose}
          >
            <Play className="w-5 h-5 mr-2" />
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
