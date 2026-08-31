/* A4 — Markalı skeleton loader: rota geçişlerinde ve ilk yüklemede görünür */
export default function Loading() {
  return (
    <div className="min-h-[80vh] bg-white" aria-busy="true" aria-label="Sayfa yükleniyor">
      <div className="container-x animate-pulse pt-32">
        {/* hero iskeleti */}
        <div className="h-6 w-28 rounded-full bg-ink-200" />
        <div className="mt-6 h-10 w-3/4 max-w-xl rounded-xl bg-ink-200" />
        <div className="mt-3 h-10 w-1/2 max-w-md rounded-xl bg-ink-200" />
        <div className="mt-6 h-4 w-2/3 max-w-lg rounded bg-ink-100" />
        <div className="mt-2 h-4 w-1/2 max-w-md rounded bg-ink-100" />

        {/* kart iskeleti */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 4, 5, 6].map((i) => (
            <div key={i} className="card h-56 rounded-2xl bg-ink-100/70" />
          ))}
        </div>
      </div>
    </div>
  );
}