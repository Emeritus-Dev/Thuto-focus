import { useState, useEffect } from 'react';
import './index.css';

const VOUCHERS = [
    { id: 1, name: "Superbalist R100", brand: "Fashion", cost: 5000, logo: "🛍️", color: "bg-black" },
    { id: 2, name: "Checkers R50", brand: "Groceries", cost: 2500, logo: "🛒", color: "bg-emerald-600" },
    { id: 3, name: "Ster-Kinekor Movie", brand: "Entertainment", cost: 3500, logo: "🍿", color: "bg-blue-600" },
    { id: 4, name: "Cafeteria Coffee", brand: "Campus", cost: 1000, logo: "☕", color: "bg-amber-700" },
];

const UNIVERSAL_MOTIVATIONS = [
    "Momentum is building. Stay in the zone.",
    "Distraction is the enemy of wealth. Keep digging.",
    "Pure focus detected. You are becoming a Standing Entity.",
    "Legacy is built in these quiet minutes.",
    "Consistency is the key to Lehumo."
];

const App = () => {
    const [currentPage, setCurrentPage] = useState('study');
    const [userName, setUserName] = useState("Tshegofatso");
    const [isStudent, setIsStudent] = useState(true);
    const [points, setPoints] = useState(1250);
    const [seconds, setSeconds] = useState(1500);
    const [isActive, setIsActive] = useState(false);
    const [studyMode, setStudyMode] = useState('individual');
    const [activeMessage, setActiveMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [avatar, setAvatar] = useState("🎓");
    const [timerPref, setTimerPref] = useState(25);
    const [academicBio, setAcademicBio] = useState("Final year IT student at CPUT. Digging for a Distinction in App Dev.");
    const [proBio, setProBio] = useState("Full-stack Developer | React & Java. Building the future of Fintech.");
    const [linkedIn, setLinkedIn] = useState("");
    const [isSyncing, setIsSyncing] = useState(false);
    const [newGoal, setNewGoal] = useState("");

    const [individualGoals, setIndividualGoals] = useState([
        { id: 1, text: "Finish Chapter 3 Reading", done: false },
        { id: 2, text: "Review SQL Joins", done: false }
    ]);
    const [groupGoals, setGroupGoals] = useState([
        { id: 1, text: "Sync Project Repository", done: false },
        { id: 2, text: "Peer Review UI Designs", done: false }
    ]);

    const [ranksTab, setRanksTab] = useState('milestones');

    // Removed the unused 'set' functions to keep TypeScript happy
    const [dailyMins] = useState(85);
    const [weeklyCollabs] = useState(1);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(s => s - 1);
                if (seconds !== 0 && seconds % 480 === 0) triggerUniversalMessage();
            }, 1000);
        } else if (seconds === 0) {
            setIsActive(false);
            const mult = studyMode === 'group' ? 1.25 : 1.0;
            setPoints(p => p + Math.floor(100 * mult));
            triggerUniversalMessage("Session Complete. Wealth Earned.");
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds, studyMode]);

    const triggerUniversalMessage = (customMsg?: string) => {
        const msg = customMsg || UNIVERSAL_MOTIVATIONS[Math.floor(Math.random() * UNIVERSAL_MOTIVATIONS.length)];
        setActiveMessage(msg);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 6000);
    };

    const toggleGoal = (id: number) => {
        if (studyMode === 'individual') {
            setIndividualGoals(individualGoals.map(g => g.id === id ? { ...g, done: !g.done } : g));
        } else {
            setGroupGoals(groupGoals.map(g => g.id === id ? { ...g, done: !g.done } : g));
        }
    };

    const addGoal = () => {
        if (!newGoal.trim()) return;
        const goalItem = { id: Date.now(), text: newGoal, done: false };
        if (studyMode === 'individual') {
            setIndividualGoals([...individualGoals, goalItem]);
        } else {
            setGroupGoals([...groupGoals, goalItem]);
        }
        setNewGoal("");
    };

    const renderStudy = () => {
        const activeGoals = studyMode === 'individual' ? individualGoals : groupGoals;

        return (
            <div className="flex flex-col h-full space-y-6 animate-in">
                {!isActive && (
                    <div className="flex bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800 shadow-inner transition-all duration-500">
                        <button onClick={() => setStudyMode('individual')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${studyMode === 'individual' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600'}`}>Solo Dig</button>
                        <button onClick={() => setStudyMode('group')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${studyMode === 'group' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-zinc-600'}`}>Group Dig</button>
                    </div>
                )}

                <div className={`relative flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isActive ? 'py-4 scale-90' : 'bg-zinc-900 border border-zinc-800 p-10 rounded-[3.5rem] shadow-2xl'}`}>
                    <h1 className={`font-mono font-black italic tracking-tighter transition-all duration-700 ${isActive ? 'text-5xl text-cyan-400' : 'text-7xl text-white mb-6'}`}>
                        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
                    </h1>

                    <div className="h-10 flex items-center justify-center w-full">
                        {showMessage && (
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 animate-pulse text-center italic drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                                {activeMessage}
                            </p>
                        )}
                    </div>

                    <button onClick={() => setIsActive(!isActive)} className={`transition-all uppercase font-black tracking-widest ${isActive ? 'mt-2 text-[10px] text-zinc-600 border-b border-zinc-800 pb-1' : 'w-full py-4 rounded-2xl bg-white text-black text-[11px] shadow-xl mt-4 active:scale-95'}`}>
                        {isActive ? "Pause Digging" : "Begin Focus"}
                    </button>
                </div>

                <div className="flex-1 flex flex-col bg-zinc-900/30 border border-zinc-800/60 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
                    <div className="p-5 border-b border-zinc-800/50 flex justify-between items-center">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                {studyMode === 'individual' ? 'Personal Dig Goals' : 'Squad Dig Goals'}
              </span>
                        <div className="flex gap-2 text-[10px] font-bold">
                            <span className="text-cyan-500">{activeGoals.filter(g => g.done).length}</span>
                            <span className="text-zinc-700">/ {activeGoals.length}</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
                        {activeGoals.map(goal => (
                            <div key={goal.id} onClick={() => toggleGoal(goal.id)} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${goal.done ? 'bg-cyan-500/5 border-cyan-500/20 opacity-40 scale-95' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'}`}>
                                <div className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${goal.done ? 'bg-cyan-500 border-cyan-500' : 'border-zinc-700'}`}>
                                    {goal.done && <span className="text-[10px] text-black">✓</span>}
                                </div>
                                <span className={`text-xs font-bold tracking-tight ${goal.done ? 'line-through text-zinc-600' : 'text-zinc-300'}`}>{goal.text}</span>
                            </div>
                        ))}
                    </div>

                    {!isActive && (
                        <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 flex gap-3">
                            <input
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                                placeholder={studyMode === 'individual' ? "New personal task..." : "New squad task..."}
                                className="flex-1 bg-transparent text-[11px] outline-none text-white px-2 placeholder:text-zinc-700"
                            />
                            <button onClick={addGoal} className="w-10 h-10 rounded-xl bg-zinc-800 text-white flex items-center justify-center font-bold text-xl">+</button>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const renderRanks = () => (
        <div className="space-y-6 animate-in flex flex-col h-full">
            <div className="flex bg-zinc-900 p-1 rounded-2xl border border-zinc-800 shadow-sm">
                <button onClick={() => setRanksTab('leaderboard')} className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${ranksTab === 'leaderboard' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}>Leaderboard</button>
                <button onClick={() => setRanksTab('milestones')} className={`flex-1 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${ranksTab === 'milestones' ? 'bg-zinc-800 text-white' : 'text-zinc-600'}`}>ROI Milestones</button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-1">
                {ranksTab === 'leaderboard' ? (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-zinc-900 to-black border-2 border-yellow-500/20 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-[-20%] right-[-10%] text-9xl italic font-black text-yellow-500/5 rotate-12">GOLD</div>
                            <h3 className="text-sm font-black text-yellow-500 uppercase italic mb-4 flex items-center gap-2 tracking-tighter"><span>⛏️</span> Path to Lehumo Gold</h3>
                            <div className="h-2.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
                                <div className="h-full bg-yellow-500 shadow-[0_0_15px_#eab308]" style={{ width: `${(points/50000)*100}%` }} />
                            </div>
                        </div>
                        {["Tshegofatso (You)", "Sipho M.", "Lerato K."].map((name, i) => (
                            <div key={i} className={`p-5 rounded-3xl flex justify-between items-center transition-all ${i === 0 ? 'bg-zinc-900 border border-cyan-500/30 shadow-xl' : 'bg-zinc-900/40 border border-zinc-800 opacity-50'}`}>
                                <span className={`font-black italic tracking-tight ${i === 0 ? 'text-cyan-400' : 'text-zinc-400'}`}>{i+1}. {name}</span>
                                <span className="font-black text-white">{i === 0 ? points : 1100 - (i*150)} PTS</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-zinc-800 shadow-xl">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 italic">Daily ROI: Discount Code Progress</p>
                            <div className="flex gap-2 justify-center mb-5">
                                {["C", "P", "U", "T", "?", "?"].map((char, i) => (
                                    <div key={i} className={`w-10 h-12 rounded-xl border flex items-center justify-center font-black text-lg transition-all ${i < 4 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-zinc-800 border-zinc-700 text-zinc-600'}`}>
                                        {char}
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between items-end mb-2 text-[10px] font-bold">
                                <span className="text-zinc-400 italic">Target: 150 Mins Focus</span>
                                <span className="text-white tracking-tighter">{dailyMins} / 150m</span>
                            </div>
                            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500" style={{ width: `${(dailyMins/150)*100}%` }} />
                            </div>
                        </div>

                        <div className="bg-zinc-900 p-6 rounded-[2.5rem] border border-zinc-800 shadow-xl">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-xs font-black text-white uppercase italic tracking-tighter">Squad Collaboration</h4>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase mt-1">ROI: Golden Scratch Card</p>
                                </div>
                                <span className="text-2xl">🤝</span>
                            </div>
                            <div className="flex gap-2">
                                {[1, 2, 3].map(step => (
                                    <div key={step} className={`flex-1 h-2 rounded-full transition-all ${step <= weeklyCollabs ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : 'bg-zinc-800'}`} />
                                ))}
                            </div>
                            <p className="text-[9px] text-zinc-500 italic mt-3 text-center tracking-tight">3 collaborations per week required.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderShop = () => (
        <div className="grid grid-cols-2 gap-4 animate-in">
            {VOUCHERS.map(v => (
                <div key={v.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] text-center shadow-lg transition-transform active:scale-95">
                    <div className={`w-12 h-12 mx-auto ${v.color} rounded-xl flex items-center justify-center text-xl mb-3 shadow-2xl`}>{v.logo}</div>
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{v.brand}</p>
                    <p className="text-xs font-black text-white mb-3 tracking-tighter">{v.name}</p>
                    <div className="text-[9px] font-black text-cyan-400 bg-zinc-800 py-1.5 rounded-full border border-zinc-700 shadow-inner">{v.cost} PTS</div>
                </div>
            ))}
        </div>
    );

    const renderUser = () => (
        <div className="space-y-6 animate-in pb-10 overflow-y-auto pr-1 custom-scrollbar max-h-full">
            <div className={`p-6 rounded-[2.5rem] border transition-all duration-500 shadow-2xl ${isStudent ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-900 border-cyan-500/30'}`}>
                <div className="flex items-center gap-5 mb-8">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-4xl shadow-inner relative overflow-hidden">
                        {avatar}
                        <button onClick={() => setAvatar(avatar === "🎓" ? "👤" : "🎓")} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    </div>
                    <div className="flex-1">
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} className="bg-transparent text-xl font-black text-white italic outline-none w-full tracking-tighter" />
                        <div className="flex items-center gap-3 mt-2">
               <span className={`text-[9px] font-black px-3 py-1 rounded-full border tracking-widest transition-all uppercase ${isStudent ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                 {isStudent ? "STUDENT" : "STANDING ENTITY"}
               </span>
                            <button onClick={() => setIsStudent(!isStudent)} className="text-[9px] text-zinc-600 underline font-black uppercase tracking-tighter">Switch</button>
                        </div>
                    </div>
                </div>
                <textarea value={isStudent ? academicBio : proBio} onChange={(e) => isStudent ? setAcademicBio(e.target.value) : setProBio(e.target.value)}
                          className="w-full bg-zinc-800/30 border border-zinc-800/50 rounded-[1.5rem] p-5 text-xs text-zinc-400 italic outline-none h-28 resize-none transition-all focus:border-cyan-500/50" />

                {/* ADDED LINKEDIN INPUT BACK HERE */}
                {!isStudent && (
                    <input placeholder="LinkedIn Profile (Optional)" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} className="w-full mt-4 bg-transparent border-b border-zinc-800 text-[10px] text-cyan-400 py-2 outline-none font-bold transition-all focus:border-cyan-500" />
                )}
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[2.5rem] space-y-4 shadow-xl">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Lehumo Vault</p>
                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                    <div className="min-w-[150px] bg-zinc-800 p-5 rounded-3xl border border-zinc-700 text-center shadow-lg active:scale-95 transition-all">
                        <span className="text-2xl">🛍️</span>
                        <p className="text-[10px] font-black text-white mt-3 uppercase tracking-tighter leading-none">Superbalist R100</p>
                        <p className="text-[8px] text-cyan-500 font-mono mt-3 font-black tracking-widest">UNLOCKED</p>
                    </div>
                </div>
            </div>

            {/* ADDED TOOLBOX SETTINGS BACK HERE */}
            <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[2.5rem] space-y-5 shadow-2xl">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest italic">Toolbox Settings</p>
                <div className="flex justify-between items-center text-xs font-black text-zinc-500 px-1 uppercase tracking-tighter">
                    <span>Dig Interval</span>
                    <select value={timerPref} onChange={(e) => setTimerPref(Number(e.target.value))} className="bg-zinc-800 border-none rounded-xl px-3 py-2 text-white outline-none text-[10px] font-black">
                        <option value={25}>25 Minutes</option><option value={50}>50 Minutes</option><option value={90}>90 Minutes</option>
                    </select>
                </div>
                <button onClick={() => { setIsSyncing(true); setTimeout(() => setIsSyncing(false), 2000); }} className="w-full py-4 bg-zinc-800 border border-zinc-700 rounded-2xl text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] hover:text-white hover:bg-zinc-700 transition-all shadow-md">
                    {isSyncing ? "FETCHING MARKS..." : "Sync Gradebook"}
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-zinc-200 font-sans pb-32 selection:bg-cyan-500 overflow-hidden antialiased">
            <div className="max-w-md mx-auto px-6 pt-10 h-screen flex flex-col relative">
                <header className={`text-center transition-all duration-700 ${isActive ? 'mb-4 opacity-40' : 'mb-10'}`}>
                    <div className={`w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-2xl shadow-cyan-500/20 transition-all duration-700 ${isActive ? 'scale-75 mb-2' : ''}`}>
                        <span className="text-2xl text-white italic font-serif">🎓</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">THUTO-FOCUS</h2>
                    {!isActive && <p className="text-[11px] text-zinc-600 italic mt-3 leading-relaxed tracking-tight font-medium">Transforming focus into legacy.</p>}
                </header>
                <main className="flex-1 overflow-hidden">
                    {currentPage === 'study' && renderStudy()}
                    {currentPage === 'ranks' && renderRanks()}
                    {currentPage === 'shop' && renderShop()}
                    {currentPage === 'user' && renderUser()}
                </main>
                <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md bg-zinc-900/95 border border-zinc-800 backdrop-blur-3xl p-2 rounded-[2.5rem] flex gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50">
                    {[
                        { id: 'study', l: 'Study', i: '📚' },
                        { id: 'ranks', l: 'Ranks', i: '🏆' },
                        { id: 'shop', l: 'Shop', i: '🛍️' },
                        { id: 'user', l: 'User', i: '👤' }
                    ].map(b => (
                        <button key={b.id} onClick={() => setCurrentPage(b.id)} className={`flex-1 py-4 rounded-3xl text-[9px] font-black transition-all flex flex-col items-center gap-1 uppercase tracking-tighter ${currentPage === b.id ? 'bg-white text-black shadow-lg scale-[1.05] -translate-y-1' : 'text-zinc-500 hover:text-zinc-300'}`}>
                            <span className="text-xl mb-1">{b.i}</span>{b.l}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default App;