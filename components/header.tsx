import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container flex justify-between items-center py-4">
        <h1 className="text-blue-800 font-bold text-xl">Kelompok 6</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="text-black hover:text-blue-800">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-black hover:text-blue-800">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
