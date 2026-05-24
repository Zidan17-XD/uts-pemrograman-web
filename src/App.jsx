// App.jsx
// Komponen utama — menyatukan semua komponen
// Menggunakan: useState, Conditional Rendering (tab switching)

import { useState } from "react"
import Navbar          from "./components/Navbar"
import HeroBanner      from "./components/HeroBanner"
import FilterBar       from "./components/FilterBar"
import Counter         from "./components/Counter"
import TrendingSection from "./components/TrendingSection"
import DataList        from "./components/DataList"

function App() {
  // useState: query pencarian yang diketik
  const [searchQuery, setSearchQuery]   = useState("")
  // useState: query yang sudah disubmit (aktif difilter)
  const [activeSearch, setActiveSearch] = useState("")
  // useState: genre yang dipilih
  const [selectedGenre, setSelectedGenre] = useState("All")
  // useState: tahun yang dipilih
  const [selectedYear, setSelectedYear]   = useState("All")
  // useState: tab aktif — 'trending' atau 'api'
  const [activeTab, setActiveTab]         = useState("trending")

  const handleSearch = (e) => {
    e?.preventDefault()
    setActiveSearch(searchQuery)
  }

  return (
    <div className="min-h-screen bg-gray-950">

      {/* SEMANTIC: header */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* SEMANTIC: main */}
      <main>
        <HeroBanner />

        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          onSearch={handleSearch}
        />

        <Counter />

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="flex gap-2 border-b border-gray-800">
            {[
              { id: "trending", label: "🔥 Trending Film" },
              { id: "api",      label: "📡 Data API (Axios)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-red-500 text-red-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Conditional Rendering: tampilkan konten sesuai tab aktif */}
        {activeTab === "trending" ? (
          <TrendingSection
            searchQuery={activeSearch}
            selectedGenre={selectedGenre}
            selectedYear={selectedYear}
          />
        ) : (
          <DataList searchQuery={activeSearch} />
        )}
      </main>

      {/* SEMANTIC: footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8" aria-label="Footer">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white font-black text-lg mb-1">
            Movie<span className="text-red-500">Flix</span>
          </p>
          <p className="text-gray-600 text-xs">
            © 2026 MovieFlix • React + Tailwind CSS + Axios • UTS Pemrograman Web ST084
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App