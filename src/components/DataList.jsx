// DataList.jsx
// Komponen: Mengambil dan menampilkan data dari Public API menggunakan Axios
// Menggunakan: useState, useEffect, Axios, LoadingIndicator, Conditional Rendering

import { useState, useEffect } from "react"
import axios from "axios"
import LoadingIndicator from "./LoadingIndicator"

function DataList({ searchQuery }) {
  // useState: menyimpan data hasil fetch dari API
  const [posts, setPosts] = useState([])
  // useState: status loading
  const [loading, setLoading] = useState(true)
  // useState: pesan error jika fetch gagal
  const [error, setError] = useState(null)
  // useState: halaman pagination
  const [page, setPage] = useState(1)

  // Reset halaman saat query pencarian berubah
  useEffect(() => {
    setPage(1)
  }, [searchQuery])

  // useEffect: fetch data setiap kali nilai `page` atau `searchQuery` berubah
  useEffect(() => {
    setLoading(true)
    setError(null)

    const query = `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}${searchQuery ? `&title_like=${encodeURIComponent(searchQuery)}` : ""
      }`

    axios
      .get(query)
      .then((res) => {
        setPosts(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError("Gagal memuat data. Periksa koneksi internet.")
        setLoading(false)
      })
  }, [page, searchQuery])

  return (
    <section
      aria-labelledby="api-heading"
      className="max-w-7xl mx-auto px-4 pb-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          id="api-heading"
          className="text-white text-xl font-black"
        >
          📡 Data dari API (JSONPlaceholder)
        </h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full border border-gray-700">
          via Axios • Halaman {page}
        </span>
      </div>

      {/* Conditional Rendering: tampilkan loading */}
      {loading && <LoadingIndicator message="Memuat data dari JSONPlaceholder..." />}

      {/* Conditional Rendering: tampilkan error */}
      {!loading && error && (
        <div role="alert" className="bg-red-950 border border-red-800 rounded-xl p-6 text-center">
          <p className="text-red-400 font-semibold">⚠️ {error}</p>
          <button
            onClick={() => setPage(page)}
            className="mt-3 text-sm text-red-300 underline hover:text-white"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Conditional Rendering: tampilkan data jika berhasil */}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-lg font-semibold">Tidak ada hasil untuk "{searchQuery}"</p>
          <p className="text-sm mt-1">Coba kata kunci lain atau hapus pencarian</p>
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-900 border border-gray-800 hover:border-red-500/50 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:shadow-red-900/10 group"
                aria-label={`Ulasan: ${post.title}`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white text-xs font-black flex-shrink-0 group-hover:scale-110 transition-transform">
                    {post.id}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm capitalize leading-snug mb-1 line-clamp-2 group-hover:text-red-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2">{post.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-gray-700"
            >
              ← Sebelumnya
            </button>
            <span className="px-4 py-2 text-sm text-gray-400">{page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white transition-all border border-gray-700"
            >
              Berikutnya →
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default DataList