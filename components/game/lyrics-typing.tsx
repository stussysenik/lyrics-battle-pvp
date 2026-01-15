"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Equalizer } from "./equalizer"
import type { Player, Song } from "@/lib/game-types"

interface LyricsTypingProps {
  song: Song
  timeLimit: number
  onComplete: (accuracy: number, wpm: number) => void
  players: Player[]
}

export function LyricsTyping({ song, timeLimit, onComplete, players }: LyricsTypingProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [correctChars, setCorrectChars] = useState(0)
  const [totalChars, setTotalChars] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<number>(Date.now())

  const currentLine = song.lyrics[currentLineIndex]?.text || ""

  useEffect(() => {
    if (isComplete) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          finishGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isComplete])

  useEffect(() => {
    inputRef.current?.focus()
  }, [currentLineIndex])

  const finishGame = useCallback(() => {
    setIsComplete(true)
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000 / 60
    const wpm = timeElapsed > 0 ? Math.round(totalChars / 5 / timeElapsed) : 0
    onComplete(accuracy, wpm)
  }, [correctChars, totalChars, onComplete])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTypedText(value)

    if (
      value.trim().toLowerCase() === currentLine.toLowerCase() ||
      (value.endsWith(" ") && value.trim().length >= currentLine.length * 0.8)
    ) {
      let correct = 0
      const minLen = Math.min(value.trim().length, currentLine.length)
      for (let i = 0; i < minLen; i++) {
        if (value[i]?.toLowerCase() === currentLine[i]?.toLowerCase()) {
          correct++
        }
      }

      setCorrectChars((prev) => prev + correct)
      setTotalChars((prev) => prev + currentLine.length)

      if (currentLineIndex < song.lyrics.length - 1) {
        setCurrentLineIndex((prev) => prev + 1)
        setTypedText("")
      } else {
        finishGame()
      }
    }
  }

  const renderCharacter = (char: string, index: number) => {
    const typedChar = typedText[index]
    let colorClass = "text-[#535353]"

    if (typedChar !== undefined) {
      if (typedChar.toLowerCase() === char.toLowerCase()) {
        colorClass = "text-spotify-green"
      } else {
        colorClass = "text-destructive"
      }
    }

    const isCursor = index === typedText.length

    return (
      <span key={index} className="relative">
        <span className={cn("transition-colors duration-75", colorClass)}>{char}</span>
        {isCursor && <span className="absolute -bottom-0.5 left-0 w-0.5 h-7 bg-spotify-green cursor-blink" />}
      </span>
    )
  }

  const progress = ((currentLineIndex + typedText.length / currentLine.length) / song.lyrics.length) * 100

  return (
    <div className="min-h-screen flex flex-col p-6" onClick={() => inputRef.current?.focus()}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "text-4xl font-bold tabular-nums",
              timeLeft <= 10 ? "text-destructive animate-pulse" : "text-white",
            )}
          >
            {timeLeft}
          </div>
          <span className="text-muted-foreground text-sm">sec</span>
        </div>

        <Equalizer className="opacity-60" barCount={5} />

        <div className="flex items-center gap-2">
          {players.slice(0, 4).map((player, i) => (
            <div key={player.id} className="flex items-center gap-1 bg-[#282828] px-2 py-1 rounded-full">
              <span className="text-sm">{player.avatar}</span>
              <span className="text-xs font-bold text-spotify-green">{Math.round(progress * (1 - i * 0.1))}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Song info */}
      <div className="text-center mb-3">
        <p className="text-sm text-muted-foreground">
          <span className="text-white font-semibold">{song.artist}</span> — {song.title}
        </p>
      </div>

      <div className="h-1 bg-[#282828] rounded-full mb-12 overflow-hidden">
        <div className="h-full bg-spotify-green transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* Lyrics Display */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {currentLineIndex > 0 && (
          <p className="text-lg text-[#535353] mb-6 text-center">{song.lyrics[currentLineIndex - 1].text}</p>
        )}

        <div className="text-2xl md:text-4xl font-bold leading-relaxed text-center mb-6 max-w-2xl">
          {currentLine.split("").map((char, i) => renderCharacter(char, i))}
        </div>

        {currentLineIndex < song.lyrics.length - 1 && (
          <p className="text-lg text-[#404040] mt-6 text-center">{song.lyrics[currentLineIndex + 1].text}</p>
        )}

        <input
          ref={inputRef}
          value={typedText}
          onChange={handleInput}
          className="opacity-0 absolute pointer-events-none"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>

      {/* Instructions */}
      <div className="text-center mt-8">
        <p className="text-sm text-muted-foreground">
          Type the lyrics — press <kbd className="px-2 py-0.5 bg-[#282828] rounded text-white font-mono">space</kbd>{" "}
          after each line
        </p>
      </div>
    </div>
  )
}
