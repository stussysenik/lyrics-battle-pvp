"use client"

import { useEffect, useState } from "react"
import { SpotifyLogo } from "./spotify-logo"
import { Equalizer } from "./equalizer"
import type { Song } from "@/lib/game-types"

interface RoundIntroProps {
  roundNumber: number
  totalRounds: number
  song: Song
  onStart: () => void
}

export function RoundIntro({ roundNumber, totalRounds, song, onStart }: RoundIntroProps) {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onStart()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [onStart])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#1db954]/20 to-background">
      {/* Round indicator */}
      <div className="text-sm text-muted-foreground mb-8 uppercase tracking-wider font-bold">
        Round {roundNumber} of {totalRounds}
      </div>

      {/* Countdown */}
      <div className="relative mb-12">
        <div className="w-36 h-36 rounded-full border-4 border-spotify-green flex items-center justify-center bg-spotify-green/10">
          <span className="text-7xl font-bold text-spotify-green">{countdown}</span>
        </div>
      </div>

      {/* Song preview */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <SpotifyLogo className="w-5 h-5 text-spotify-green" />
          <span className="text-muted-foreground font-semibold">Get Ready</span>
        </div>
        <h2 className="text-3xl font-bold mb-1">{song.title}</h2>
        <p className="text-muted-foreground text-lg">{song.artist}</p>
      </div>

      {/* Equalizer */}
      <Equalizer className="mt-12" barCount={7} />
    </div>
  )
}
