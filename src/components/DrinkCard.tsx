import { useState } from 'react';
import { ChevronDown, Flame, FlaskConical, Clock, Droplets, Sparkles } from 'lucide-react';
import type { Drink } from '../data/drinks';

interface DrinkCardProps {
  drink: Drink;
  index: number;
}

export default function DrinkCard({ drink, index }: DrinkCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const alcoholLabel = drink.alcohol > 0 ? `${drink.alcohol}%` : drink.alcohol < 0 ? 'Отрезв.' : '0%';

  const getAlcoholColor = (alc: number) => {
    if (alc <= 0) return 'text-emerald-400';
    if (alc <= 10) return 'text-yellow-400';
    if (alc <= 25) return 'text-orange-400';
    if (alc <= 45) return 'text-red-400';
    return 'text-red-500';
  };

  const getDifficultyColor = (diff: number) => {
    if (diff <= 3) return '#4ade80';
    if (diff <= 5) return '#facc15';
    if (diff <= 7) return '#f97316';
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

  return (
    <div
      className="card-glass rounded-2xl overflow-hidden transition-all duration-500 card-hover-glow group"
      style={{
        animationDelay: `${index * 60}ms`,
        animation: `fadeIn 0.5s ease-out ${index * 60}ms both`,
      }}
    >
      {/* Color accent line */}
      <div
        className="h-1 w-full opacity-70"
        style={{ background: `linear-gradient(90deg, transparent, ${drink.color}, transparent)` }}
      />

      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-tight mb-1.5 group-hover:text-gold transition-colors duration-300">
              {drink.name}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="tag-badge text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                <span className="text-sm">{drink.countryFlag}</span>
                {drink.country}
              </span>
              <span className="text-xs text-text-muted px-2 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                {drink.category}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center shrink-0">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold border border-white/[0.06]"
              style={{
                background: `linear-gradient(135deg, ${drink.color}15, ${drink.color}08)`,
                color: drink.color === '#FFFFFF' || drink.color === '#1C1C1C' ? '#D4AF37' : drink.color,
              }}
            >
              <Droplets className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Alcohol */}
          <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Flame className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Крепость</span>
            </div>
            <span className={`text-lg font-bold ${getAlcoholColor(drink.alcohol)}`}>
              {alcoholLabel}
            </span>
          </div>

          {/* Difficulty */}
          <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.04]">
            <div className="flex items-center gap-1.5 mb-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-[11px] uppercase tracking-wider text-text-muted font-medium">Сложность</span>
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
              <span className="text-[10px] text-text-muted">/10</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center gap-3 mb-4 text-xs text-text-secondary flex-wrap">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-text-muted" />
            <span>{drink.cookingTime} мин</span>
          </div>
          {drink.distillRuns > 0 && (
            <div className="flex items-center gap-1">
              <FlaskConical className="w-3 h-3 text-text-muted" />
              <span>{drink.distillRuns}x перег.</span>
            </div>
          )}
          {drink.age > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-text-muted">🪵</span>
              <span>{woodTypes[drink.wood] || 'Бочка'}, {drink.age} лет</span>
            </div>
          )}
        </div>

        {/* Lore */}
        <div className="mb-4 space-y-1">
          {drink.lore.map((line, i) => (
            <p key={i} className="text-sm text-text-secondary leading-relaxed italic">
              «{line}»
            </p>
          ))}
        </div>

        {/* Recipe toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
            bg-gold/[0.08] hover:bg-gold/[0.15] border border-gold/20 hover:border-gold/40
            text-gold text-sm font-medium transition-all duration-300 group/btn"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isOpen ? 'Скрыть рецепт' : 'Показать рецепт'}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Expandable recipe section */}
        {isOpen && (
          <div className="animate-slide-down mt-4 pt-4 border-t border-white/[0.06]">
            {/* Ingredients */}
            <div className="mb-4">
              <h4 className="text-xs uppercase tracking-wider text-gold/80 font-semibold mb-2.5 flex items-center gap-1.5">
                <span>📋</span> Ингредиенты
              </h4>
              <div className="space-y-1.5">
                {drink.ingredients.map((ing, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                  >
                    <span className="text-sm text-text-primary">{ing.name}</span>
                    <span className="text-sm font-mono text-gold font-medium">×{ing.amount}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Name variants */}
            <div className="mb-4">
              <h4 className="text-xs uppercase tracking-wider text-gold/80 font-semibold mb-2.5 flex items-center gap-1.5">
                <span>🏷️</span> Качество варки
              </h4>
              <div className="space-y-1">
                {drink.nameVariants.map((variant, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-red-400' : i === 1 ? 'bg-yellow-400' : 'bg-emerald-400'}`} />
                    <span className={i === 2 ? 'text-gold font-medium' : 'text-text-secondary'}>
                      {variant}
                    </span>
                    <span className="text-[10px] text-text-muted">
                      {i === 0 ? '(плохо)' : i === 1 ? '(хорошо)' : '(идеально)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Effects */}
            {drink.effects.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs uppercase tracking-wider text-gold/80 font-semibold mb-2.5 flex items-center gap-1.5">
                  <span>✨</span> Эффекты
                </h4>
                <div className="space-y-1.5">
                  {drink.effects.map((eff, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
                    >
                      <span className="text-sm text-text-primary">{eff.name}</span>
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <span className="font-mono">Ур.{eff.level}</span>
                        {eff.duration && <span className="font-mono">{eff.duration}с</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drink message */}
            <div className="mt-3 p-3 rounded-xl bg-gold/[0.05] border border-gold/10">
              <p className="text-sm text-gold/90 italic leading-relaxed">
                💬 {drink.drinkMessage}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
