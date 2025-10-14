import { Link } from "react-router-dom";

export default function Nav({ user, onLogout }) {
  return (
    <nav className="p-4 bg-green-600 text-white">
      <ul className="flex items-center gap-4">
        <li className="font-bold">
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <li className="ml-auto flex items-center gap-4">
            <span>환영합니다, {user.username}님!</span>
            <button onClick={onLogout} className="bg-white text-green-600 py-1 px-3 rounded font-bold hover:bg-gray-200">로그아웃</button>
          </li>
        ) : (
          <li className="ml-auto flex items-center gap-4">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
