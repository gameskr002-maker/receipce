import { useState, useMemo } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DrinkCard from './components/DrinkCard';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import { DEFAULT_FILTERS, type FilterState } from './components/FilterPanel';
import { drinks } from './data/drinks';
import { SlidersHorizontal, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';

type SortOption = 'default' | 'alcohol-asc' | 'alcohol-desc' | 'difficulty-asc' | 'difficulty-desc';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState('Все');
  const [searchQuery, setSearchQuery]         = useState('');
  const [sortBy, setSortBy]                   = useState<SortOption>('default');
  const [filters, setFilters]                 = useState<FilterState>(DEFAULT_FILTERS);

  const filteredDrinks = useMemo(() => {
    let result = [...drinks];

    // 1. Country filter
    if (selectedCountry !== 'Все') {
      result = result.filter((d) => d.country === selectedCountry);
    }

    // 2. Type filter (alcoholic / non-alcoholic)
    if (filters.type === 'alcoholic') {
      result = result.filter((d) => d.alcohol > 0);
    } else if (filters.type === 'nonalcoholic') {
      result = result.filter((d) => d.alcohol <= 0);
    }

    // 3. Alcohol range
    result = result.filter(
      (d) => d.alcohol >= filters.alcoholMin && d.alcohol <= filters.alcoholMax,
    );

    // 4. Difficulty range
    result = result.filter(
      (d) => d.difficulty >= filters.difficultyMin && d.difficulty <= filters.difficultyMax,
    );

    // 5. Text search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((d) => {
        const text = [
          d.name,
          ...d.nameVariants,
          d.country,
          d.category,
          ...d.ingredients.map((i) => i.name),
          ...d.lore,
          ...d.effects.map((e) => e.name),
        ]
          .join(' ')
          .toLowerCase();
        return text.includes(q);
      });
    }

    // 6. Sort
    switch (sortBy) {
      case 'alcohol-asc':    result.sort((a, b) => a.alcohol    - b.alcohol);    break;
      case 'alcohol-desc':   result.sort((a, b) => b.alcohol    - a.alcohol);    break;
      case 'difficulty-asc': result.sort((a, b) => a.difficulty - b.difficulty); break;
      case 'difficulty-desc':result.sort((a, b) => b.difficulty - a.difficulty); break;
    }

    return result;
  }, [selectedCountry, searchQuery, sortBy, filters]);

  const sortOptions: { value: SortOption; label: string; icon: typeof ArrowUpDown }[] = [
    { value: 'default',        label: 'По умолчанию', icon: ArrowUpDown },
    { value: 'alcohol-desc',   label: 'Крепость ↓',   icon: TrendingDown },
    { value: 'alcohol-asc',    label: 'Крепость ↑',   icon: TrendingUp },
    { value: 'difficulty-desc',label: 'Сложность ↓',  icon: TrendingDown },
    { value: 'difficulty-asc', label: 'Сложность ↑',  icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] relative">
      {/* Animated particle background */}
      <ParticleBackground />

      {/* All content above particles */}
      <div className="relative z-10">
        <Header
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
        />

        <HeroSection />

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F5F5]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {selectedCountry === 'Все' ? 'Все напитки' : `Напитки: ${selectedCountry}`}
              </h3>
              <p className="text-sm text-[#5a5a5a] mt-1">
                Найдено:{' '}
                <span className="text-[#D4AF37] font-semibold">{filteredDrinks.length}</span>{' '}
                {getRussianPlural(filteredDrinks.length, 'рецепт', 'рецепта', 'рецептов')}
              </p>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-[#5a5a5a]" />
              <div className="flex gap-1.5 flex-wrap">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                      sortBy === opt.value
                        ? 'bg-gold/[0.15] border-gold/30 text-gold'
                        : 'bg-white/[0.03] border-white/[0.06] text-[#5a5a5a] hover:text-[#A0A0A0] hover:border-white/[0.1]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
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
            <div className="text-center py-24">
              <div className="text-7xl mb-5">🍂</div>
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-2">Ничего не найдено</h3>
              <p className="text-[#5a5a5a] text-sm mb-6">
                Попробуйте изменить фильтры или поисковый запрос
              </p>
              <button
                onClick={() => {
                  setSelectedCountry('Все');
                  setSearchQuery('');
                  setFilters(DEFAULT_FILTERS);
                }}
                className="px-5 py-2.5 rounded-xl bg-gold/[0.1] border border-gold/25 text-gold text-sm font-semibold hover:bg-gold/[0.18] transition-all duration-200"
              >
                Сбросить все фильтры
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
