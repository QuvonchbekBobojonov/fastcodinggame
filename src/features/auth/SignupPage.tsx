import { ChangeEvent, FormEvent, useState } from 'react'
import { useLanguage } from '../../i18n/LanguageProvider'
import AuthLayout from './AuthLayout'

const SignupPage = () => {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleChange = (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.password !== form.confirm) {
      window.alert('Passwords need to match.')
      return
    }
    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('success')
      window.setTimeout(() => setStatus('idle'), 1500)
    }, 900)
  }

  const isBusy = status === 'submitting'

  return (
    <AuthLayout
      title={t('auth.signup.title')}
      subtitle={t('auth.signup.subtitle')}
      helperText={t('auth.signup.helper')}
      helperLink={{ label: t('nav.login'), to: '/login' }}
      footer={t('auth.signup.footer')}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-[#0f172a]">
          {t('auth.signup.name')}
          <input
            type="text"
            required
            value={form.name}
            onChange={handleChange('name')}
            className="mt-2 w-full rounded-2xl border border-[#d0d7e3] bg-white p-3 text-base text-[#0f172a] outline-none focus:ring-2 focus:ring-[#0A4A8A]/40"
            placeholder="Ada Lovelace"
          />
        </label>

        <label className="block text-sm font-semibold text-[#0f172a]">
          {t('auth.signup.email')}
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            className="mt-2 w-full rounded-2xl border border-[#d0d7e3] bg-white p-3 text-base text-[#0f172a] outline-none focus:ring-2 focus:ring-[#0A4A8A]/40"
            placeholder="you@example.com"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-[#0f172a]">
            {t('auth.signup.password')}
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={handleChange('password')}
              className="mt-2 w-full rounded-2xl border border-[#d0d7e3] bg-white p-3 text-base text-[#0f172a] outline-none focus:ring-2 focus:ring-[#0A4A8A]/40"
              placeholder="Create a password"
            />
          </label>
          <label className="block text-sm font-semibold text-[#0f172a]">
            {t('auth.signup.confirm')}
            <input
              type="password"
              required
              value={form.confirm}
              onChange={handleChange('confirm')}
              className="mt-2 w-full rounded-2xl border border-[#d0d7e3] bg-white p-3 text-base text-[#0f172a] outline-none focus:ring-2 focus:ring-[#0A4A8A]/40"
              placeholder="Re-enter password"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isBusy}
          className="flex w-full items-center justify-center rounded-full bg-[#0A4A8A] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#083666] disabled:opacity-60"
        >
          {isBusy ? `${t('auth.signup.button')}...` : t('auth.signup.button')}
        </button>

        {status === 'success' ? (
          <p className="rounded-2xl bg-[#ecfdf3] px-4 py-3 text-sm text-[#15803d]">
            {t('auth.signup.success')}
          </p>
        ) : null}
      </form>
    </AuthLayout>
  )
}

export default SignupPage

