import { House, CircleUserRound, MonitorPlay } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-slate-100 p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <House size={24} />
        <Link to="/" className="text-xl font-bold text-gray-800">Acan Film</Link>
      </div>
      <nav className="flex">
        <ul className="flex gap-6">
          <li className="flex items-center gap-2">
            <MonitorPlay size={20} />
            <Link to="/film" className="text-gray-600 hover:text-gray-800">Film</Link>
          </li>
          <li className="flex items-center gap-2">
            <CircleUserRound size={20} />
            <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}