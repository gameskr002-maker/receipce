export default function HeroSection() {
  return (
    <section 
      className="relative overflow-hidden border-b border-[#1c1c1f]"
      style={{ width: '100%', position: 'relative' }}
    >
      {/* Subtle vignettes instead of heavy overlays */}
      <div className="absolute inset-0 bg-[#060606]/85 backdrop-blur-[1px]" />

      <div 
        style={{ 
          position: 'relative', 
          width: '100%', 
          padding: '56px 16px 80px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {/* Strictly Centered Text Block with max-width: 800px */}
        <div 
          style={{ 
            maxWidth: '800px', 
            width: '100%', 
            margin: '0 auto', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Faint technical subheader */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginBottom: '16px',
              justifyContent: 'center',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span 
              style={{ 
                fontSize: '9.5px', 
                fontWeight: 'bold', 
                letterSpacing: '0.2em', 
                color: '#52525b', 
                textTransform: 'uppercase', 
                fontFamily: "'JetBrains Mono', monospace" 
              }}
            >
              DATABASE V2 // STABLE
            </span>
          </div>

          {/* Large crisp typography with clean line-height and alignment */}
          <h2 
            style={{ 
              fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: 'clamp(28px, 4.5vw, 44px)',
              fontWeight: 800,
              color: '#f4f4f5',
              lineHeight: '1.25',
              textAlign: 'center',
              letterSpacing: '-0.03em',
              margin: '0 0 16px',
              width: '100%',
            }}
          >
            Мировая карта <span className="gold-text">крафта и вкуса</span>
          </h2>

          {/* Description text centered, constrained, and with relaxed line-height */}
          <p 
            style={{ 
              fontSize: 'clamp(13px, 1.8vw, 15px)',
              color: '#a1a1aa',
              lineHeight: '1.65',
              textAlign: 'center',
              fontWeight: 300,
              maxWidth: '620px',
              margin: '0 auto 32px',
              width: '100%',
            }}
          >
            Интерактивный реестр крафтовых рецептов со всего мира — от японского саке до славянского ставленного мёда. Полные спецификации, время варки и оригинальные Minecraft-ингредиенты.
          </p>

          {/* Clean minimal linear stats */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              justifyContent: 'center', 
              rowGap: '8px', 
              columnGap: '24px', 
              fontSize: '10.5px', 
              fontFamily: "'JetBrains Mono', monospace", 
              color: '#52525b', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em', 
              borderTop: '1px solid #121214', 
              paddingTop: '20px',
              width: '100%',
            }}
          >
            <div>
              <span style={{ color: '#a1a1aa', fontWeight: 600 }}>48</span> рецептов
            </div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1c1c1f' }} />
            <div>
              <span style={{ color: '#a1a1aa', fontWeight: 600 }}>15+</span> стран
            </div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1c1c1f' }} />
            <div>
              <span style={{ color: '#a1a1aa', fontWeight: 600 }}>50+</span> эффектов
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
