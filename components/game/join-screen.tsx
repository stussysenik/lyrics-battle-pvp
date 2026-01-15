"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { SpotifyLogo } from "./spotify-logo"
import { Equalizer } from "./equalizer"

interface JoinScreenProps {
  onJoin: (code: string) => void
  onBack: () => void
}

export function JoinScreen({ onJoin, onBack }: JoinScreenProps) {
  const [code, setCode] = useState("")

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-12"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        <SpotifyLogo className="w-10 h-10 text-spotify-green mb-6" />
        <h2 className="text-3xl font-bold mb-2">Join Game</h2>
        <p className="text-muted-foreground mb-8 text-center">Enter the game code shown on the host's screen</p>

        {/* Code Input */}
        <div className="w-full space-y-4">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="GAME CODE"
            className="h-16 text-center text-2xl font-bold tracking-[0.5em] uppercase bg-[#282828] border-0 rounded-lg focus:ring-2 focus:ring-spotify-green"
            maxLength={6}
          />

          <Button
            size="lg"
            className="w-full h-14 text-lg font-bold rounded-full bg-spotify-green text-black hover:bg-spotify-green-light spotify-btn"
            disabled={code.length < 4}
            onClick={() => onJoin(code)}
          >
            Join Lobby
          </Button>
        </div>

        {/* Quick Join Options */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">Demo codes</p>
          <div className="flex gap-2">
            {["LYRIC", "BEATS", "FLOW"].map((demoCode) => (
              <button
                key={demoCode}
                onClick={() => setCode(demoCode)}
                className="px-4 py-2 rounded-full bg-[#282828] text-sm font-bold hover:bg-[#333] transition-colors"
              >
                {demoCode}
              </button>
            ))}
          </div>
        </div>

        <Equalizer className="mt-12 opacity-40" barCount={5} />
      </div>
    </div>
  )
}
