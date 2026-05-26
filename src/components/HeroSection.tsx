import { Sparkles, Globe, FlaskConical } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/[0.08] border border-gold/20 mb-6">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">Крафтовые рецепты со всего мира</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="text-text-primary">Мировая карта </span>
            <span className="gold-gradient-text">крафта и вкуса</span>
          </h2>

          <p className="text-lg sm:text-xl text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
            Исследуйте уникальные рецепты напитков из разных уголков мира —
            от японского саке до украинского спотыкача
          </p>

          <div className="flex items-center justify-center gap-6 sm:gap-10 text-text-muted">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Globe className="w-5 h-5 text-gold/60" />
              </div>
              <span className="text-xs font-medium">15+ стран</span>
            </div>
            <div className="w-px h-10 bg-white/[0.06]" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-gold/60" />
              </div>
              <span className="text-xs font-medium">25 рецептов</span>
            </div>
            <div className="w-px h-10 bg-white/[0.06]" />
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gold/60" />
              </div>
              <span className="text-xs font-medium">50+ эффектов</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
