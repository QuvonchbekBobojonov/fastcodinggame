import { useEffect, useMemo, useRef, useState } from 'react'
import StatsBar from './StatsBar'
import { SNIPPETS } from './snippets'
import { CodeSnippet } from './types'
import { TOP_PLAYERS } from './topPlayers'

const TOTAL_TIME = 60

const KEYWORDS = new Set([
  'const',
  'let',
  'var',
  'function',
  'return',
  'import',
  'from',
  'if',
  'else',
  'for',
  'while',
  'class',
  'export',
  'async',
  'await',
  'switch',
  'case',
  'def',
  'with',
  'yield',
])

const LANGUAGE_ICONS: Record<string, string> = {
  JavaScript: '🟨',
  Python: '🐍',
  HTML: '🌐',
  React: '⚛️',
  CSS: '🎨',
}

const formatNumber = (value: number, digits = 1) =>
  Number.isFinite(value) ? value.toFixed(digits) : '0.0'

const computeColorMap = (code: string) => {
  const colors = new Array(code.length).fill('text-[#d4d4d4]')
  let index = 0

  const markRange = (start: number, end: number, color: string) => {
    for (let i = start; i < end; i += 1) colors[i] = color
  }

  while (index < code.length) {
    const char = code[index]
    const next = code[index + 1]

    if (char === '/' && next === '/') {
      const start = index
      while (index < code.length && code[index] !== '\n') index += 1
      markRange(start, index, 'text-[#6a9955]')
      continue
    }

    if (char === '#' && (index === 0 || code[index - 1] === '\n')) {
      const start = index
      while (index < code.length && code[index] !== '\n') index += 1
      markRange(start, index, 'text-[#6a9955]')
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      const quote = char
      const start = index
      index += 1
      while (index < code.length) {
        const current = code[index]
        if (current === '\\') {
          index += 2
          continue
        }
        if (current === quote) {
          index += 1
          break
        }
        index += 1
      }
      markRange(start, index, 'text-[#ce9178]')
      continue
    }

    if (/[0-9]/.test(char)) {
      const start = index
      while (index < code.length && /[0-9._]/.test(code[index])) index += 1
      markRange(start, index, 'text-[#b5cea8]')
      continue
    }

    if (/[A-Za-z_]/.test(char)) {
      const start = index
      while (index < code.length && /[A-Za-z0-9_]/.test(code[index])) index += 1
      const word = code.slice(start, index)
      if (KEYWORDS.has(word)) markRange(start, index, 'text-[#c586c0]')
      continue
    }

    index += 1
  }

  return colors
}

const FastCodeGame = () => {
  const [snippetIndex, setSnippetIndex] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const editorRef = useRef<HTMLDivElement | null>(null)
  const intervalRef = useRef<number | null>(null)

  const activeSnippet: CodeSnippet = SNIPPETS[snippetIndex]
  const activeLanguageIcon =
    LANGUAGE_ICONS[activeSnippet.language] ?? '💻'
  const totalChars = activeSnippet.code.length
  const typedChars = inputValue.length
  const syntaxColorMap = useMemo(() => computeColorMap(activeSnippet.code), [activeSnippet.code])

  const { correctChars, incorrectChars } = useMemo(() => {
    let correct = 0, incorrect = 0
    for (let i = 0; i < typedChars; i++) {
      if (inputValue[i] === activeSnippet.code[i]) correct++
      else incorrect++
    }
    return { correctChars: correct, incorrectChars: incorrect }
  }, [typedChars, inputValue, activeSnippet.code])

  const elapsed = TOTAL_TIME - timeLeft
  const accuracy = typedChars === 0 ? 100 : (correctChars / typedChars) * 100
  const wpm = elapsed === 0 ? 0 : (typedChars / 5) / (elapsed / 60)
  const charPerMin = elapsed === 0 ? 0 : (typedChars / elapsed) * 60
  const progress = Math.min(100, (typedChars / totalChars) * 100)

  const stopTimer = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (!isRunning || isFinished) return
    if (timeLeft <= 0) return
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer()
          setIsRunning(false)
          setIsFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => stopTimer()
  }, [isRunning, isFinished, timeLeft])

  useEffect(() => () => stopTimer(), [])

  useEffect(() => {
    const disable = (e: Event) => e.preventDefault();
  
    document.addEventListener("copy", disable);
    document.addEventListener("contextmenu", disable);
    document.addEventListener("selectstart", disable);
    document.addEventListener("dragstart", disable);
  
    return () => {
      document.removeEventListener("copy", disable);
      document.removeEventListener("contextmenu", disable);
      document.removeEventListener("selectstart", disable);
      document.removeEventListener("dragstart", disable);
    };
  }, []);
  

  const hardReset = () => {
    stopTimer()
    setInputValue('')
    setTimeLeft(TOTAL_TIME)
    setIsRunning(false)
    setIsFinished(false)
    setShowTooltip(true)
    window.requestAnimationFrame(() => editorRef.current?.focus())
  }

  const handleStart = () => !isFinished && setIsRunning(true)
  const handleReset = () => hardReset()

  const cycleSnippet = (direction: 1 | -1) => {
    hardReset()
    setSnippetIndex(prev => (prev + direction + SNIPPETS.length) % SNIPPETS.length)
  }

  const handleSnippetSelect = (index: number) => {
    if (index === snippetIndex) return
    hardReset()
    setSnippetIndex(index)
  }

  useEffect(() => {
    editorRef.current?.focus()
  }, [snippetIndex])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isFinished) return

      const target = event.target as HTMLElement | null
      const tag = target?.tagName
      if (tag && ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return
      if (target?.getAttribute('contenteditable') === 'true') return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      if (event.key === 'Escape') {
        editorRef.current?.blur()
        return
      }

      let handled = false
      let nextValue = inputValue

      if (event.key === 'Backspace') {
        if (inputValue.length > 0) {
          nextValue = inputValue.slice(0, -1)
          handled = true
        }
      } else if (event.key === 'Enter') {
        nextValue = `${inputValue}\n`
        handled = true
      } else if (event.key === 'Tab') {
        nextValue = `${inputValue}\t`
        handled = true
      } else if (event.key.length === 1) {
        nextValue = `${inputValue}${event.key}`
        handled = true
      }

      if (!handled) return

      event.preventDefault()
      if (showTooltip) setShowTooltip(false)
      if (!isRunning) setIsRunning(true)
      setInputValue(nextValue)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [inputValue, isFinished, isRunning, showTooltip])

  const highlightedSnippet = useMemo(() => {
    const fragments = activeSnippet.code.split('').map((char, idx) => {
      const typedChar = inputValue[idx]
      let baseColor = syntaxColorMap[idx] ?? 'text-[#2c2c2c]'
      let effects = 'transition-colors duration-150 px-[1px]'

      if (typedChar === undefined) {
        // untouched character keeps syntax color
      } else if (typedChar === char) {
        baseColor = 'text-[#15803d]'
        effects += ' bg-[#e6f4ea] rounded-sm'
      } else {
        baseColor = 'text-[#c53030] underline decoration-[#f87171]'
        effects += ' bg-[#fee2e2] rounded-sm'
      }

      return (
        <span key={`${activeSnippet.id}-${idx}`} className={`${baseColor} ${effects}`}>
          {char === ' ' ? '\u00A0' : char === '\n' ? '\n' : char}
        </span>
      )
    })

    const caret =
      !isFinished && !showTooltip && typedChars <= activeSnippet.code.length ? (
        <span key="caret" className="caret-blink inline-block h-5 w-px bg-[#0A4A8A] align-middle" />
      ) : null

    if (caret) fragments.splice(typedChars, 0, caret)

    return fragments
  }, [activeSnippet, inputValue, isFinished, showTooltip, typedChars, syntaxColorMap])

  return (
    <section className="w-full max-w-4xl space-y-8 rounded-3xl border border-[#e5e5e5] bg-white px-6 py-8 text-[#1f2937] shadow-[0_30px_70px_rgba(15,23,42,0.08)] sm:px-12 sm:py-10">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-1 text-sm font-semibold text-[#0A4A8A]">
          <span className="text-lg">{activeLanguageIcon}</span>
          <span className="tracking-wide text-[#0A4A8A]">
            {activeSnippet.language}
          </span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#6b7280]">Fast Code Typing</p>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0f172a]">
            Coding Speed Test
          </h1>
        </div>
        <p className="text-sm text-[#666666]">
          Type the snippet below to measure your accuracy and speed.
        </p>
      </header>

      <div className="flex flex-col items-center gap-6 md:flex-row">
        <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-[3px] border-[#0A4A8A] bg-white text-[#0A4A8A] shadow-[0_15px_35px_rgba(10,74,138,0.2)]">
          <span className="text-4xl font-bold">{timeLeft}</span>
          <span className="text-[11px] uppercase tracking-[0.4em] text-[#0A4A8A]/80">
            seconds
          </span>
        </div>
        <div className="flex-1 w-full">
          <StatsBar accuracy={accuracy} charPerMin={charPerMin} wpm={wpm} />
        </div>
      </div>

      <div className="grid w-full gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-[#dcdcdc] bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[#6b7280]">Top players</p>
              <h3 className="text-lg font-bold text-[#0f172a]">Leaderboard</h3>
            </div>
            <span className="rounded-full bg-[#e0f2ff] px-3 py-1 text-xs font-semibold text-[#0A4A8A]">
              Live · updated daily
            </span>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {TOP_PLAYERS.slice(0, 3).map((player, index) => (
              <div
                key={player.name}
                className="rounded-2xl border border-[#e5e5e5] bg-[#f9fafb] p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-base font-semibold text-[#0A4A8A]">
                    #{index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a]">{player.name}</p>
                    <p className="text-xs text-[#94a3b8]">Streak: {player.streak}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs uppercase text-[#94a3b8]">WPM</p>
                    <p className="text-lg font-bold text-[#0f172a]">{player.wpm}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase text-[#94a3b8]">Accuracy</p>
                    <p className="text-lg font-bold text-[#16a34a]">{player.accuracy}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative rounded-3xl border border-[#dcdcdc] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.05)]">
        {showTooltip ? (
          <span className="absolute left-6 top-6 rounded-full bg-[#0A4A8A] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
            Type to begin
          </span>
        ) : null}
        <div
          ref={editorRef}
          role="textbox"
          tabIndex={0}
          aria-label="Fast code typing area"
          className="mt-16 max-h-[380px] overflow-y-auto cursor-text px-6 pb-6 font-mono text-sm leading-relaxed text-[#1f2937] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A4A8A]/40"
          onClick={() => editorRef.current?.focus()}
        >
          <pre className="whitespace-pre-wrap">{highlightedSnippet}</pre>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6b7280]">
          Progress
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-[#eef2ff]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0A4A8A] to-[#22c55e] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleStart}
            className="rounded-full border border-[#0A4A8A] bg-[#0A4A8A] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#083666]"
          >
            ▶ Start
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-full border border-[#e5e5e5] bg-white px-5 py-2 text-sm font-semibold text-[#0f172a] transition hover:border-[#0A4A8A]/40"
          >
            ↺ Reset
          </button>
          <button
            type="button"
            onClick={() => cycleSnippet(-1)}
            className="rounded-full border border-[#e5e5e5] bg-white px-5 py-2 text-sm font-semibold text-[#0f172a] transition hover:border-[#0A4A8A]/40"
          >
            ◀ Prev
          </button>
          <button
            type="button"
            onClick={() => cycleSnippet(1)}
            className="rounded-full border border-[#e5e5e5] bg-white px-5 py-2 text-sm font-semibold text-[#0f172a] transition hover:border-[#0A4A8A]/40"
          >
            Next ▶
          </button>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-[#e5e5e5] bg-white px-4 py-2 shadow-[0_10px_25px_rgba(15,23,42,0.05)]">
          <span className="text-xl">{activeLanguageIcon}</span>
          <select
            value={snippetIndex}
            onChange={(event) => handleSnippetSelect(Number(event.target.value))}
            className="bg-transparent text-[#1f2937] outline-none"
          >
            {SNIPPETS.map((snippet, index) => (
              <option key={snippet.id} value={index}>
                {snippet.language} • {snippet.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isFinished && (
        <div className="w-full animate-fade-in rounded-2xl border border-[#e5e5e5] bg-white p-6 text-center shadow-[0_15px_40px_rgba(15,23,42,0.07)]">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6b7280]">Session summary</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#e5e5e5] bg-[#f9fafb] p-4">
              <p className="text-xs uppercase text-[#6b7280]">Final WPM</p>
              <p className="text-3xl font-extrabold text-[#0f172a]">{formatNumber(wpm)}</p>
            </div>
            <div className="rounded-2xl border border-[#e5e5e5] bg-[#f9fafb] p-4">
              <p className="text-xs uppercase text-[#6b7280]">Accuracy</p>
              <p className="text-3xl font-extrabold text-[#0f172a]">{formatNumber(accuracy)}%</p>
            </div>
            <div className="rounded-2xl border border-[#e5e5e5] bg-[#f9fafb] p-4">
              <p className="text-xs uppercase text-[#6b7280]">Correct chars</p>
              <p className="text-2xl font-bold text-[#16a34a]">{correctChars}</p>
            </div>
            <div className="rounded-2xl border border-[#e5e5e5] bg-[#f9fafb] p-4">
              <p className="text-xs uppercase text-[#6b7280]">Incorrect chars</p>
              <p className="text-2xl font-bold text-[#dc2626]">{incorrectChars}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default FastCodeGame
