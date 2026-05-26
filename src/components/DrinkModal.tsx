import { useEffect, useCallback } from 'react';
import { X, Flame, FlaskConical, Clock, Sparkles, Droplets } from 'lucide-react';
import type { Drink } from '../data/drinks';

interface DrinkModalProps {
  drink: Drink;
  onClose: () => void;
}

const woodTypes: Record<number, string> = {
  0: 'Без бочки',
  1: '🌲 Берёза',
  2: '🪵 Дуб',
  3: '🌴 Джунглевое',
  4: '🌲 Ель',
  5: '🌿 Акация',
  6: '🪵 Тёмный дуб',
};

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

const getDifficultyLabel = (diff: number): string => {
  if (diff <= 2) return 'Новичок';
  if (diff <= 4) return 'Ученик';
  if (diff <= 6) return 'Мастер';
  if (diff <= 8) return 'Эксперт';
  return 'Легенда';
};

const getAlcoholLabel = (alc: number): string => {
  if (alc <= 0)  return 'Трезвость';
  if (alc <= 5)  return 'Лёгкое';
  if (alc <= 15) return 'Умеренное';
  if (alc <= 30) return 'Крепкое';
  if (alc <= 50) return 'Жёсткое';
  return 'Огненное';
};

export default function DrinkModal({ drink, onClose }: DrinkModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const alcoholLabel   = drink.alcohol > 0  ? `${drink.alcohol}%` : drink.alcohol < 0 ? 'Отрезв.' : '0%';
  const accentColor    = drink.color === '#FFFFFF' || drink.color === '#1C1C1C' ? '#D4AF37' : drink.color;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Рецепт: ${drink.name}`}
    >
      <div className="modal-glass">
        {/* Accent gradient top bar */}
        <div
          className="h-1.5 w-full rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${accentColor} 30%, ${accentColor}99 70%, transparent 100%)` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
          <div className="flex-1 min-w-0">
            {/* Country + Category */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="tag-badge text-xs font-medium px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                <span>{drink.countryFlag}</span>
                <span>{drink.country}</span>
              </span>
              <span className="text-xs text-[#5a5a5a] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
                {drink.category}
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-bold leading-tight mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: accentColor === '#D4AF37' ? '#F5F5F5' : accentColor,
                textShadow: `0 0 40px ${accentColor}33`,
              }}
            >
              {drink.name}
            </h2>
            {/* Lore */}
            <div className="mt-2 space-y-0.5">
              {drink.lore.map((line, i) => (
                <p key={i} className="text-sm text-[#7a7a7a] italic leading-relaxed">
                  «{line}»
                </p>
              ))}
            </div>
          </div>

          {/* Drink icon */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border"
              style={{
                background: `linear-gradient(135deg, ${accentColor}18, ${accentColor}08)`,
                borderColor: `${accentColor}30`,
                boxShadow: `0 0 20px ${accentColor}18`,
              }}
            >
              <Droplets className="w-7 h-7" style={{ color: accentColor }} />
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#5a5a5a] hover:text-[#F5F5F5] hover:bg-white/[0.07] transition-all duration-200"
              aria-label="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick meta */}
        <div className="flex items-center gap-3 px-6 pb-4 text-xs text-[#6B6B6B] flex-wrap">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{drink.cookingTime} мин варки</span>
          </div>
          {drink.distillRuns > 0 && (
            <div className="flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>{drink.distillRuns}× перегонка</span>
            </div>
          )}
          {drink.age > 0 && (
            <div className="flex items-center gap-1.5">
              <span>{woodTypes[drink.wood] || '🪵 Бочка'}</span>
              <span>· {drink.age} {getYearsLabel(drink.age)}</span>
            </div>
          )}
        </div>

        <div className="h-px bg-white/[0.06] mx-6" />

        {/* Stats: alcohol + difficulty */}
        <div className="grid grid-cols-2 gap-3 px-6 py-4">
          {/* Alcohol */}
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: `linear-gradient(135deg, ${getAlcoholColor(drink.alcohol)}08, transparent)`,
              borderColor: `${getAlcoholColor(drink.alcohol)}20`,
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <Flame className="w-3.5 h-3.5 text-[#6B6B6B]" />
              <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">Крепость</span>
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: getAlcoholColor(drink.alcohol) }}>
              {alcoholLabel}
            </div>
            <div className="stat-bar-track mb-1.5">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${Math.min((drink.alcohol / 80) * 100, 100)}%`,
                  background: `linear-gradient(90deg, ${getAlcoholColor(drink.alcohol)}66, ${getAlcoholColor(drink.alcohol)})`,
                }}
              />
            </div>
            <span className="text-[10px] font-semibold" style={{ color: getAlcoholColor(drink.alcohol) }}>
              {getAlcoholLabel(drink.alcohol)}
            </span>
          </div>

          {/* Difficulty */}
          <div
            className="rounded-2xl p-4 border"
            style={{
              background: `linear-gradient(135deg, ${getDifficultyColor(drink.difficulty)}08, transparent)`,
              borderColor: `${getDifficultyColor(drink.difficulty)}20`,
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <FlaskConical className="w-3.5 h-3.5 text-[#6B6B6B]" />
              <span className="text-[11px] uppercase tracking-wider text-[#6B6B6B] font-semibold">Сложность</span>
            </div>
            <div className="text-2xl font-bold mb-1" style={{ color: getDifficultyColor(drink.difficulty) }}>
              {drink.difficulty}<span className="text-sm text-[#5a5a5a] font-normal">/10</span>
            </div>
            <div className="stat-bar-track mb-1.5">
              <div
                className="stat-bar-fill"
                style={{
                  width: `${(drink.difficulty / 10) * 100}%`,
                  background: `linear-gradient(90deg, ${getDifficultyColor(drink.difficulty)}66, ${getDifficultyColor(drink.difficulty)})`,
                }}
              />
            </div>
            <span className="text-[10px] font-semibold" style={{ color: getDifficultyColor(drink.difficulty) }}>
              {getDifficultyLabel(drink.difficulty)}
            </span>
          </div>
        </div>

        <div className="h-px bg-white/[0.06] mx-6" />

        {/* Ingredients */}
        <div className="px-6 py-4">
          <h3 className="text-xs uppercase tracking-widest text-[#D4AF37]/70 font-bold mb-3 flex items-center gap-2">
            <span>📋</span> Ингредиенты
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {drink.ingredients.map((ing, i) => (
              <div key={i} className="ingredient-row">
                <span className="text-sm text-[#e0e0e0]">{ing.name}</span>
                <span
                  className="text-sm font-bold"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: accentColor }}
                >
                  ×{ing.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/[0.06] mx-6" />

        {/* Quality variants */}
        <div className="px-6 py-4">
          <h3 className="text-xs uppercase tracking-widest text-[#D4AF37]/70 font-bold mb-3 flex items-center gap-2">
            <span>🏷️</span> Качество варки
          </h3>
          <div className="flex flex-col gap-2">
            {drink.nameVariants.map((variant, i) => {
              const classes = i === 0 ? 'quality-bad' : i === 1 ? 'quality-good' : 'quality-perfect';
              const icons   = ['😶', '👍', '✨'];
              const labels  = ['Плохо', 'Хорошо', 'Идеально'];
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl"
                  style={{
                    background: i === 2 ? 'rgba(212,175,55,0.06)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${i === 2 ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)'}`,
                  }}
                >
                  <span className="text-base">{icons[i]}</span>
                  <span className={`text-sm flex-1 ${classes}`}>{variant}</span>
                  <span className="text-[10px] text-[#5a5a5a] font-semibold uppercase tracking-wider">{labels[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Effects — RPG style */}
        {drink.effects.length > 0 && (
          <>
            <div className="h-px bg-white/[0.06] mx-6" />
            <div className="px-6 py-4">
              <h3 className="text-xs uppercase tracking-widest text-[#D4AF37]/70 font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]/70" />
                Эффекты заклинания
              </h3>
              <div className="flex flex-col gap-2">
                {drink.effects.map((eff, i) => (
                  <div key={i} className="rpg-effect">
                    <span className="rpg-effect-name">{eff.name}</span>
                    <span className="rpg-level-badge">УР.{eff.level}</span>
                    {eff.duration && (
                      <span className="rpg-duration">{eff.duration}с</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Drink message */}
        <div className="mx-6 mb-6 mt-1 p-4 rounded-2xl" style={{ background: `linear-gradient(135deg, ${accentColor}08, rgba(255,255,255,0.02))`, border: `1px solid ${accentColor}18` }}>
          <p className="text-sm italic leading-relaxed" style={{ color: `${accentColor}cc` }}>
            💬 {drink.drinkMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

function getYearsLabel(n: number): string {
  const abs = Math.abs(n) % 100;
  const d = abs % 10;
  if (abs > 10 && abs < 20) return 'лет';
  if (d >= 2 && d <= 4) return 'года';
  if (d === 1) return 'год';
  return 'лет';
}
