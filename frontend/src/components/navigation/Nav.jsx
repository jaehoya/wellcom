import { Link } from "react-router-dom";


export default function Nav() {
  return (
    <nav className="p-4 bg-green-600 text-white">
      <ul className="flex gap-4">
        <li className="font-bold">
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
