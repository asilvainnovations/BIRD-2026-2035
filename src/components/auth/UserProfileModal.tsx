import { useState, useEffect } from 'react';
import { X, User, Mail, Building, Phone, Briefcase, Key, Save, Check, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, profile, updateProfile, updatePassword } = useAuth();

  // ── Profile form state ──────────────────────────────────────────
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');

  // ── Password form state ─────────────────────────────────────────
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // ── UI state ────────────────────────────────────────────────────
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  // Sync form state when modal opens or profile loads
  useEffect(() => {
    if (isOpen && profile) {
      setFullName(profile.full_name || '');
      setOrganization(profile.organization || '');
      setJobTitle(profile.job_title || '');
      setPhone(profile.phone || '');
      setError('');
      setSuccess('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setActiveTab('profile');
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await updateProfile({ full_name: fullName, organization, job_title: jobTitle, phone });
      setSuccess('Profile updated successfully');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await updatePassword(newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setSuccess('Password updated successfully');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (tab: 'profile' | 'password') => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  const avatarInitial = (fullName || user?.email || 'U').charAt(0).toUpperCase();
  const displayName = fullName || user?.email || 'User';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-gold/20 bg-gradient-to-b from-[#022c22] to-[#011a12] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-cinzel text-2xl font-bold text-gold-gradient mb-2">
            My Profile
          </h2>
          <p className="text-white/50 text-sm">
            Manage your account and preferences
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => switchTab('profile')}
            className={`flex-1 py-2 text-sm rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-gold/20 text-gold'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <User size={14} />
            Profile
          </button>
          <button
            onClick={() => switchTab('password')}
            className={`flex-1 py-2 text-sm rounded-lg font-medium transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'password'
                ? 'bg-gold/20 text-gold'
                : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Key size={14} />
            Password
          </button>
        </div>

        {/* Alert messages */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-300 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-green-300 text-sm flex items-center gap-2">
            <Check size={14} />
            {success}
          </div>
        )}

        {/* ── Profile Tab ── */}
        {activeTab === 'profile' ? (
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {/* Avatar + identity */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-cinzel text-lg font-bold shrink-0">
                {avatarInitial}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {displayName}
                </div>
                <div className="text-xs text-white/40 truncate">
                  {user?.email}
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  size={16}
                />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Organization */}
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">
                Organization
              </label>
              <div className="relative">
                <Building
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  size={16}
                />
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Organization / Company"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">
                Job Title
              </label>
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  size={16}
                />
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Job Title"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">
                Phone
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  size={16}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </form>
        ) : (
          /* ── Password Tab ── */
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">
                New Password
              </label>
              <div className="relative">
                <Key
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  size={16}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">
                Confirm New Password
              </label>
              <div className="relative">
                <Key
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                  size={16}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm New Password"
                  className="pl-10 pr-10"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full mt-2"
            >
              {loading ? (
                <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <>
                  <Key size={16} />
                  Update Password
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
