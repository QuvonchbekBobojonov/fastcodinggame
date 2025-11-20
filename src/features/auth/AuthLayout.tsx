import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageProvider'

interface AuthLayoutProps {
  title: string
  subtitle: string
  helperText?: string
  helperLink?: {
    label: string
    to: string
  }
  children: ReactNode
  footer?: ReactNode
}

const AuthLayout = ({
  title,
  subtitle,
  helperText,
  helperLink,
  children,
  footer,
}: AuthLayoutProps) => {
  const { t } = useLanguage()
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-[#e5e5e5] bg-white px-8 py-10 text-[#0f172a] shadow-[0_35px_90px_rgba(15,23,42,0.08)]">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e0f2ff] px-3 py-1 text-xs font-semibold text-[#0A4A8A]">
            <span aria-hidden>⚡</span> {t('auth.pill')}
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#0f172a]">{title}</h2>
          <p className="text-sm text-[#6b7280]">{subtitle}</p>
        </div>
        {children}
        <div className="text-center text-sm text-[#6b7280]">
          {helperText}{' '}
          {helperLink ? (
            <Link className="font-semibold text-[#0A4A8A]" to={helperLink.to}>
              {helperLink.label}
            </Link>
          ) : null}
        </div>
        {footer ? <div className="pt-2 text-sm text-[#94a3b8]">{footer}</div> : null}
      </div>
    </div>
  )
}

export default AuthLayout

