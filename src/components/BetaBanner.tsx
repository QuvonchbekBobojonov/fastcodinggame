import { useState, useEffect } from "react"

const STORAGE_KEY = "betaBannerHidden"

const readHiddenState = () => {
  if (typeof window === "undefined") return false
  try {
    return localStorage.getItem(STORAGE_KEY) === "true"
  } catch {
    return false
  }
}

export default function BetaBanner() {
  const [hidden, setHidden] = useState(readHiddenState)

  useEffect(() => {
    if (typeof window === "undefined") return
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        setHidden(event.newValue === "true")
      }
    }
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  const hide = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      // ignore write errors (private mode, etc.)
    }
    setHidden(true)
  }

  if (hidden) return null

  return (
    <div className="w-full bg-yellow-400/90 backdrop-blur-md text-yellow-900 flex items-center justify-between py-2 px-4 text-sm font-medium shadow transition-colors duration-300">
      <span>⚠️ Sayt hozircha BETA rejimida ishlayapti — xatoliklar bo‘lishi mumkin.</span>
      <button
        onClick={hide}
        className="text-yellow-900 font-bold px-2 hover:opacity-70 transition-opacity duration-300"
      >
        ✕
      </button>
    </div>
  )
}
