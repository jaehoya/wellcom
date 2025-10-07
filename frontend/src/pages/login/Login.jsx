import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin({ username: loginForm.username });
        navigate('/'); // 로그인 성공 시 홈으로 이동
      } else {
        setLoginError(data.message || '로그인 실패');
      }
    } catch (err) {
      setLoginError('서버 오류');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-green-600">로그인</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="아이디"
            className="border p-2 rounded"
            value={loginForm.username}
            onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="border p-2 rounded"
            value={loginForm.password}
            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
            required
          />
          <button type="submit" className="bg-green-500 text-white rounded py-2 font-bold hover:bg-green-600">로그인</button>
        </form>
        {loginError && (
          <div className="text-red-500 text-sm mb-2">{loginError}</div>
        )}
        <button
          className="mt-4 text-green-500 underline"
          onClick={() => navigate('/register')}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}