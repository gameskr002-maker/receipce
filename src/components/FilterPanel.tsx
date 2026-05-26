import { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

export interface FilterState {
  alcoholMin: number;
  alcoholMax: number;
  difficultyMin: number;
  difficultyMax: number;
  type: 'all' | 'alcoholic' | 'nonalcoholic';
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const DEFAULT_FILTERS: FilterState = {
  alcoholMin: 0,
  alcoholMax: 80,
  difficultyMin: 1,
  difficultyMax: 10,
  type: 'all',
};

function isActive(f: FilterState): boolean {
  return (
    f.type !== 'all' ||
    f.alcoholMin > 0 || f.alcoholMax < 80 ||
    f.difficultyMin > 1 || f.difficultyMax < 10
  );
}

const TYPE_OPTIONS: { value: FilterState['type']; label: string; emoji: string }[] = [
  { value: 'all',           label: 'Все напитки',    emoji: '🌍' },
  { value: 'alcoholic',     label: 'Алкогольные',    emoji: '🍷' },
  { value: 'nonalcoholic',  label: 'Безалкогольные', emoji: '🧃' },
];

export default function FilterPanel({ filters, onChange }: FilterPanelProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef   = useRef<HTMLButtonElement>(null);
  const active   = isActive(filters);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        btnRef.current   && !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const set = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });

  const activeCount = [
    filters.type !== 'all',
    filters.alcoholMin > 0 || filters.alcoholMax < 80,
    filters.difficultyMin > 1 || filters.difficultyMax < 10,
  ].filter(Boolean).length;

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className={`filter-toggle-btn${active ? ' active' : ''}`}
        aria-expanded={open}
      >
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Фильтры</span>
        {activeCount > 0 && (
          <span
            className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold"
            style={{ background: '#D4AF37', color: '#0d0d0d' }}
          >
            {activeCount}
          </span>
        )}
        <ChevronDown
          className="w-3 h-3 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          ref={panelRef}
          className="filter-panel absolute right-0 top-full mt-2 p-5 z-50 w-80"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#D4AF37]/70">
              Расширенные фильтры
            </span>
            {active && (
              <button
                onClick={() => onChange(DEFAULT_FILTERS)}
                className="text-[10px] text-[#6B6B6B] hover:text-[#A0A0A0] flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Сбросить
              </button>
            )}
          </div>

          {/* Type segmented */}
          <div className="mb-5">
            <label className="text-[11px] uppercase tracking-wider text-[#5a5a5a] font-semibold block mb-2">
              Тип напитка
            </label>
            <div className="seg-control w-full" style={{ display: 'flex', gap: '2px' }}>
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => set({ type: opt.value })}
                  className={`seg-btn flex-1 flex items-center justify-center gap-1${filters.type === opt.value ? ' active' : ''}`}
                  style={{ fontSize: '11px', padding: '6px 8px' }}
                >
                  <span>{opt.emoji}</span>
                  <span className="hidden sm:inline">{opt.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Alcohol range */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] uppercase tracking-wider text-[#5a5a5a] font-semibold">
                🔥 Крепость
              </label>
              <span className="text-[11px] font-mono text-[#D4AF37]">
                {filters.alcoholMin}% – {filters.alcoholMax}%
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#5a5a5a] w-8">От</span>
                <input
                  type="range"
                  min={0} max={80}
                  value={filters.alcoholMin}
                  onChange={(e) => {
                    const v = +e.target.value;
                    set({ alcoholMin: Math.min(v, filters.alcoholMax - 1) });
                  }}
                  style={{
                    background: `linear-gradient(to right, #D4AF37 ${(filters.alcoholMin/80)*100}%, rgba(255,255,255,0.08) ${(filters.alcoholMin/80)*100}%)`,
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#5a5a5a] w-8">До</span>
                <input
                  type="range"
                  min={0} max={80}
                  value={filters.alcoholMax}
                  onChange={(e) => {
                    const v = +e.target.value;
                    set({ alcoholMax: Math.max(v, filters.alcoholMin + 1) });
                  }}
                  style={{
                    background: `linear-gradient(to right, #D4AF37 ${(filters.alcoholMax/80)*100}%, rgba(255,255,255,0.08) ${(filters.alcoholMax/80)*100}%)`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Difficulty range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] uppercase tracking-wider text-[#5a5a5a] font-semibold">
                ⚗️ Сложность
              </label>
              <span className="text-[11px] font-mono text-[#D4AF37]">
                {filters.difficultyMin} – {filters.difficultyMax}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#5a5a5a] w-8">От</span>
                <input
                  type="range"
                  min={1} max={10}
                  value={filters.difficultyMin}
                  onChange={(e) => {
                    const v = +e.target.value;
                    set({ difficultyMin: Math.min(v, filters.difficultyMax - 1) });
                  }}
                  style={{
                    background: `linear-gradient(to right, #D4AF37 ${((filters.difficultyMin-1)/9)*100}%, rgba(255,255,255,0.08) ${((filters.difficultyMin-1)/9)*100}%)`,
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#5a5a5a] w-8">До</span>
                <input
                  type="range"
                  min={1} max={10}
                  value={filters.difficultyMax}
                  onChange={(e) => {
                    const v = +e.target.value;
                    set({ difficultyMax: Math.max(v, filters.difficultyMin + 1) });
                  }}
                  style={{
                    background: `linear-gradient(to right, #D4AF37 ${((filters.difficultyMax-1)/9)*100}%, rgba(255,255,255,0.08) ${((filters.difficultyMax-1)/9)*100}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { DEFAULT_FILTERS };
