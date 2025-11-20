import { useState, useEffect } from "react"

export default function BetaBanner() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("betaBannerHidden")
    if (stored === "true") setHidden(true)
  }, [])

  const hide = () => {
    localStorage.setItem("betaBannerHidden", "true")
    setHidden(true)
  }

  if (hidden) return null

  return (
    <div className="w-full bg-yellow-400/90 backdrop-blur-md text-yellow-900 flex items-center justify-between py-2 px-4 text-sm font-medium shadow">
      <span>⚠️ Sayt hozircha BETA rejimida ishlayapti — xatoliklar bo‘lishi mumkin.</span>
      <button
        onClick={hide}
        className="text-yellow-900 font-bold px-2 hover:opacity-70"
      >
        ✕
      </button>
    </div>
  )
}
