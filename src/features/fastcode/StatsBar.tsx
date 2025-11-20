import { useLanguage } from '../../i18n/LanguageProvider'

interface StatsBarProps {
  wpm: number
  accuracy: number
  charPerMin: number
}

interface StatItemProps {
  label: string
  value: string
  unit?: string
}

const StatItem = ({ label, value, unit }: StatItemProps) => (
  <div className="rounded-2xl border border-[#E5E7EB] bg-white px-5 py-4 text-center shadow-[0_12px_25px_rgba(10,74,138,0.05)] transition-colors duration-300">
    <p className="text-xs uppercase tracking-[0.25em] text-[#6B7280]">{label}</p>
    <p className="mt-2 text-2xl font-extrabold text-[#0F172A]">
      {value}
      {unit ? (
        <span className="ml-1 text-sm font-semibold text-[#6B7280]">{unit}</span>
      ) : null}
    </p>
  </div>
)

const StatsBar = ({ wpm, accuracy, charPerMin }: StatsBarProps) => {
  const { t } = useLanguage()
  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      <StatItem label={t('fastcode.stats.wpm')} value={wpm.toFixed(1)} />
      <StatItem label={t('fastcode.stats.accuracy')} value={accuracy.toFixed(1)} unit="%" />
      <StatItem label={t('fastcode.stats.cpm')} value={charPerMin.toFixed(0)} />
    </div>
  )
}

export default StatsBar
