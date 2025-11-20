import { useState } from "react"

type Props = {
    initialHidden?: boolean
    radius?: "none" | "sm" | "md" | "lg" | "xl" | "full"
}

const radiusClass = (r?: Props["radius"]) => {
    switch (r) {
        case "none": return ""
        case "sm": return "rounded-sm"
        case "md": return "rounded-md"
        case "lg": return "rounded-lg"
        case "xl": return "rounded-xl"
        case "full": return "rounded-full"
        default: return "rounded-lg"
    }
}

export default function BetaBanner({ initialHidden = false, radius = "lg" }: Props) {
    const [hidden, setHidden] = useState(initialHidden)

    if (hidden) return null

    return (
        <div className={`w-full bg-yellow-400/90 backdrop-blur-md text-yellow-900 flex items-center justify-between py-2 px-4 text-sm font-medium shadow ${radiusClass(radius)} transition-colors duration-300`}>
            <span>⚠️ Sayt hozircha BETA rejimida ishlayapti — xatoliklar bo‘lishi mumkin.</span>
            <button
                onClick={() => setHidden(true)}
                className="text-yellow-900 font-bold px-2 hover:opacity-70 transition-opacity duration-300"
                aria-label="Close beta banner"
            >
                ✕
            </button>
        </div>
    )
}
