import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', email: '' });
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (res.ok) {
        onRegister({ username: registerForm.username });
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
        console.log('회원가입 성공:', data);
      } else {
        setRegisterError(data.message || '회원가입 실패');
      }
    } catch (err) {
      setRegisterError('서버 오류');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-green-600">회원가입</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="아이디"
            className="border p-2 rounded"
            value={registerForm.username}
            onChange={e => setRegisterForm({ ...registerForm, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="border p-2 rounded"
            value={registerForm.password}
            onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="이메일"
            className="border p-2 rounded"
            value={registerForm.email}
            onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
            required
          />
          <button type="submit" className="bg-green-500 text-white rounded py-2 font-bold hover:bg-green-600">회원가입</button>
        </form>
        {registerError && (
          <div className="text-red-500 text-sm mb-2">{registerError}</div>
        )}
        <button
          className="mt-4 text-green-500 underline"
          onClick={() => navigate('/login')}
        >
          로그인으로 돌아가기
        </button>
      </div>
    </div>
  );
}