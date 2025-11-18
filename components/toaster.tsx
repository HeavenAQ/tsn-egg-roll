"use client"

import { useEffect, useRef, useState } from "react"
import { subscribe, type Toast } from "@/lib/toast"

type ToastItem = Toast & { visible: boolean }

const ANIM_MS = 220

export default function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timersRef = useRef(new Map<string, { hide?: number; remove?: number }>())

  // Show toast -> enter animation -> auto-hide -> exit animation -> remove
  useEffect(() => {
    const beginClose = (id: string) => {
      // Trigger exit animation
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)))
      // Remove after animation completes
      const existing = timersRef.current.get(id) || {}
      if (existing.remove) window.clearTimeout(existing.remove)
      const remove = window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
        timersRef.current.delete(id)
      }, ANIM_MS)
      timersRef.current.set(id, { ...existing, remove })
    }

    const scheduleHide = (id: string, delay: number) => {
      const existing = timersRef.current.get(id) || {}
      if (existing.hide) window.clearTimeout(existing.hide)
      const hide = window.setTimeout(() => beginClose(id), delay)
      timersRef.current.set(id, { ...existing, hide })
    }

    const unsub = subscribe((t) => {
      // Add hidden, then reveal next frame for transition
      setToasts((prev) => [...prev, { ...t, visible: false }])
      requestAnimationFrame(() => {
        setToasts((prev) => prev.map((x) => (x.id === t.id ? { ...x, visible: true } : x)))
      })
      scheduleHide(t.id, t.duration)
    })
    return () => {
      unsub()
      // Clear all timers on unmount
      timersRef.current.forEach((timers) => {
        if (timers.hide) window.clearTimeout(timers.hide)
        if (timers.remove) window.clearTimeout(timers.remove)
      })
      timersRef.current.clear()
    }
  }, [])

  const handleManualClose = (id: string) => {
    const timers = timersRef.current.get(id)
    if (timers?.hide) window.clearTimeout(timers.hide)
    // Trigger exit now
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)))
    const remove = window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      timersRef.current.delete(id)
    }, ANIM_MS)
    timersRef.current.set(id, { ...timers, remove })
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end gap-2 p-4 sm:p-6">
      <div className="ml-auto w-full max-w-sm space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={
              `pointer-events-auto overflow-hidden rounded-md border text-sm shadow-lg will-change-transform will-change-opacity ` +
              `transition-all duration-300 ease-out ` +
              (t.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2") +
              " " +
              (t.type === "success"
                ? "border-green-200 bg-green-50 text-green-900"
                : t.type === "error"
                ? "border-red-200 bg-red-50 text-red-900"
                : "border-gray-200 bg-white text-gray-900")
            }
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3 p-3">
              <div className="flex-1">
                {t.title && (
                  <div className="font-medium leading-snug">{t.title}</div>
                )}
                {t.description && (
                  <div className="mt-0.5 text-gray-600">{t.description}</div>
                )}
              </div>
              <button
                className="rounded p-1 text-gray-500 hover:bg-black/5 hover:text-gray-800"
                onClick={() => handleManualClose(t.id)}
                aria-label="Close toast"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
