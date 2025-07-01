'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import PopupModal from '../../components/PopupModal';
import SubmitButton from '../../components/SubmitButton';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('error');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter email and password');
      }

      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const userData = response.data.user;

      localStorage.setItem('user', JSON.stringify(userData));

      setModalMessage('Login successful!');
      setModalType('success');
      setShowModal(true);

      setTimeout(() => {
        window.location.href = "/";
    }, 2000);
    } catch (err) {
      setModalMessage(err.response?.data?.error || err.message || 'Login failed');
      setModalType('error');
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center z-10">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Login to Brighter Beyond</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <SubmitButton loading={loading} onClick={handleLogin} disabled={!email || !password}>
            Login
          </SubmitButton>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-green-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      {/* SVG Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#D7A529"
          d="M0,224L48,197.3C96,171,192,117,288,96C384,75,460,85,570,96C672,107,768,117,864,138.7C960,160,1056,192,1152,176C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      {/* Modal */}
      {showModal && (
        <PopupModal
          type={modalType}
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
