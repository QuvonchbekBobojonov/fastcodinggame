import { Navigate, Route, Routes } from 'react-router-dom'
import FastCodeGame from './features/fastcode/FastCodeGame'
import TopPlayersPage from './features/top-players/TopPlayersPage'
import Navbar from './components/Navbar'
import { useLanguage } from './i18n/LanguageProvider'
import TelegramLoginPage from './pages/TelegramLoginPage'


const App = () => {
    const {t} = useLanguage()

    return (
        <div className="min-h-screen bg-[#F9FAFB] px-4 py-10 text-[#0F172A] transition-colors duration-300">
            <div className="mx-auto flex max-w-6xl flex-col gap-10"><Navbar/>
                <main className="flex flex-1 flex-col items-center">
                    <Routes>
                        <Route element={<FastCodeGame/>} path="/"/>
                        <Route element={<TopPlayersPage/>} path="/top-players"/>
                        <Route element={<TelegramLoginPage/>} path="/login"/>
                        <Route element={<Navigate replace to="/"/>} path="*"/>
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
