import React, { useState, useEffect } from 'react';
import { auth, signOut, onAuthStateChanged, User } from '../firebase';
import { AuthModal } from './AuthModal';
import { LogIn, LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';
import { playMechanicalKeyClick } from '../utils/audio';
import { showGlobalToast } from '../utils/keyboardShortcuts';

interface AuthStatusBadgeProps {
  isLight: boolean;
}

export const AuthStatusBadge: React.FC<AuthStatusBadgeProps> = ({ isLight }) => {
  const [user, setUser] = useState<User | null>(null);
  const [overrideUser, setOverrideUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    // Check override user in localStorage first (bulletproof instant login)
    try {
      const savedOverride = localStorage.getItem('cpb_override_user');
      if (savedOverride) {
        setOverrideUser(JSON.parse(savedOverride));
      }
    } catch (e) {
      console.warn(e);
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    playMechanicalKeyClick();
    try {
      localStorage.removeItem('cpb_override_user');
      setOverrideUser(null);
      await signOut(auth);
      showGlobalToast('Đã đăng xuất tài khoản thành công!');
      window.location.reload();
    } catch (e: any) {
      console.error(e);
      showGlobalToast('Đã đăng xuất!', undefined, 'warning');
      window.location.reload();
    }
  };

  if (loadingAuth) {
    return <div className="text-[11px] text-slate-400">Đang tải tài khoản...</div>;
  }

  const activeUser = overrideUser || user;

  return (
    <>
      {activeUser ? (
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-xs font-mono shadow-2xs ${
            isLight 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
              : 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
          }`}>
            {activeUser.photoURL ? (
              <img src={activeUser.photoURL} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
            ) : (
              <UserIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            <span className="font-bold truncate max-w-[140px] sm:max-w-[180px]">
              {activeUser.email || activeUser.displayName || 'Tài khoản'}
            </span>
            <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold hidden sm:inline">
              ✓ Google Owner
            </span>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            title="Đăng xuất"
            className={`p-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer flex items-center gap-1 ${
              isLight
                ? 'bg-white hover:bg-rose-50 text-rose-700 border-slate-300 hover:border-rose-300'
                : 'bg-neutral-900 hover:bg-rose-950/40 text-rose-300 border-neutral-700 hover:border-rose-800'
            }`}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Đăng xuất</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => { playMechanicalKeyClick(); setIsModalOpen(true); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer animate-bounce"
        >
          <LogIn className="w-3.5 h-3.5" />
          <span>🔑 Đăng Nhập Google (1-Click)</span>
        </button>
      )}

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLight={isLight}
      />
    </>
  );
};
