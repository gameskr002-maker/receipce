import { Search, Wine, X } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[#1c1c1f] w-full"
      style={{ background: 'rgba(6, 6, 6, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded bg-gold/[0.06] border border-gold/[0.18] flex items-center justify-center">
              <Wine className="w-4 h-4 text-gold" />
            </div>
            <div>
              <h1 className="text-xs font-extrabold text-[#f4f4f5] tracking-[0.15em] uppercase font-mono">
                Крафт<span className="text-gold">//</span>Вкус
              </h1>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 flex items-center gap-2 max-w-sm">
            <div className="flex-1 relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#52525b] pointer-events-none" />
              <input
                type="text"
                placeholder="Поиск рецепта..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input w-full py-1.5 pl-8 pr-8 rounded border border-[#1c1c1f] text-xs text-[#f4f4f5] placeholder:text-[#52525b]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#52525b] hover:text-[#f4f4f5] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
