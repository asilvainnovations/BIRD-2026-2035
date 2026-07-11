import { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultView?: 'login' | 'signup' | 'reset';
}

export function AuthModal({ isOpen, onClose, defaultView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup' | 'reset'>(defaultView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const { signIn, signUp, resetPassword } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (view === 'login') {
        await signIn(email, password);
        setSuccess('Signed in successfully!');
        setTimeout(onClose, 1000);
      } else if (view === 'signup') {
        await signUp(email, password, fullName);
        setSuccess('Account created! Please check your email to confirm.');
      } else if (view === 'reset') {
        await resetPassword(email);
        setSuccess('Password reset link sent to your email.');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-gold/20 bg-gradient-to-b from-[#022c22] to-[#011a12] p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-cinzel text-2xl font-bold text-gold-gradient mb-2">
            {view === 'login' ? 'Welcome Back' : view === 'signup' ? 'Get Started' : 'Reset Password'}
          </h2>
          <p className="text-white/50 text-sm">
            {view === 'login' ? 'Sign in to access your strategic plans' : view === 'signup' ? 'Create your BIRD account' : 'Enter your email to reset password'}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-red-300 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-500/10 border border-green-500/30 p-3 text-green-300 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan dela Cruz"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="pl-10"
                required
              />
            </div>
          </div>

          {view !== 'reset' && (
            <div>
              <label className="block text-xs font-medium text-gold/70 mb-1.5 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="pl-10 pr-10"
                  required={true}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-2"
          >
            {loading ? (
              <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <>
                {view === 'login' ? 'Sign In' : view === 'signup' ? 'Create Account' : 'Send Reset Link'}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2 text-sm">
          {view === 'login' ? (
            <>
              <button onClick={() => { setView('signup'); setError(''); setSuccess(''); }} className="text-gold hover:text-gold-light transition-colors">
                Don't have an account? Sign up
              </button>
              <br />
              <button onClick={() => { setView('reset'); setError(''); setSuccess(''); }} className="text-white/40 hover:text-white/60 transition-colors">
                Forgot password?
              </button>
            </>
          ) : view === 'signup' ? (
            <button onClick={() => { setView('login'); setError(''); setSuccess(''); }} className="text-gold hover:text-gold-light transition-colors">
              Already have an account? Sign in
            </button>
          ) : (
            <button onClick={() => { setView('login'); setError(''); setSuccess(''); }} className="text-gold hover:text-gold-light transition-colors">
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
