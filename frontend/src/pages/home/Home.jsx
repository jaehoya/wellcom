import { Navigate, useNavigate } from "react-router-dom";

import Nav from "../../components/navigation/Nav";

export default function Home({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // 로그아웃 시 로그인 페이지로 이동
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow w-80 text-center">
        <h2 className="text-xl font-bold mb-4 text-green-600">홈</h2>
        {user ? (
          <>
            <p className="mb-4">환영합니다, {user.username}님!</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white rounded py-2 font-bold hover:bg-red-600"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <p className="mb-4">로그인이 필요합니다.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-green-500 text-white rounded py-2 font-bold hover:bg-green-600"
            >
              로그인
            </button>
          </>
        )}
      </div>
    </div>
  );
}