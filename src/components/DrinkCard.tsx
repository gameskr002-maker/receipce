import { useState } from 'react';
import type { Drink } from '../data/drinks';
import DrinkModal from './DrinkModal';
import { useInView } from '../utils/useInView';

interface Props {
  drink: Drink;
  index: number;
}

export default function DrinkCard({ drink, index }: Props) {
  const [open, setOpen] = useState(false);
  const { ref, inView } = useInView();

  const accent = drink.color === '#F0F0F0' || drink.color === '#C8E8F0' || drink.color === '#2C2C2C'
    ? '#D4AF37'
    : drink.color;

  const alcLabel = drink.alcohol > 0 ? `${drink.alcohol}%` : drink.alcohol < 0 ? 'Отрезв.' : '0%';
  const delay = (index % 3) * 60; // stagger reveal

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
    <>
      <div
        ref={ref}
        className={`card reveal${inView ? ' visible' : ''}`}
        style={{
          transitionDelay: `${delay}ms`,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
        onClick={() => setOpen(true)}
        tabIndex={0}
        role="button"
        aria-label={`Открыть рецепт: ${drink.name}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setOpen(true);
        }}
      >
        <div>
          {/* Top row with Title and Flag */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyBetween: 'space-between', gap: '8px' }}>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--text-1)',
                lineHeight: 1.3,
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--text-1)')}
            >
              {drink.name}
            </h3>
            <span style={{ fontSize: '16px', flexShrink: 0 }} title={drink.country}>
              {drink.countryFlag}
            </span>
          </div>

          {/* Minimalist Monospace Technical Specs */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10.5px',
              color: 'var(--text-3)',
              marginTop: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ color: drink.alcohol > 0 ? '#ef4444' : '#22c55e' }}>ABV {alcLabel}</span>
            <span>•</span>
            <span>DIFF {drink.difficulty}/10</span>
            <span>•</span>
            <span>{drink.cookingTime}M</span>
            {drink.distillRuns > 0 && (
              <>
                <span>•</span>
                <span>{drink.distillRuns}× DISTILL</span>
              </>
            )}
          </div>

          {/* Lore/Description in Grok style */}
          <p
            style={{
              fontSize: '12px',
              color: 'var(--text-2)',
              marginTop: '10px',
              lineHeight: 1.45,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontStyle: 'italic',
            }}
          >
            «{drink.lore[0]}»
          </p>
        </div>

        {/* Bottom row: Ingredients preview + Elegant Action link */}
        <div style={{ marginTop: '16px', borderTop: '1px solid #121214', paddingTop: '12px' }}>
          {/* Ingredients list */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflow: 'hidden' }}>
              {drink.ingredients.slice(0, 4).map((ing, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: '#121214',
                    border: '1px solid #1c1c1f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={`${ing.name} x${ing.amount}`}
                >
                  <img
                    src={ing.iconUrl}
                    alt={ing.name}
                    className="mc-icon"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, ing.id)}
                  />
                </div>
              ))}
              {drink.ingredients.length > 4 && (
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px',
                    color: 'var(--text-3)',
                    marginLeft: '2px',
                  }}
                >
                  +{drink.ingredients.length - 4}
                </span>
              )}
            </div>

            {/* Premium tech link */}
            <span
              style={{
                fontSize: '11px',
                fontWeight: 500,
                fontFamily: "'JetBrains Mono', monospace",
                color: accent,
                display: 'flex',
                alignItems: 'center',
                gap: '2px',
                transition: 'opacity 0.15s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              РЕЦЕПТ →
            </span>
          </div>
        </div>
      </div>

      {open && <DrinkModal drink={drink} onClose={() => setOpen(false)} />}
    </>
  );
}
