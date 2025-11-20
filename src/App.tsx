import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/LoginPage'
import SignupPage from './features/auth/SignupPage'
import FastCodeGame from './features/fastcode/FastCodeGame'
import TopPlayersPage from './features/top-players/TopPlayersPage'
import { useLanguage } from './i18n/LanguageProvider'
import { LANGUAGE_OPTIONS, Locale } from './i18n/translations'
import BetaBanner from './components/BetaBanner'

const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300',
    isActive
      ? 'bg-[#0A4A8A] text-white'
      : 'text-[#0F172A] hover:bg-white/60',
  ].join(' ')

const App = () => {
  const { t, locale, setLocale } = useLanguage()

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-10 text-[#0F172A] transition-colors duration-300">
      <BetaBanner />
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#E5E7EB] bg-white px-6 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition-colors duration-300">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="text-base font-semibold leading-tight">{t('app.brandName')}</p>
              <p className="text-xs uppercase tracking-[0.4em] text-[#6B7280]">
                {t('app.brandTagline')}
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            <NavLink className={navLinkClasses} to="/">
              {t('nav.game')}
            </NavLink>
            <NavLink className={navLinkClasses} to="/top-players">
              {t('nav.topPlayers')}
            </NavLink>
            <NavLink className={navLinkClasses} to="/login">
              {t('nav.login')}
            </NavLink>
            <NavLink className={navLinkClasses} to="/signup">
              {t('nav.signup')}
            </NavLink>
            <label className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#0F172A] transition-colors duration-300">
              <span>{t('language.selectLabel')}</span>
              <select
                aria-label={t('language.selectLabel')}
                className="bg-transparent text-sm font-bold text-[#0F172A] outline-none cursor-pointer"
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
              >
                {LANGUAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </nav>
        </header>

        <main className="flex flex-1 flex-col items-center">
          <Routes>
            <Route element={<FastCodeGame />} path="/" />
            <Route element={<TopPlayersPage />} path="/top-players" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<SignupPage />} path="/signup" />
            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        </main>

        <div className="space-y-1 text-center text-sm text-[#6B7280] transition-colors duration-300">
          <p>{t('footer.practice')}</p>
          <p>{t('footer.copy')}</p>
        </div>
      </div>
    </div>
  )
}

export default App
