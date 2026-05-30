import { Wine, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      style={{ 
        borderTop: '1px solid #1c1c1f', 
        marginTop: '80px', 
        width: '100%',
        background: '#060606',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div 
        style={{ 
          padding: '64px 0 40px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '48px' 
        }}
      >
        {/* Main Columns Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '40px' 
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '6px', 
                  background: 'rgba(212, 175, 55, 0.05)', 
                  border: '1px solid rgba(212, 175, 55, 0.18)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <Wine className="w-4 h-4 text-gold" />
              </div>
              <span 
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px', 
                  fontWeight: 'bold', 
                  letterSpacing: '0.1em',
                  color: '#f4f4f5', 
                  textTransform: 'uppercase' 
                }}
              >
                Крафт<span className="text-gold">//</span>Вкус
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: '1.65', fontWeight: 300 }}>
              Интерактивный реестр крафтовых напитков со всего мира. Рецепты, ингредиенты и уникальные эффекты в ультра-минималистичном исполнении.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              style={{ 
                fontSize: '10px', 
                fontWeight: 600, 
                letterSpacing: '0.12em', 
                color: '#52525b', 
                textTransform: 'uppercase', 
                marginBottom: '16px', 
                fontFamily: "'JetBrains Mono', monospace" 
              }}
            >
              Навигация
            </h4>
            <ul 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px', 
                listStyle: 'none', 
                padding: 0, 
                margin: 0 
              }}
            >
              <li>
                <a 
                  href="#" 
                  style={{ fontSize: '12px', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#a1a1aa')}
                >
                  Все напитки
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ fontSize: '12px', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#a1a1aa')}
                >
                  Сортировка по крепости
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ fontSize: '12px', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#a1a1aa')}
                >
                  Сортировка по сложности
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 
              style={{ 
                fontSize: '10px', 
                fontWeight: 600, 
                letterSpacing: '0.12em', 
                color: '#52525b', 
                textTransform: 'uppercase', 
                marginBottom: '16px', 
                fontFamily: "'JetBrains Mono', monospace" 
              }}
            >
              Категории
            </h4>
            <ul 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px', 
                listStyle: 'none', 
                padding: 0, 
                margin: 0 
              }}
            >
              <li>
                <a 
                  href="#" 
                  style={{ fontSize: '12px', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#a1a1aa')}
                >
                  🍺 Пиво & Сидр
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ fontSize: '12px', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#a1a1aa')}
                >
                  🍷 Вино & Медовуха
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ fontSize: '12px', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#a1a1aa')}
                >
                  🥃 Крепкий алкоголь
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  style={{ fontSize: '12px', color: '#a1a1aa', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#d4af37')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#a1a1aa')}
                >
                  🥤 Безалкогольные
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Spacious Copyright / Legal Bottom Bar */}
        <div 
          style={{ 
            borderTop: '1px solid #121214', 
            paddingTop: '24px', 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            gap: '16px' 
          }}
        >
          <div 
            style={{ 
              fontSize: '11px', 
              color: '#52525b', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontFamily: "'JetBrains Mono', monospace"
            }}
          >
            © 2026 КРАФТ//ВКУС. СДЕЛАНО С <Heart className="w-3 h-3 text-red-500/50" /> ДЛЯ ЦЕНИТЕЛЕЙ.
          </div>
          <div 
            style={{ 
              fontSize: '11px', 
              color: '#52525b',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.04em'
            }}
          >
            ДЛЯ ИГРОВОГО ИСПОЛЬЗОВАНИЯ // BREWERY
          </div>
        </div>
      </div>
    </footer>
  );
}
