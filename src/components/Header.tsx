import { Search, Wine, X } from 'lucide-react';
import { countries } from '../data/drinks';
import FilterPanel, { type FilterState, DEFAULT_FILTERS } from './FilterPanel';

interface HeaderProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function Header({
  selectedCountry,
  onCountryChange,
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
}: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.05]"
      style={{ background: 'rgba(13,13,13,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gold/[0.1] border border-gold/[0.2] flex items-center justify-center">
              <Wine className="w-5 h-5 text-gold" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-[#F5F5F5] leading-none tracking-tight">
                Крафт<span className="text-gold">&</span>Вкус
              </h1>
              <p className="text-[10px] text-[#5a5a5a] uppercase tracking-widest mt-0.5">
                Мировая карта напитков
              </p>
            </div>
          </div>

          {/* Search + Filters row */}
          <div className="flex-1 flex items-center gap-2 max-w-lg">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a5a5a] pointer-events-none" />
              <input
                type="text"
                placeholder="Поиск по ингредиентам, стране..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input w-full py-2.5 pl-10 pr-10 rounded-xl text-sm text-[#F5F5F5] placeholder:text-[#5a5a5a]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a5a5a] hover:text-[#F5F5F5] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter panel */}
            <FilterPanel filters={filters} onChange={onFiltersChange} />
          </div>
        </div>

        {/* Country filter pills — horizontally scrollable */}
        <div className="country-scroll flex items-center gap-1.5 pb-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          {countries.map((c) => (
            <button
              key={c.name}
              onClick={() => onCountryChange(c.name)}
              className={`filter-tag shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/[0.08] text-[#7a7a7a]${
                selectedCountry === c.name ? ' active' : ''
              }`}
            >
              <span className="text-sm">{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}

          {/* Reset country */}
          {selectedCountry !== 'Все' && (
            <button
              onClick={() => onCountryChange('Все')}
              className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] text-[#5a5a5a] hover:text-[#A0A0A0] border border-dashed border-white/[0.06] hover:border-white/[0.12] transition-all"
            >
              <X className="w-3 h-3" /> Сбросить
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

