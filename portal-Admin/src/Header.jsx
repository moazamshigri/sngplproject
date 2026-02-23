import logo from "./assets/logo.png";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center gap-4">
      <img src={logo} alt="Logo" className="h-10" />
      <h1 className="text-xl font-bold">SNGPL Admin Portal</h1>
    </header>
  );
}
