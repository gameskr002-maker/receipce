import { useState, useMemo, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DrinkCard from './components/DrinkCard';
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';
import { drinks, countries } from './data/drinks';

type SortOption = 'default' | 'alcohol-asc' | 'alcohol-desc' | 'difficulty-asc' | 'difficulty-desc';

const ALL_CATEGORIES = ['Пиво', 'Вино', 'Виски', 'Водка', 'Ром', 'Ликёр', 'Коктейль', 'Безалкогольное', 'Тематическое', 'Мировое', 'Опасное', 'Другое'];

const CATEGORIES_WITH_EMOJIS = [
  { id: 'Пиво', label: 'Пиво', emoji: '🍺' },
  { id: 'Вино', label: 'Вино', emoji: '🍷' },
  { id: 'Виски', label: 'Виски', emoji: '🥃' },
  { id: 'Водка', label: 'Водка', emoji: '🍸' },
  { id: 'Ром', label: 'Ром', emoji: '🏴‍☠️' },
  { id: 'Ликёр', label: 'Ликёр', emoji: '🍯' },
  { id: 'Коктейль', label: 'Коктейль', emoji: '🍹' },
  { id: 'Безалкогольное', label: 'Безалкогольное', emoji: '🧃' },
  { id: 'Тематическое', label: 'Тематическое', emoji: '🔮' },
  { id: 'Мировое', label: 'Мировое', emoji: '🗺️' },
  { id: 'Опасное', label: 'Опасное', emoji: '💀' },
  { id: 'Другое', label: 'Другое', emoji: '🍾' },
];

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState('Все');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(ALL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [alcoholFilter, setAlcoholFilter] = useState<'all' | 'alcoholic' | 'nonalcoholic'>('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 100% Reliable Document Click-Outside Handler (No invisible overlays, zero z-index conflicts!)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsFiltersOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredDrinks = useMemo(() => {
    let result = [...drinks];

    // 1. Country filter
    if (selectedCountry !== 'Все') {
      result = result.filter((d) => d.country === selectedCountry);
    }

    // 2. Category filter (multi-select checklist)
    if (selectedCategories.length < ALL_CATEGORIES.length) {
      result = result.filter((d) => selectedCategories.includes(d.category));
    }

    // 3. Alcohol toggle filter
    if (alcoholFilter === 'alcoholic') {
      result = result.filter((d) => d.alcohol > 0);
    } else if (alcoholFilter === 'nonalcoholic') {
      result = result.filter((d) => d.alcohol <= 0);
    }

    // 4. Advanced text search strictly by names, lore (description), and effects
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((d) => {
        const matchesName =
          d.name.toLowerCase().includes(q) ||
          d.nameBad.toLowerCase().includes(q) ||
          d.nameNormal.toLowerCase().includes(q);

        const matchesLore = d.lore.some((line) => line.toLowerCase().includes(q));

        const matchesEffects = d.effects.some((eff) => eff.name.toLowerCase().includes(q));

        return matchesName || matchesLore || matchesEffects;
      });
    }

    // 5. Sort
    switch (sortBy) {
      case 'alcohol-asc':
        result.sort((a, b) => a.alcohol - b.alcohol);
        break;
      case 'alcohol-desc':
        result.sort((a, b) => b.alcohol - a.alcohol);
        break;
      case 'difficulty-asc':
        result.sort((a, b) => a.difficulty - b.difficulty);
        break;
      case 'difficulty-desc':
        result.sort((a, b) => b.difficulty - a.difficulty);
        break;
    }

    return result;
  }, [selectedCountry, selectedCategories, alcoholFilter, searchQuery, sortBy]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'По умолчанию' },
    { value: 'alcohol-desc', label: 'Крепость ↓' },
    { value: 'alcohol-asc', label: 'Крепость ↑' },
    { value: 'difficulty-desc', label: 'Сложность ↓' },
    { value: 'difficulty-asc', label: 'Сложность ↑' },
  ];

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCountry !== 'Все') {
      count += 1;
    }
    if (selectedCategories.length < ALL_CATEGORIES.length) {
      count += (ALL_CATEGORIES.length - selectedCategories.length);
    }
    if (alcoholFilter !== 'all') {
      count += 1;
    }
    if (sortBy !== 'default') {
      count += 1;
    }
    return count;
  }, [selectedCountry, selectedCategories, alcoholFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#060606] text-[#ececec] relative overflow-hidden">
      {/* Calm, dynamic hardware-accelerated CSS animated background */}
      <AnimatedBackground />

      {/* Main Centered Content Wrapper (1280px maximum width) */}
      <div 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 16px',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
        className="min-h-screen w-full"
      >
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <HeroSection />

        {/* Main content container */}
        <main className="py-8 sm:py-12 w-full flex-1 relative">
          
          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {selectedCountry === 'Все'
                  ? selectedCategories.length === ALL_CATEGORIES.length
                    ? 'Все напитки'
                    : 'Выбранные категории'
                  : selectedCategories.length === ALL_CATEGORIES.length
                  ? `Страна: ${selectedCountry}`
                  : `${selectedCountry}: категории`}
              </h3>
              <p className="text-sm text-[#5a5a5a] mt-1 font-mono text-xs uppercase tracking-wider">
                Найдено:{' '}
                <span className="text-[#D4AF37] font-semibold">{filteredDrinks.length}</span>{' '}
                {getRussianPlural(filteredDrinks.length, 'рецепт', 'рецепта', 'рецептов')}
              </p>
            </div>

            {/* Controls (All compressed in a single unified Filters dropdown) */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto z-50">
              
              {/* Premium Multi-Select Filters Button */}
              <div className="relative">
                <button
                  ref={buttonRef}
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className={`filter-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isFiltersOpen || activeFiltersCount > 0
                      ? 'bg-gold/[0.12] border-gold/40 text-gold'
                      : 'bg-[#121212] border-white/[0.06] text-[#7a7a7a] hover:text-[#A0A0A0]'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  <span>🎛️</span>
                  <span>Фильтры & Сортировка</span>
                  {activeFiltersCount > 0 && (
                    <span className="count-badge ml-1 bg-gold text-[#0a0a0a] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {isFiltersOpen && (
                  /* Dropdown panel with high z-[999] layer priority and pointer-events-auto */
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 p-5 w-80 rounded-2xl border bg-[#0b0b0d]/95 border-gold/15 shadow-2xl backdrop-blur-xl z-[999] pointer-events-auto transition-all duration-200"
                    style={{ 
                      boxShadow: '0 10px 40px rgba(0,0,0,0.9)',
                      maxHeight: '75vh',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}
                  >
                    {/* SECTION 1: SORTING */}
                    <div>
                      <span className="text-[9.5px] uppercase tracking-wider text-[#52525b] font-bold block mb-3 font-mono">Сортировка</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {sortOptions.map((opt) => {
                          const isSelected = sortBy === opt.value;
                          return (
                            <label
                              key={opt.value}
                              className="cursor-pointer block w-full relative z-10 flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/[0.02] transition-colors text-xs text-[#ececec] font-medium"
                            >
                              <input 
                                type="radio" 
                                name="sortOption"
                                value={opt.value}
                                checked={isSelected}
                                onChange={() => setSortBy(opt.value)}
                                className="sr-only"
                              />
                              <span style={{ color: isSelected ? 'var(--gold)' : '#a1a1aa' }}>{opt.label}</span>
                              {/* Custom Minimalist Radio button (Visual representation) */}
                              <div 
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '50%',
                                  border: isSelected ? '1px solid var(--gold)' : '1px solid #27272a',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.15s ease',
                                  background: isSelected ? 'rgba(212, 175, 55, 0.04)' : 'transparent',
                                }}
                              >
                                {isSelected && (
                                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }} />
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />

                    {/* SECTION 2: COUNTRY SELECT */}
                    <div>
                      <span className="text-[9.5px] uppercase tracking-wider text-[#52525b] font-bold block mb-3 font-mono">Страна / Мир</span>
                      <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className="w-full bg-[#121214] border border-[#27272a] rounded-lg px-2.5 py-1.5 text-xs text-[#ececec] outline-none focus:border-gold/30 font-medium uppercase font-mono cursor-pointer"
                      >
                        <option value="Все">🌍 ВСЕ СТРАНЫ</option>
                        {countries.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.flag} {c.name.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />

                    {/* SECTION 3: CATEGORIES CHECKLIST */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9.5px] uppercase tracking-wider text-[#52525b] font-bold font-mono">Категории</span>
                        <div className="flex gap-1.5">
                          <button 
                            onClick={() => setSelectedCategories(ALL_CATEGORIES)}
                            className="text-[9px] text-gold hover:underline font-medium font-mono cursor-pointer bg-transparent border-none p-0"
                          >
                            ВСЕ
                          </button>
                          <span className="text-[9px] text-[#52525b] font-mono">|</span>
                          <button 
                            onClick={() => setSelectedCategories([])}
                            className="text-[9px] text-[#52525b] hover:text-[#A0A0A0] hover:underline font-medium font-mono cursor-pointer bg-transparent border-none p-0"
                          >
                            СБРОС
                          </button>
                        </div>
                      </div>

                      <div 
                        className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-thin"
                        style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
                      >
                        {CATEGORIES_WITH_EMOJIS.map((c) => {
                          const isChecked = selectedCategories.includes(c.id);
                          return (
                            <label 
                              key={c.id} 
                              className="cursor-pointer block w-full relative z-10 flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-white/[0.02] transition-colors text-[11px] text-[#ececec] font-medium"
                            >
                              <input 
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    setSelectedCategories(selectedCategories.filter(x => x !== c.id));
                                  } else {
                                    setSelectedCategories([...selectedCategories, c.id]);
                                  }
                                }}
                                className="sr-only"
                              />
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{c.emoji}</span>
                                <span>{c.label}</span>
                              </div>
                              {/* Custom Minimalist Checkbox (Visual representation) */}
                              <div 
                                style={{
                                  width: '14px',
                                  height: '14px',
                                  borderRadius: '3px',
                                  border: isChecked ? '1px solid var(--gold)' : '1px solid #27272a',
                                  background: isChecked ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {isChecked && (
                                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }} />
                                )}
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)' }} />

                    {/* SECTION 4: ALCOHOL TOGGLE */}
                    <div>
                      <span className="text-[9.5px] uppercase tracking-wider text-[#52525b] font-bold block mb-3 font-mono">Крепость</span>
                      <div className="grid grid-cols-2 gap-1 bg-[#121214] border border-[#27272a] p-1 rounded-xl">
                        <button
                          onClick={() => setAlcoholFilter(alcoholFilter === 'alcoholic' ? 'all' : 'alcoholic')}
                          className={`py-1.5 rounded-lg text-[9px] font-semibold border transition-all text-center cursor-pointer ${
                            alcoholFilter === 'alcoholic'
                              ? 'bg-gold/[0.12] border-gold/30 text-gold'
                              : 'border-transparent text-[#7a7a7a] hover:text-[#ececec]'
                          }`}
                        >
                          🍷 АЛКОГОЛЬНЫЕ
                        </button>
                        <button
                          onClick={() => setAlcoholFilter(alcoholFilter === 'nonalcoholic' ? 'all' : 'nonalcoholic')}
                          className={`py-1.5 rounded-lg text-[9px] font-semibold border transition-all text-center cursor-pointer ${
                            alcoholFilter === 'nonalcoholic'
                              ? 'bg-gold/[0.12] border-gold/30 text-gold'
                              : 'border-transparent text-[#7a7a7a] hover:text-[#ececec]'
                          }`}
                        >
                          🧃 БЕЗАЛКОГОЛЬНЫЕ
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cards grid */}
          {filteredDrinks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {filteredDrinks.map((drink, index) => (
                <DrinkCard key={drink.id} drink={drink} index={index} />
              ))}
            </div>
          ) : (
            /* Empty state container (monolithic, strictly centered via Flexbox) */
            <div 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '64px 24px',
                border: '1px dashed rgba(255, 255, 255, 0.04)',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.005)',
                maxWidth: '480px',
                margin: '32px auto 0',
                width: '100%'
              }}
            >
              <div style={{ fontSize: '40px', marginBottom: '16px' }}>🍂</div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#f4f4f5', marginBottom: '8px' }}>
                Ничего не найдено
              </h3>
              <p style={{ fontSize: '12px', color: '#52525b', lineHeight: '1.6', maxWidth: '340px', margin: '0 auto 24px' }}>
                Попробуйте изменить категории в меню фильтров, сбросить фильтр по странам или изменить поисковый запрос (например, введя название или нужный эффект).
              </p>
              <button
                onClick={() => {
                  setSelectedCountry('Все');
                  setSelectedCategories(ALL_CATEGORIES);
                  setSearchQuery('');
                  setAlcoholFilter('all');
                  setSortBy('default');
                }}
                style={{
                  marginTop: '12px',
                  cursor: 'pointer',
                  fontFamily: "'JetBrains Mono', monospace"
                }}
                className="px-4 py-2 rounded-lg bg-gold/[0.08] border border-gold/25 text-gold text-xs font-semibold hover:bg-gold/[0.15] transition-all duration-150"
              >
                СБРОСИТЬ ВСЕ ФИЛЬТРЫ
              </button>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

function getRussianPlural(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n) % 100;
  const lastDigit = abs % 10;
  if (abs > 10 && abs < 20) return many;
  if (lastDigit > 1 && lastDigit < 5) return few;
  if (lastDigit === 1) return one;
  return many;
}
