import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../i18n/LanguageProvider'
import AuthLayout from './AuthLayout'

const LoginPage = () => {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('success')
      window.setTimeout(() => setStatus('idle'), 1500)
    }, 800)
  }

  const isBusy = status === 'submitting'

  return (
    <AuthLayout
      title={t('auth.login.title')}
      subtitle={t('auth.login.subtitle')}
      helperText={t('auth.login.helper')}
      helperLink={{ label: t('nav.signup'), to: '/signup' }}
      footer={t('auth.login.footer')}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-[#0f172a]">
          {t('auth.login.email')}
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#d0d7e3] bg-white p-3 text-base text-[#0f172a] outline-none focus:ring-2 focus:ring-[#0A4A8A]/40"
            placeholder="you@example.com"
          />
        </label>

        <label className="block text-sm font-semibold text-[#0f172a]">
          {t('auth.login.password')}
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#d0d7e3] bg-white p-3 text-base text-[#0f172a] outline-none focus:ring-2 focus:ring-[#0A4A8A]/40"
            placeholder="••••••••"
          />
        </label>

        <div className="flex items-center justify-between text-sm text-[#475467]">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#cbd5f5] text-[#0A4A8A] focus:ring-[#0A4A8A]"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            {t('auth.login.remember')}
          </label>
          <Link className="font-semibold text-[#0A4A8A]" to="/reset">
            {t('auth.login.forgot')}
          </Link>
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className="flex w-full items-center justify-center rounded-full bg-[#0A4A8A] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#083666] disabled:opacity-60"
        >
          {isBusy ? `${t('auth.login.button')}...` : t('auth.login.button')}
        </button>

        {status === 'success' ? (
          <p className="rounded-2xl bg-[#ecfdf3] px-4 py-3 text-sm text-[#15803d]">
            {t('auth.login.success')}
          </p>
        ) : null}
      </form>
    </AuthLayout>
  )
}

export default LoginPage

