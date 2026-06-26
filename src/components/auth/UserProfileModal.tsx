import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Building2,
  Briefcase,
  Phone,
  Mail,
  Save,
  Loader2,
  Camera,
  LogOut,
  Shield,
  AlertCircle,
  CheckCircle2,
  Bell,
} from 'lucide-react';
import { UserProfile } from '@/hooks/useAuth';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  userEmail: string;
  onUpdateProfile: (updates: Partial<UserProfile>) => Promise<any>;
  onSignOut: () => Promise<void>;
  onUpdatePassword: (newPassword: string) => Promise<void>;
}

// Helper component for notification toggles
const NotificationToggle = ({ 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  label: string; 
  description: string; 
  checked: boolean; 
  onChange: (val: boolean) => void 
}) => (
  <div className="flex items-start justify-between gap-4 p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
    <div>
      <h4 className="text-sm font-medium text-slate-800">{label}</h4>
      <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
        checked ? 'bg-cyan-600' : 'bg-slate-200'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  </div>
);

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  userEmail,
  onUpdateProfile,
  onSignOut,
  onUpdatePassword,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Profile form state
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');

  // Notification preferences state (Matches Edge Function & DB Schema)
  const [notifPrefs, setNotifPrefs] = useState({
    email: true,
    kpi_alerts: true,
    weekly_digest: true,
    plan_reminders: true,
    team_updates: true,
  });

  // Password form state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setOrganization(profile.organization || '');
      setJobTitle(profile.job_title || '');
      setPhone(profile.phone || '');
      
      // Load notification preferences from profile
      const prefs = (profile as any).notification_preferences || {};
      setNotifPrefs({
        email: prefs.email !== false,
        kpi_alerts: prefs.kpi_alerts !== false,
        weekly_digest: prefs.weekly_digest !== false,
        plan_reminders: prefs.plan_reminders !== false,
        team_updates: prefs.team_updates !== false,
      });
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      await onUpdateProfile({
        full_name: fullName,
        organization,
        job_title: jobTitle,
        phone,
      } as any);
      setSuccess('Profile updated successfully!');
    } catch (err: any) {
      const errorMessage = err?.message || err?.error_description || 'Failed to update profile. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      await onUpdateProfile({
        notification_preferences: notifPrefs,
      } as any);
      setSuccess('Notification preferences updated successfully!');
    } catch (err: any) {
      const errorMessage = err?.message || err?.error_description || 'Failed to update preferences. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await onUpdatePassword(newPassword);
      setSuccess('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      const errorMessage = err?.message || err?.error_description || 'Failed to update password. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await onSignOut();
      onClose();
    } catch (err: any) {
      const errorMessage = err?.message || err?.error_description || 'Failed to sign out. Please try again.';
      setError(errorMessage);
    }
  };

  const handleImageUpload = () => {
    console.log('Image upload not implemented yet');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-6 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                {fullName ? fullName.charAt(0).toUpperCase() : userEmail.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleImageUpload}
                className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full text-cyan-600 hover:bg-cyan-50 transition-colors shadow-md"
                aria-label="Change profile picture"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold">{fullName || 'User'}</h2>
              <p className="text-white/80 text-sm">{userEmail}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 flex-shrink-0">
          <button
            onClick={() => {
              setActiveTab('profile');
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            aria-selected={activeTab === 'profile'}
          >
            <div className="flex items-center justify-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('notifications');
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'notifications'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            aria-selected={activeTab === 'notifications'}
          >
            <div className="flex items-center justify-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </div>
          </button>
          <button
            onClick={() => {
              setActiveTab('security');
              setError(null);
              setSuccess(null);
            }}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'security'
                ? 'text-cyan-600 border-b-2 border-cyan-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            aria-selected={activeTab === 'security'}
          >
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700 text-sm">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              {success}
            </div>
          )}

          {activeTab === 'notifications' ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-slate-800">Notification Preferences</h3>
                <p className="text-sm text-slate-500 mt-1">Choose what emails you want to receive from the BIRD platform.</p>
              </div>
              
              <div className="space-y-3">
                <NotificationToggle 
                  label="General Emails" 
                  description="Welcome emails and important account updates." 
                  checked={notifPrefs.email} 
                  onChange={(val) => setNotifPrefs({...notifPrefs, email: val})} 
                />
                <NotificationToggle 
                  label="KPI Alerts" 
                  description="Get notified when a KPI is at risk or falls below target." 
                  checked={notifPrefs.kpi_alerts} 
                  onChange={(val) => setNotifPrefs({...notifPrefs, kpi_alerts: val})} 
                />
                <NotificationToggle 
                  label="Weekly Digest" 
                  description="Receive a weekly summary of your strategic plan progress." 
                  checked={notifPrefs.weekly_digest} 
                  onChange={(val) => setNotifPrefs({...notifPrefs, weekly_digest: val})} 
                />
                <NotificationToggle 
                  label="Plan Reminders" 
                  description="Reminders when your plan hasn't been updated in a while." 
                  checked={notifPrefs.plan_reminders} 
                  onChange={(val) => setNotifPrefs({...notifPrefs, plan_reminders: val})} 
                />
                <NotificationToggle 
                  label="Team Updates" 
                  description="Notifications when team members comment or update shared plans." 
                  checked={notifPrefs.team_updates} 
                  onChange={(val) => setNotifPrefs({...notifPrefs, team_updates: val})} 
                />
              </div>

              <button
                type="button"
                onClick={handleSaveNotifications}
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          ) : activeTab === 'profile' ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="full-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="organization"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Company or organization"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="job-title" className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="job-title"
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Your role"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    value={userEmail}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <h3 className="font-medium text-slate-800">Change Password</h3>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="At least 6 characters"
                  />
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="Confirm your new password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !newPassword || !confirmPassword}
                  className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>

              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-medium text-slate-800 mb-4">Sign Out</h3>
                <button
                  onClick={handleSignOut}
                  className="w-full py-2.5 border border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;