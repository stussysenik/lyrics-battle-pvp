"use client"

import { Button } from "@/components/ui/button"
import { Users, Zap } from "lucide-react"
import { SpotifyLogo } from "./spotify-logo"
import { Equalizer } from "./equalizer"

interface HomeScreenProps {
  onHost: () => void
  onJoin: () => void
  onDevConsole: () => void
}

export function HomeScreen({ onHost, onJoin, onDevConsole }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <SpotifyLogo className="w-10 h-10 text-spotify-green" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
          Lyrics
          <span className="text-spotify-green">Battle</span>
        </h1>
        <p className="text-muted-foreground text-lg">Type fast. Know your lyrics. Win.</p>
      </div>

      <Equalizer className="mb-12" barCount={7} />

      {/* Action Buttons - Spotify pill style */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button
          size="lg"
          className="h-14 text-lg font-bold rounded-full spotify-btn bg-spotify-green text-black hover:bg-spotify-green-light"
          onClick={onHost}
        >
          <Zap className="w-5 h-5 mr-2" />
          Host Game
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="h-14 text-lg font-bold rounded-full border-muted-foreground/30 hover:border-white hover:bg-transparent hover:scale-[1.04] transition-transform bg-transparent"
          onClick={onJoin}
        >
          <Users className="w-5 h-5 mr-2" />
          Join Game
        </Button>
      </div>

      <button
        onClick={onDevConsole}
        className="mt-12 px-6 py-3 rounded-full bg-secondary text-sm font-semibold text-muted-foreground hover:text-white hover:bg-secondary/80 transition-all"
      >
        Test All Screens
      </button>

      {/* Footer */}
      <div className="fixed bottom-6 left-6 flex items-center gap-2">
        <SpotifyLogo className="w-4 h-4 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Prototype v0.1</p>
      </div>
    </div>
  )
}
