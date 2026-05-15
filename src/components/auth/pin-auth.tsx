
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { X, Delete, ShieldCheck } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PinAuthProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  title?: string
}

export function PinAuth({ isOpen, onClose, onSuccess, title = "Autorização Necessária" }: PinAuthProps) {
  const [pin, setPin] = useState<string>("")
  const [error, setError] = useState(false)

  const handleKeyPress = (num: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + num)
      setError(false)
    }
  }

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1))
    setError(false)
  }

  useEffect(() => {
    if (pin.length === 6) {
      // Simulating a fixed PIN "123456" for demo purposes
      if (pin === "123456") {
        onSuccess()
        setPin("")
        onClose()
      } else {
        setError(true)
        setPin("")
        // Visual shake feedback could be added here
      }
    }
  }, [pin, onSuccess, onClose])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-headline">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-8 py-4">
          <div className="flex gap-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-4 w-4 rounded-full border-2 transition-all duration-200",
                  pin.length > i ? "bg-primary border-primary" : "border-muted",
                  error && "border-destructive animate-pulse"
                )}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <button
                key={num}
                onClick={() => handleKeyPress(num)}
                className="pin-pad-button"
              >
                {num}
              </button>
            ))}
            <div />
            <button onClick={() => handleKeyPress("0")} className="pin-pad-button">
              0
            </button>
            <button onClick={handleDelete} className="pin-pad-button text-muted-foreground">
              <Delete className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            {error ? (
              <span className="text-destructive font-semibold">PIN incorreto. Tente novamente.</span>
            ) : (
              "Insira seu PIN de segurança de 6 dígitos"
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
