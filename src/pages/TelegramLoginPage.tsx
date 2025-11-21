import { useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageProvider'

const BOT_USERNAME = 'fastcodingidbot'
const AUTH_URL = 'https://fastcoding.moorfo.uz/login'

const TelegramIcon = () => (
  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#e0f2ff] shadow-inner shadow-[#60a5fa]/40 dark:bg-[#172244]">
    <svg
      aria-hidden
      className="h-14 w-14 text-[#229ED9]"
      viewBox="0 0 240 240"
      fill="currentColor"
    >
      <path d="M120 0C53.73 0 0 53.73 0 120s53.73 120 120 120 120-53.73 120-120S186.27 0 120 0Zm53.32 87.68-19.3 90.78c-1.46 6.53-5.37 8.17-10.88 5.08l-30.07-22.18-14.51 13.98c-1.6 1.6-2.95 2.95-6.03 2.95l2.15-30.6 55.61-50.25c2.42-2.15-.52-3.34-3.76-1.19l-68.74 43.24-29.57-9.24c-6.43-2.01-6.53-6.43 1.34-9.49l115.6-44.58c5.37-1.95 10.05 1.19 8.27 9.48Z" />
    </svg>
  </div>
)

const TelegramLoginPage = () => {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Telegram OAuth widget script
    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.async = true
    script.setAttribute('data-telegram-login', BOT_USERNAME)
    script.setAttribute('data-size', 'medium')
    script.setAttribute('data-auth-url', AUTH_URL)
    script.setAttribute('data-request-access', 'write')

    if (containerRef.current) {
      containerRef.current.appendChild(script)
    }
  }, [])

  const triggerTelegramLogin = () => {
    const iframe = containerRef.current?.querySelector('iframe')

    if (!iframe) return

    const innerBtn =
      iframe.contentWindow?.document.querySelector('button')

    innerBtn?.click()
  }

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-[#e5e5e5] bg-white px-6 py-10 text-[#0f172a] shadow-[0_25px_60px_rgba(15,23,42,0.08)] transition dark:border-white/10 dark:bg-[#0b1120] dark:text-white sm:px-12">
      <div className="flex flex-col items-center gap-6 text-center">

        <TelegramIcon />

        <div className="space-y-3">
          <h1 className="text-3xl font-extrabold">{t('telegram.login.title')}</h1>
          <p className="text-base text-[#6b7280] dark:text-[#cbd5f5]">
            {t('telegram.login.description')}
          </p>
        </div>

        {/* Hidden Telegram widget */}
        <div ref={containerRef} style={{ display: 'none' }} />

        {/* Custom button triggering widget */}
        <button
          onClick={triggerTelegramLogin}
          className="inline-flex w-full max-w-sm items-center justify-center rounded-full bg-[#229ED9] px-8 py-3 text-base font-semibold text-white transition hover:scale-[1.01] hover:bg-[#1c8abf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#229ED9]"
        >
          {t('telegram.login.button')}
        </button>
      </div>
    </section>
  )
}

export default TelegramLoginPage
