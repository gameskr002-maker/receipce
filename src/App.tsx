import { useState, useMemo } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DrinkCard from './components/DrinkCard';
import Footer from './components/Footer';
import { drinks } from './data/drinks';
import { SlidersHorizontal, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';

type SortOption = 'default' | 'alcohol-asc' | 'alcohol-desc' | 'difficulty-asc' | 'difficulty-desc';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const filteredDrinks = useMemo(() => {
    let result = [...drinks];

    // Country filter
    if (selectedCountry !== 'Все') {
      result = result.filter((d) => d.country === selectedCountry);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((d) => {
        const searchableText = [
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
        return searchableText.includes(q);
      });
    }

    // Sort
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
  }, [selectedCountry, searchQuery, sortBy]);

  const sortOptions: { value: SortOption; label: string; icon: typeof ArrowUpDown }[] = [
    { value: 'default', label: 'По умолчанию', icon: ArrowUpDown },
    { value: 'alcohol-desc', label: 'Крепость ↓', icon: TrendingDown },
    { value: 'alcohol-asc', label: 'Крепость ↑', icon: TrendingUp },
    { value: 'difficulty-desc', label: 'Сложность ↓', icon: TrendingDown },
    { value: 'difficulty-asc', label: 'Сложность ↑', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header
        selectedCountry={selectedCountry}
        onCountryChange={setSelectedCountry}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <HeroSection />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
              {selectedCountry === 'Все' ? 'Все напитки' : `Напитки: ${selectedCountry}`}
            </h3>
            <p className="text-sm text-text-muted mt-1">
              Найдено: {filteredDrinks.length} {getRussianPlural(filteredDrinks.length, 'рецепт', 'рецепта', 'рецептов')}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-text-muted" />
            <div className="flex gap-1.5 flex-wrap">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    sortBy === opt.value
                      ? 'bg-gold/[0.15] border-gold/30 text-gold'
                      : 'bg-white/[0.03] border-white/[0.06] text-text-muted hover:text-text-secondary hover:border-white/[0.12]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filteredDrinks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {filteredDrinks.map((drink, index) => (
              <DrinkCard key={drink.id} drink={drink} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🍂</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Ничего не найдено</h3>
            <p className="text-text-muted text-sm">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
          </div>
        )}
      </main>

      <Footer />
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
