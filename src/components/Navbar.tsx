import { NavLink } from "react-router-dom"
import BetaBanner from "./BetaBanner"
import { LANGUAGE_OPTIONS, Locale } from "../i18n/translations"
import { useLanguage } from "../i18n/LanguageProvider"

const navLinkClasses =
    "px-4 py-2 rounded-full text-sm font-semibold text-[#0F172A] border border-transparent hover:border-[#0A4A8A]/40 transition"

export default function Navbar() {
    const { t, locale, setLocale } = useLanguage()

    return (
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#E5E7EB] bg-white px-6 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] transition-colors duration-300">
            <div className="flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <div>
                    <p className="text-base font-semibold leading-tight">{t("app.brandName")}</p>
                    <p className="text-xs uppercase tracking-[0.4em] text-[#6B7280]">
                        {t("app.brandTagline")}
                    </p>
                </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
                <NavLink className={navLinkClasses} to="/">
                    {t("nav.game")}
                </NavLink>
                <NavLink className={navLinkClasses} to="/top-players">
                    {t("nav.topPlayers")}
                </NavLink>
                <NavLink className={navLinkClasses} to="/login">
                    {t("nav.login")}
                </NavLink>

                <label className="flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-semibold text-[#0F172A] transition-colors duration-300">
                    <span>{t("language.selectLabel")}</span>

                    <select
                        aria-label={t("language.selectLabel")}
                        className="bg-transparent text-sm font-bold text-[#0F172A] outline-none cursor-pointer"
                        value={locale}
                        onChange={(e) => setLocale(e.target.value as Locale)}
                    >
                        {LANGUAGE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
            </nav>

            <BetaBanner />
        </header>
    )
}
