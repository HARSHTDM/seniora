import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } else {
        await register(formData.email, formData.password);
        setIsLogin(true);
        setError('Registration successful! Please login.');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card animate-scale-in">
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, var(--color-accent) 0%, #1e40af 100%)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--spacing-lg)',
          color: 'white'
        }}>
          <LogIn size={32} />
        </div>
        <h1 style={{ fontSize: '1.875rem', marginBottom: 'var(--spacing-xs)' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {isLogin ? 'Login to your account' : 'Register for a new account'}
        </p>
      </div>

      {error && (
        <div style={{
          padding: 'var(--spacing-md)',
          background: error.includes('successful') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: error.includes('successful') ? 'var(--color-success)' : 'var(--color-error)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--spacing-lg)',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 'var(--spacing-md)' }}>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            placeholder="your.email@example.com"
          />
        </div>

        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            placeholder="••••••••"
          />
        </div>

        <Button 
          variant="primary" 
          type="submit"
          disabled={loading}
          style={{ width: '100%', marginBottom: 'var(--spacing-md)' }}
        >
          {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Register')}
        </Button>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-accent)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;