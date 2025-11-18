"use client"

export type ToastType = "info" | "success" | "error"

export type ToastOptions = {
  title?: string
  description?: string
  type?: ToastType
  duration?: number
}

export type Toast = Required<Omit<ToastOptions, "duration" | "type">> & {
  id: string
  type: ToastType
  duration: number
}

type Listener = (toast: Toast) => void

const listeners = new Set<Listener>()

export function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function emit(toast: Toast) {
  listeners.forEach(l => l(toast))
}

function buildToast(opts: ToastOptions): Toast {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
  return {
    id,
    title: opts.title ?? "",
    description: opts.description ?? "",
    type: opts.type ?? "info",
    duration: Math.max(1500, Math.min(opts.duration ?? 3500, 10000)),
  }
}

export const toast = Object.assign(
  (opts: ToastOptions | string) => {
    const normalized =
      typeof opts === "string" ? { title: opts } : opts
    emit(buildToast(normalized))
  },
  {
    success(message: string, opts: Omit<ToastOptions, "type"> = {}) {
      emit(buildToast({ ...opts, title: message, type: "success" }))
    },
    error(message: string, opts: Omit<ToastOptions, "type"> = {}) {
      emit(buildToast({ ...opts, title: message, type: "error" }))
    },
    info(message: string, opts: Omit<ToastOptions, "type"> = {}) {
      emit(buildToast({ ...opts, title: message, type: "info" }))
    },
  }
)

