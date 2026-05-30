import { useCallback, useEffect } from 'react';
import { X, Flame, FlaskConical, Clock, Sparkles } from 'lucide-react';
import type { Drink } from '../data/drinks';

interface Props {
  drink: Drink;
  onClose: () => void;
}

const woodLabels: Record<number, string> = {
  0: 'Без бочки',
  1: 'Берёза 🌲',
  2: 'Дуб 🪵',
  3: 'Тропик 🌴',
  4: 'Ель 🌲',
  5: 'Акация 🌿',
  6: 'Тёмный дуб 🪵',
  7: 'Багровое',
  8: 'Искаженное',
  9: 'Мангровое',
};

function alcColor(a: number) {
  if (a <= 0) return '#4ade80';
  if (a <= 10) return '#facc15';
  if (a <= 30) return '#fb923c';
  if (a <= 55) return '#f87171';
  return '#ef4444';
}
function diffColor(d: number) {
  if (d <= 3) return '#4ade80';
  if (d <= 5) return '#facc15';
  if (d <= 7) return '#fb923c';
  return '#ef4444';
}
function diffLabel(d: number) {
  if (d <= 2) return 'Новичок';
  if (d <= 4) return 'Ученик';
  if (d <= 6) return 'Мастер';
  if (d <= 8) return 'Эксперт';
  return 'Легенда';
}

export default function DrinkModal({ drink, onClose }: Props) {
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onKey]);

  const accent = drink.color === '#F0F0F0' || drink.color === '#C8E8F0' || drink.color === '#2C2C2C'
    ? '#D4AF37'
    : drink.color;

  const alcLabel = drink.alcohol > 0 ? `${drink.alcohol}%` : drink.alcohol < 0 ? 'Отрезв.' : '0%';

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, ingId: string) => {
    const img = e.currentTarget;
    const stage = parseInt(img.dataset.stage || '0', 10);

    const itemMap: Record<string, string> = {
      WHEAT: 'wheat',
      SUGAR: 'sugar',
      COCOA_BEANS: 'cocoa_beans',
      SWEET_BERRIES: 'sweet_berries',
      PUMPKIN: 'pumpkin',
      GLOW_BERRIES: 'glow_berries',
      APPLE: 'apple',
      COAL: 'coal',
      SUGAR_CANE: 'sugar_cane',
      POTATO: 'potato',
      CACTUS: 'cactus',
      SHORT_GRASS: 'grass',
      POISONOUS_POTATO: 'poisonous_potato',
      BAMBOO: 'bamboo',
      OAK_LOG: 'oak_log',
      MELON_SLICE: 'melon_slice',
      SPIDER_EYE: 'spider_eye',
      OAK_LEAVES: 'oak_leaves',
      SUNFLOWER: 'sunflower',
      BLAZE_POWDER: 'blaze_powder',
      NETHER_WART: 'nether_wart',
      QUARTZ: 'quartz',
      DARK_OAK_LOG: 'dark_oak_log',
      GOLD_NUGGET: 'gold_nugget',
      FEATHER: 'feather',
      MILK_BUCKET: 'milk_bucket',
      SNOWBALL: 'snowball',
      OAK_DOOR: 'oak_door',
      FERMENTED_SPIDER_EYE: 'fermented_spider_eye',
      ROTTEN_FLESH: 'rotten_flesh',
      MAGMA_CREAM: 'magma_cream',
    };

    const mapped = itemMap[ingId] || ingId.toLowerCase();

    if (stage === 0) {
      img.dataset.stage = '1';
      img.src = `https://cdn.jsdelivr.net/gh/misode/mcmeta@assets/assets/minecraft/textures/item/${mapped}.png`;
    } else if (stage === 1) {
      img.dataset.stage = '2';
      img.src = `https://cdn.jsdelivr.net/gh/misode/mcmeta@assets/assets/minecraft/textures/block/${mapped}.png`;
    } else {
      img.style.display = 'none';
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Рецепт: ${drink.name}`}
    >
      <div className="modal-box">
        {/* Accent stripe */}
        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        {/* Header */}
        <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap', marginBottom: 6 }}>
              <span className="tag">{drink.countryFlag} {drink.country}</span>
              <span className="tag-plain">{drink.category}</span>
              {drink.glint && <span className="tag-plain">✨ Светится</span>}
            </div>
            {/* Name */}
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)' }}>
              {drink.name}
            </h2>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Закрыть"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-3)',
              padding: 4,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            <X size={16} />
          </button>
        </div>

        {/* Lore */}
        <div style={{ padding: '0 20px 12px' }}>
          {drink.lore.map((l, i) => (
            <p key={i} style={{ fontSize: 12.5, color: 'var(--text-2)', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 4 }}>
              «{l}»
            </p>
          ))}
        </div>

        {/* Monospace Specs Bar */}
        <div
          style={{
            padding: '0 20px 14px',
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--text-3)',
          }}
        >
          <div>ВАРКА: {drink.cookingTime}М</div>
          {drink.distillRuns > 0 && <div>• ПЕРЕГОНКА: {drink.distillRuns}×</div>}
          {drink.age > 0 && (
            <div>
              • {woodLabels[drink.wood]?.toUpperCase() || 'БОЧКА'} · {drink.age} ЛЕТ
            </div>
          )}
        </div>

        <div className="divider" />

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '14px 20px' }}>
          {/* Alcohol */}
          <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.015)', border: '1px solid #121214' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <Flame size={11} color="var(--text-3)" />
              <span style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', fontWeight: 600 }}>Крепость</span>
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: alcColor(drink.alcohol), marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>
              {alcLabel}
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${Math.min((Math.abs(drink.alcohol) / 80) * 100, 100)}%`,
                  background: alcColor(drink.alcohol),
                }}
              />
            </div>
          </div>

          {/* Difficulty */}
          <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.015)', border: '1px solid #121214' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <FlaskConical size={11} color="var(--text-3)" />
              <span style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-3)', fontWeight: 600 }}>Сложность</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: diffColor(drink.difficulty), fontFamily: "'JetBrains Mono', monospace" }}>
                {drink.difficulty}
              </span>
              <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: "'JetBrains Mono', monospace" }}>
                /10 · {diffLabel(drink.difficulty).toUpperCase()}
              </span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(drink.difficulty / 10) * 100}%`,
                  background: diffColor(drink.difficulty),
                }}
              />
            </div>
          </div>
        </div>

        <div className="divider" />

        {/* Ingredients */}
        <div style={{ padding: '14px 20px' }}>
          <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: 700, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
            РЕЦЕПТУРА
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 6 }}>
            {drink.ingredients.map((ing, i) => (
              <div key={i} className="ing-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
                  <img
                    src={ing.iconUrl}
                    alt={ing.name}
                    className="mc-icon"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, ing.id)}
                  />
                  <span style={{ fontSize: 12.5, color: 'var(--text-1)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {ing.name}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: accent,
                  }}
                >
                  ×{ing.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Quality variants */}
        <div style={{ padding: '14px 20px' }}>
          <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: 700, marginBottom: 8, fontFamily: "'JetBrains Mono', monospace" }}>
            РЕЗУЛЬТАТ ВАРКИ
          </h3>
          {[
            { label: 'ПЛОХО', icon: '😶', name: drink.nameBad, cls: 'quality-bad' },
            { label: 'ХОРОШО', icon: '👍', name: drink.nameNormal, cls: 'quality-normal' },
            { label: 'ИДЕАЛЬНО', icon: '✨', name: drink.name, cls: 'quality-perfect' },
          ].map((q, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 8px',
                borderRadius: 6,
                marginBottom: 4,
                background: i === 2 ? 'rgba(212,175,55,0.025)' : 'rgba(255,255,255,0.008)',
                border: `1px solid ${i === 2 ? 'rgba(212,175,55,0.1)' : '#121214'}`,
              }}
            >
              <span style={{ fontSize: 13 }}>{q.icon}</span>
              <span className={q.cls} style={{ flex: 1, fontSize: 12.5, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {q.name || '—'}
              </span>
              <span style={{ fontSize: 9, color: 'var(--text-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: "'JetBrains Mono', monospace" }}>
                {q.label}
              </span>
            </div>
          ))}
        </div>

        {/* Effects */}
        {drink.effects.length > 0 && (
          <>
            <div className="divider" />
            <div style={{ padding: '14px 20px' }}>
              <h3 style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold)', fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono', monospace" }}>
                ЭФФЕКТЫ ПРИЕМКИ
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {drink.effects.map((eff, i) => (
                  <div key={i} className="rpg-row" style={{ padding: '5px 8px', borderRadius: 6 }}>
                    <span style={{ fontSize: 12.5, color: 'var(--text-1)', flex: 1 }}>{eff.name}</span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        padding: '1.5px 5px',
                        borderRadius: 4,
                        background: 'rgba(212,175,55,0.06)',
                        border: '1px solid rgba(212,175,55,0.15)',
                        color: 'var(--gold)',
                        fontWeight: 600,
                      }}
                    >
                      УР.{eff.level}
                    </span>
                    {eff.duration && (
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: 'var(--text-3)' }}>
                        {eff.duration}с
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Drink message */}
        <div style={{ margin: '0 20px 20px', padding: '10px 12px', borderRadius: 8, background: `${accent}04`, border: `1px solid ${accent}0e` }}>
          <p style={{ fontSize: 12.5, fontStyle: 'italic', color: `${accent}bb`, lineHeight: 1.5 }}>
            💬 {drink.drinkMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
