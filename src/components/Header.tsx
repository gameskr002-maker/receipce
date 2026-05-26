import { Search, Wine, X } from 'lucide-react';
import { countries } from '../data/drinks';

interface HeaderProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  selectedCountry,
  onCountryChange,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <Wine className="w-5 h-5 text-gold" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-text-primary leading-none">
                Крафт<span className="text-gold">&</span>Вкус
              </h1>
              <p className="text-[10px] text-text-muted uppercase tracking-widest mt-0.5">
                Мировая карта напитков
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Поиск по ингредиентам, названию..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input w-full py-2.5 pl-10 pr-10 rounded-xl text-sm text-text-primary placeholder:text-text-muted"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Country filters */}
        <div className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {countries.map((c) => (
            <button
              key={c.name}
              onClick={() => onCountryChange(c.name)}
              className={`filter-tag shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-white/[0.08] text-text-secondary ${
                selectedCountry === c.name ? 'active' : ''
              }`}
            >
              <span className="text-sm">{c.flag}</span>
              <span className="hidden sm:inline">{c.name}</span>
              <span className="sm:hidden">{c.name === 'Все' ? c.name : ''}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
