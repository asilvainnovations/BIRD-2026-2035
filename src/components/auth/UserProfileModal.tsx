import { useState } from 'react';
import { X, User, Mail, Building, Phone, Briefcase, Key, Save, Check } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, updateProfile, updatePassword } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [jobTitle, setJobTitle] = useState(user?.job_title || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  if (!isOpen) return null;

  const handleSaveProfile = async () => {
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

  const handleChangePassword = async () => {
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
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Password updated successfully');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-2xl border border-gold/20 bg-gradient-to-b from-[#022c22] to-[#011a12] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h2 className="font-cinzel text-xl font-bold text-gold-gradient">My Profile</h2>
          <p className="text-white/50 text-sm mt-1">Manage your account and preferences</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 text-sm rounded-lg font-medium transition-colors ${
              activeTab === 'profile' ? 'bg-gold/20 text-gold' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <User size={14} className="inline mr-1.5" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-2 text-sm rounded-lg font-medium transition-colors ${
              activeTab === 'password' ? 'bg-gold/20 text-gold' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <Key size={14} className="inline mr-1.5" />
            Password
          </button>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-300 text-sm">{error}</div>}
        {success && <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-green-300 text-sm flex items-center gap-2"><Check size={14} />{success}</div>}

        {activeTab === 'profile' ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-cinzel text-lg font-bold">
                {(fullName || user?.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{fullName || user?.email}</div>
                <div className="text-xs text-white/40">{user?.email}</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Organization</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Organization / Company" className="pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title" className="pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="pl-10" />
              </div>
            </div>

            <button onClick={handleSaveProfile} disabled={loading} className="btn btn-primary w-full mt-2">
              {loading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Current Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password" className="pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">New Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min 6 characters" className="pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Confirm New Password</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="pl-10" />
              </div>
            </div>
            <button onClick={handleChangePassword} disabled={loading} className="btn btn-primary w-full mt-2">
              {loading ? <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" /> : <><Key size={16} /> Update Password</>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
