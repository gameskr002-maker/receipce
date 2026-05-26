import { Wine, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Wine className="w-4 h-4 text-gold" />
              </div>
              <span className="font-bold text-text-primary">
                Крафт<span className="text-gold">&</span>Вкус
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Интерактивное меню крафтовых напитков со всего мира. Рецепты, ингредиенты и уникальные эффекты.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3">Навигация</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-text-secondary hover:text-gold transition-colors">Все напитки</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-gold transition-colors">По странам</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-gold transition-colors">По крепости</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-text-muted font-semibold mb-3">Категории</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-text-secondary hover:text-gold transition-colors">🍺 Пиво & Сидр</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-gold transition-colors">🍷 Вино & Медовуха</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-gold transition-colors">🥃 Крепкие напитки</a></li>
              <li><a href="#" className="text-sm text-text-secondary hover:text-gold transition-colors">🥤 Безалкогольные</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted flex items-center gap-1">
            © 2026 Крафт&Вкус. Сделано с <Heart className="w-3 h-3 text-red-400/60" /> для ценителей.
          </p>
          <p className="text-xs text-text-muted">
            Все рецепты предназначены для игрового использования
          </p>
        </div>
      </div>
    </footer>
  );
}
