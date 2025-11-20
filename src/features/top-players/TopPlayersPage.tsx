import { useLanguage } from '../../i18n/LanguageProvider'
import { TOP_PLAYERS } from '../fastcode/topPlayers'

const TopPlayersPage = () => {
  const { t } = useLanguage()

  const getBadge = (wpm: number) => {
    if (wpm >= 120) return t('topPlayers.badge.elite')
    if (wpm >= 105) return t('topPlayers.badge.pro')
    return t('topPlayers.badge.rising')
  }

  return (
    <section className="w-full max-w-5xl space-y-8 rounded-3xl border border-[#e5e5e5] bg-white px-6 py-10 text-[#0f172a] shadow-[0_25px_60px_rgba(15,23,42,0.08)] sm:px-12">
      <header className="space-y-3 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#e0f2ff] px-4 py-1 text-xs font-semibold text-[#0A4A8A]">
          <span aria-hidden>🏆</span> {t('topPlayers.pill')}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">{t('topPlayers.title')}</h1>
        <p className="text-sm text-[#6b7280]">{t('topPlayers.description')}</p>
      </header>

      <div className="grid gap-4">
        {TOP_PLAYERS.map((player, index) => (
          <article
            key={player.name}
            className="flex flex-col justify-between rounded-2xl border border-[#e5e5e5] bg-[#f9fafb] p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-base font-semibold text-[#0A4A8A]">
                #{index + 1}
              </div>
              <div>
                <div className="text-lg font-semibold">{player.name}</div>
                <p className="text-sm text-[#94a3b8]">
                  {t('topPlayers.streak')}: {player.streak}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm sm:mt-0 sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase text-[#94a3b8]">{t('topPlayers.wpm')}</p>
                <p className="text-2xl font-bold text-[#0f172a]">{player.wpm}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-[#94a3b8]">{t('topPlayers.accuracy')}</p>
                <p className="text-2xl font-bold text-[#16a34a]">{player.accuracy}%</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs uppercase text-[#94a3b8]">{t('topPlayers.badgeLabel')}</p>
                <p className="text-base font-semibold text-[#0A4A8A]">{getBadge(player.wpm)}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <footer className="rounded-2xl bg-[#eef2ff] px-5 py-4 text-sm text-[#0A4A8A]">
        {t('topPlayers.footer')}
      </footer>
    </section>
  )
}

export default TopPlayersPage

