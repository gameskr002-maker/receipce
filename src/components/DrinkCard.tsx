import { useState } from 'react';
import { Flame, FlaskConical, Clock, Droplets, Sparkles } from 'lucide-react';
import type { Drink } from '../data/drinks';
import DrinkModal from './DrinkModal';

interface DrinkCardProps {
  drink: Drink;
  index: number;
}

const getAlcoholColor = (alc: number): string => {
  if (alc <= 0)  return '#4ade80';
  if (alc <= 10) return '#facc15';
  if (alc <= 25) return '#fb923c';
  if (alc <= 45) return '#f87171';
  return '#ef4444';
};

const getDifficultyColor = (diff: number): string => {
  if (diff <= 3) return '#4ade80';
  if (diff <= 5) return '#facc15';
  if (diff <= 7) return '#fb923c';
  return '#ef4444';
};

const woodTypes: Record<number, string> = {
  0: 'Без бочки',
  1: 'Берёза',
  2: 'Дуб',
  3: 'Джунглевое',
  4: 'Ель',
  5: 'Акация',
  6: 'Тёмный дуб',
};

export default function DrinkCard({ drink, index }: DrinkCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const alcoholLabel = drink.alcohol > 0
    ? `${drink.alcohol}%`
    : drink.alcohol < 0
    ? 'Отрезв.'
    : '0%';

  const accentColor = drink.color === '#FFFFFF' || drink.color === '#1C1C1C'
    ? '#D4AF37'
    : drink.color;

  return (
    <>
      <div
        className="card-glass rounded-2xl overflow-hidden group cursor-pointer"
        style={{
          animationDelay: `${index * 55}ms`,
          animation: `fadeIn 0.5s ease-out ${index * 55}ms both`,
        }}
        onClick={() => setModalOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`Открыть рецепт: ${drink.name}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setModalOpen(true); }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${accentColor}44`;
          el.style.boxShadow = `0 0 0 1px ${accentColor}10, 0 0 32px ${accentColor}18, 0 14px 44px rgba(0,0,0,0.55)`;
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }}
      >
        {/* Accent top line */}
        <div
          className="h-[3px] w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5] leading-tight mb-1.5 transition-colors duration-300 group-hover:text-[#D4AF37]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {drink.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="tag-badge text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                  <span className="text-sm">{drink.countryFlag}</span>
                  {drink.country}
                </span>
                <span className="text-xs text-[#5a5a5a] px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                  {drink.category}
                </span>
              </div>
            </div>
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)`,
                borderColor: `${accentColor}28`,
              }}
            >
              <Droplets className="w-5 h-5" style={{ color: accentColor }} />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/[0.025] rounded-xl p-3 border border-white/[0.04]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Flame className="w-3.5 h-3.5 text-[#5a5a5a]" />
                <span className="text-[11px] uppercase tracking-wider text-[#5a5a5a] font-semibold">Крепость</span>
              </div>
              <span className="text-lg font-bold" style={{ color: getAlcoholColor(drink.alcohol) }}>
                {alcoholLabel}
              </span>
            </div>

            <div className="bg-white/[0.025] rounded-xl p-3 border border-white/[0.04]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-[#5a5a5a]" />
                <span className="text-[11px] uppercase tracking-wider text-[#5a5a5a] font-semibold">Сложность</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold" style={{ color: getDifficultyColor(drink.difficulty) }}>
                  {drink.difficulty}
                </span>
                <div className="flex-1">
                  <div className="progress-bar-bg rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(drink.difficulty / 10) * 100}%`,
                        background: `linear-gradient(90deg, ${getDifficultyColor(drink.difficulty)}88, ${getDifficultyColor(drink.difficulty)})`,
                      }}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-[#5a5a5a]">/10</span>
              </div>
            </div>
          </div>

          {/* Quick meta */}
          <div className="flex items-center gap-3 mb-4 text-xs text-[#6B6B6B] flex-wrap">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{drink.cookingTime} мин</span>
            </div>
            {drink.distillRuns > 0 && (
              <div className="flex items-center gap-1">
                <FlaskConical className="w-3 h-3" />
                <span>{drink.distillRuns}× перег.</span>
              </div>
            )}
            {drink.age > 0 && (
              <div className="flex items-center gap-1">
                <span>🪵</span>
                <span>{woodTypes[drink.wood] || 'Бочка'}, {drink.age} л.</span>
              </div>
            )}
          </div>

          {/* Lore preview (1 line) */}
          <div className="mb-4">
            <p className="text-sm text-[#7a7a7a] italic leading-relaxed line-clamp-2">
              «{drink.lore[0]}»
            </p>
          </div>

          {/* CTA button */}
          <button
            onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
              border transition-all duration-300 group/btn"
            style={{
              background: `${accentColor}0d`,
              borderColor: `${accentColor}30`,
              color: accentColor,
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = `${accentColor}22`;
              b.style.borderColor = `${accentColor}55`;
              b.style.boxShadow = `0 0 14px ${accentColor}20`;
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.background = `${accentColor}0d`;
              b.style.borderColor = `${accentColor}30`;
              b.style.boxShadow = '';
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">Показать рецепт</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <DrinkModal drink={drink} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
