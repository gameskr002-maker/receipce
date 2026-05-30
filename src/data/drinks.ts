// ─── Типы ────────────────────────────────────────────────────────────────────

export interface Ingredient {
  id: string;       // внутренний ID (WHEAT, SUGAR_CANE, ...)
  name: string;     // Отображаемое имя
  amount: number;
  iconUrl: string;  // URL иконки с Minecraft Wiki
}

export interface Effect {
  name: string;
  level: string;
  duration: string;
}

export type DrinkCategory =
  | 'Пиво'
  | 'Вино'
  | 'Виски'
  | 'Водка'
  | 'Ром'
  | 'Ликёр'
  | 'Коктейль'
  | 'Безалкогольное'
  | 'Тематическое'
  | 'Мировое'
  | 'Опасное'
  | 'Другое';

export interface Drink {
  id: string;
  name: string;           // лучшее качество (good)
  nameBad: string;        // плохое качество
  nameNormal: string;     // среднее качество
  country: string;
  countryFlag: string;
  ingredients: Ingredient[];
  cookingTime: number;
  distillRuns: number;
  wood: number;
  age: number;
  color: string;          // hex-цвет для акцента
  difficulty: number;
  alcohol: number;
  lore: string[];
  drinkMessage: string;
  effects: Effect[];
  category: DrinkCategory;
  glint?: boolean;
}

// ─── Иконки MC Wiki ───────────────────────────────────────────────────────────

const WIKI_BASE = 'https://minecraft.wiki/images/Invicon_';

// Маппинг material ID → имя файла на Minecraft Wiki
const ICON_MAP: Record<string, string> = {
  WHEAT:                'Wheat.png',
  SUGAR:                'Sugar.png',
  COCOA_BEANS:          'Cocoa_Beans.png',
  SWEET_BERRIES:        'Sweet_Berries.png',
  PUMPKIN:              'Pumpkin.png',
  GLOW_BERRIES:         'Glow_Berries.png',
  APPLE:                'Apple.png',
  COAL:                 'Coal.png',
  SUGAR_CANE:           'Sugar_Cane.png',
  POTATO:               'Potato.png',
  CACTUS:               'Cactus.png',
  SHORT_GRASS:          'Short_Grass.png',
  POISONOUS_POTATO:     'Poisonous_Potato.png',
  BAMBOO:               'Bamboo.png',
  OAK_LOG:              'Oak_Log.png',
  MELON_SLICE:          'Melon_Slice.png',
  SPIDER_EYE:           'Spider_Eye.png',
  OAK_LEAVES:           'Oak_Leaves.png',
  SUNFLOWER:            'Sunflower.png',
  BLAZE_POWDER:         'Blaze_Powder.png',
  NETHER_WART:          'Nether_Wart.png',
  QUARTZ:               'Quartz.png',
  DARK_OAK_LOG:         'Dark_Oak_Log.png',
  GOLD_NUGGET:          'Gold_Nugget.png',
  FEATHER:              'Feather.png',
  MILK_BUCKET:          'Milk_Bucket.png',
  SNOWBALL:             'Snowball.png',
  OAK_DOOR:             'Oak_Door.png',
  FERMENTED_SPIDER_EYE: 'Fermented_Spider_Eye.png',
  ROTTEN_FLESH:         'Rotten_Flesh.png',
  MAGMA_CREAM:          'Magma_Cream.png',
};

// Отображаемые имена ингредиентов
const DISPLAY_NAMES: Record<string, string> = {
  WHEAT:                'Пшеница',
  SUGAR:                'Сахар',
  COCOA_BEANS:          'Какао-бобы',
  SWEET_BERRIES:        'Сладкие ягоды',
  PUMPKIN:              'Тыква',
  GLOW_BERRIES:         'Светящиеся ягоды',
  APPLE:                'Яблоки',
  COAL:                 'Уголь',
  SUGAR_CANE:           'Тростник',
  POTATO:               'Картофель',
  CACTUS:               'Кактус',
  SHORT_GRASS:          'Трава (Short Grass)',
  POISONOUS_POTATO:     'Ядовитый картофель',
  BAMBOO:               'Бамбук',
  OAK_LOG:              'Дубовое бревно',
  MELON_SLICE:          'Ломтик дыни',
  SPIDER_EYE:           'Паучий глаз',
  OAK_LEAVES:           'Дубовые листья',
  SUNFLOWER:            'Подсолнух',
  BLAZE_POWDER:         'Огненный порошок',
  NETHER_WART:          'Адский нарост',
  QUARTZ:               'Кварц',
  DARK_OAK_LOG:         'Бревно тёмного дуба',
  GOLD_NUGGET:          'Золотой самородок',
  FEATHER:              'Перо',
  MILK_BUCKET:          'Ведро молока',
  SNOWBALL:             'Снежок',
  FERMENTED_SPIDER_EYE: 'Сгнивший паучий глаз',
  ROTTEN_FLESH:         'Гнилая плоть',
  MAGMA_CREAM:          'Магмовый крем',
  // Кастомный предмет из custom-items.yml
  rasp:                 'Малинка (кастом)',
};

function ingIcon(id: string): string {
  const file = ICON_MAP[id];
  return file ? `${WIKI_BASE}${file}` : `${WIKI_BASE}Barrier.png`;
}

function ing(raw: string): Ingredient {
  const [id, amountStr] = raw.split('/');
  return {
    id,
    name: DISPLAY_NAMES[id] ?? id,
    amount: parseInt(amountStr, 10),
    iconUrl: ingIcon(id),
  };
}

// ─── Эффекты ──────────────────────────────────────────────────────────────────

const EFFECT_NAMES: Record<string, string> = {
  SATURATION:       '🍖 Насыщение',
  DAMAGE_RESISTANCE:'🛡️ Сопротивление урону',
  LUCK:             '🍀 Удача',
  REGENERATION:     '💚 Регенерация',
  FIRE_RESISTANCE:  '🔥 Огнестойкость',
  WATER_BREATHING:  '🌊 Подводное дыхание',
  SPEED:            '⚡ Скорость',
  INCREASE_DAMAGE:  '⚔️ Сила',
  NAUSEA:           '🌀 Тошнота',
  NIGHT_VISION:     '👁️ Ночное зрение',
  LEVITATION:       '🎈 Левитация',
  DOLPHINS_GRACE:   '🐬 Грация дельфина',
  JUMP:             '🦘 Прыгучесть',
  SLOWNESS:         '🐌 Замедление',
  HASTE:            '⛏️ Спешка',
  WEAKNESS:         '😩 Слабость',
  HERO_OF_THE_VILLAGE: '🏅 Герой деревни',
  SLOW_FALLING:     '🪂 Плавное падение',
  POISON:           '🧪 Отравление',
  BLINDNESS:        '🕶️ Слепота',
  HEAL:             '❤️ Лечение',
  INVISIBILITY:     '👻 Невидимость',
};

function parseEffect(raw: string): Effect {
  const [id, level = '1', duration = ''] = raw.split('/');
  return {
    name: EFFECT_NAMES[id] ?? id,
    level,
    duration,
  };
}

// ─── Цвета по типу Brewery ────────────────────────────────────────────────────

const BREW_COLORS: Record<string, string> = {
  YELLOW:       '#F4D03F',
  ORANGE:       '#E67E22',
  RED:          '#E74C3C',
  DARK_RED:     '#8B0000',
  WHITE:        '#F0F0F0',
  BLACK:        '#2C2C2C',
  LIME:         '#7CFC00',
  GREEN:        '#228B22',
  CYAN:         '#00CED1',
  WATER:        '#87CEEB',
  BLUE:         '#3498DB',
  PURPLE:       '#8B008B',
  PINK:         '#FF69B4',
  BRIGHT_RED:   '#FF2400',
  BRIGHT_GREY:  '#BEBEBE',
  OLIVE:        '#808000',
  TEAL:         '#008080',
};

function brewColor(c: string): string {
  return BREW_COLORS[c] ?? (c.startsWith('#') ? c : '#D4AF37');
}

// ─── Страны ──────────────────────────────────────────────────────────────────

function parseName(nameStr: string): [string, string, string] {
  const parts = nameStr.replace(/&[0-9a-fA-F#{}]+/g, '').split('/');
  return [parts[0]?.trim() ?? '', parts[1]?.trim() ?? '', parts[2]?.trim() ?? ''];
}

// ─── Напитки ─────────────────────────────────────────────────────────────────

export const drinks: Drink[] = [
  // ══════════════════════════════════════
  //  ПИВО
  // ══════════════════════════════════════
  {
    id: 'wheatbeer',
    ...(() => { const [b,n,g] = parseName('Прокисшее пиво/Пшеничное нефильтрованное/Баварское Оригинальное'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Германия', countryFlag: '🇩🇪',
    ingredients: ['WHEAT/5','SUGAR/1'].map(ing),
    cookingTime: 8, distillRuns: 0, wood: 1, age: 2,
    color: brewColor('YELLOW'), difficulty: 2, alcohol: 5,
    lore: ['Классический немецкий вайсбир.', 'Плотная белая пена и лёгкий аромат банана.'],
    drinkMessage: 'Прохладное нефильтрованное приятно освежает горло.',
    effects: ['SATURATION/1/10-20','HASTE/1/20-40'].map(parseEffect),
    category: 'Пиво',
  },
  {
    id: 'beer',
    ...(() => { const [b,n,g] = parseName('Сивуха из таверны/Светлый Лагер/Премиальный Пильзнер'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Чехия', countryFlag: '🇨🇿',
    ingredients: ['WHEAT/8'].map(ing),
    cookingTime: 8, distillRuns: 0, wood: 2, age: 3,
    color: brewColor('YELLOW'), difficulty: 2, alcohol: 6,
    lore: ['Тот самый «жидкий хлеб».', 'Рецепт, проверенный веками и дворфами.'],
    drinkMessage: 'Вы делаете глубокий глоток классического светлого.',
    effects: ['SATURATION/1/10-20','HASTE/1/20-50','REGENERATION/1/5-15'].map(parseEffect),
    category: 'Пиво',
  },
  {
    id: 'darkbeer',
    ...(() => { const [b,n,g] = parseName('Чёрная жижа/Бархатный Портер/Ирландский Стаут (Guinness)'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Ирландия', countryFlag: '🇮🇪',
    ingredients: ['WHEAT/10','COCOA_BEANS/2'].map(ing),
    cookingTime: 9, distillRuns: 0, wood: 6, age: 6,
    color: brewColor('BLACK'), difficulty: 4, alcohol: 7,
    lore: ['Кусочек Дублина прямо в вашей кружке.', 'Плотный, как нефть, с кофейным послевкусием.'],
    drinkMessage: 'Горьковатый, плотный стаут приятно согревает.',
    effects: ['DAMAGE_RESISTANCE/1/20-60','SATURATION/1/15-30','HASTE/1/30-60'].map(parseEffect),
    category: 'Пиво',
  },
  {
    id: 'dwarven_stout',
    ...(() => { const [b,n,g] = parseName('Горный отстой/Дворфийский Тёмный Стаут/Горное Золото Дворфов'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Фэнтези', countryFlag: '⛏️',
    ingredients: ['WHEAT/12','COCOA_BEANS/4','GOLD_NUGGET/2','COAL/1'].map(ing),
    cookingTime: 12, distillRuns: 0, wood: 6, age: 8,
    color: brewColor('BLACK'), difficulty: 5, alcohol: 9,
    lore: ['Варится глубоко под горой, при свете лавы.', 'Каждый глоток — как удар кирки в вашу душу.'],
    drinkMessage: 'Горное золото дворфов прибавляет вам упрямства и силы!',
    effects: ['DAMAGE_RESISTANCE/1-2/60-180','HASTE/2/120-300','INCREASE_DAMAGE/1/60'].map(parseEffect),
    category: 'Тематическое',
  },
  {
    id: 'pumpkin_ale',
    ...(() => { const [b,n,g] = parseName('Тыквенная каша/Тыквенный Эль/Хэллоуинский Тыквенный Эль'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Сезонное', countryFlag: '🎃',
    ingredients: ['PUMPKIN/8','WHEAT/6','BLAZE_POWDER/1','SUGAR/2'].map(ing),
    cookingTime: 10, distillRuns: 0, wood: 2, age: 3,
    color: brewColor('ORANGE'), difficulty: 4, alcohol: 6,
    lore: ['Осенний эль с тыквой и пряностями.', 'Корица, мускат, тыква — вкус осени в каждом глотке.'],
    drinkMessage: 'Уютный вкус осени согревает вас изнутри...',
    effects: ['SATURATION/1/20-40','FIRE_RESISTANCE/1/30-60','NIGHT_VISION/1/60'].map(parseEffect),
    category: 'Тематическое',
  },

  // ══════════════════════════════════════
  //  ВИНО
  // ══════════════════════════════════════
  {
    id: 'wine',
    ...(() => { const [b,n,g] = parseName('Бормотуха/Сухое Красное/Изысканное Бордо 2012'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Франция', countryFlag: '🇫🇷',
    ingredients: ['SWEET_BERRIES/15','SUGAR/2'].map(ing),
    cookingTime: 6, distillRuns: 0, wood: 2, age: 20,
    color: brewColor('RED'), difficulty: 5, alcohol: 12,
    lore: ['Французская романтика в стекле.', 'Требует долгих лет томления в дубовой бочке.', 'Идеальный баланс танинов и спелых ягод.'],
    drinkMessage: 'Вы изящно делаете глоток вина, чувствуя себя аристократом.',
    effects: ['LUCK/1-2/60-180','SLOW_FALLING/1/0-30'].map(parseEffect),
    category: 'Вино',
  },
  {
    id: 'raspberry_mead',
    ...(() => { const [b,n,g] = parseName('Малиновый квас/Малиновое вино/Дворфийский Малиновый Мёд'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Украина', countryFlag: '🇺🇦',
    ingredients: [{ id: 'rasp', name: DISPLAY_NAMES['rasp'], amount: 6, iconUrl: `${WIKI_BASE}Sweet_Berries.png` }, ...['SUGAR/2'].map(ing)],
    cookingTime: 6, distillRuns: 0, wood: 2, age: 4,
    color: brewColor('RED'), difficulty: 3, alcohol: 11,
    lore: ['Сладкий хмельной напиток из лесной малины.', 'Обладает мягким ягодным вкусом и согревающим эффектом.'],
    drinkMessage: 'Сладкий вкус спелой малины приятно дурманит голову.',
    effects: ['REGENERATION/1/30-60','HEAL/1/0','LUCK/1/30-90'].map(parseEffect),
    category: 'Вино',
  },
  {
    id: 'mead',
    ...(() => { const [b,n,g] = parseName('Бражка/Славянский Мёд/Ставленный Мёд Диких Пчёл'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Украина', countryFlag: '🇺🇦',
    ingredients: ['PUMPKIN/2','GLOW_BERRIES/4','SWEET_BERRIES/4'].map(ing),
    cookingTime: 5, distillRuns: 0, wood: 2, age: 5,
    color: brewColor('ORANGE'), difficulty: 3, alcohol: 14,
    lore: ['«И я там был, мёд-пиво пил...»', 'Сварено на основе чистейших медовых сот.'],
    drinkMessage: 'Тягучий сладкий нектар наполняет вас силой предков.',
    effects: ['REGENERATION/1/20-40','INCREASE_DAMAGE/1/20-60','SATURATION/1/10-20'].map(parseEffect),
    category: 'Вино',
  },
  {
    id: 'elven_wine',
    ...(() => { const [b,n,g] = parseName('Лесная роса/Эльфийское Лунное Вино/Вино Сияющего Леса'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Фэнтези', countryFlag: '🧝',
    ingredients: ['OAK_LEAVES/6','GLOW_BERRIES/8','SWEET_BERRIES/6','SUNFLOWER/2'].map(ing),
    cookingTime: 8, distillRuns: 0, wood: 1, age: 30,
    color: brewColor('LIME'), difficulty: 8, alcohol: 8,
    lore: ['Создано из самих звёздных лучей, преломлённых сквозь листву.', 'Пьётся только в полнолуние, под шелест листьев древнего леса.'],
    drinkMessage: 'Лунный свет струится по вашим венам. Лес зовёт вас...',
    effects: ['NIGHT_VISION/1/180-600','SLOW_FALLING/1/60-120','LUCK/2-3/120-360','REGENERATION/1/30'].map(parseEffect),
    category: 'Тематическое',
  },
  {
    id: 'guihuajiu',
    ...(() => { const [b,n,g] = parseName('Цветочная Вода/Османтусовое Вино/Лунный Османтус'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Китай', countryFlag: '🇨🇳',
    ingredients: ['SUNFLOWER/2','SUGAR_CANE/8','GLOW_BERRIES/2'].map(ing),
    cookingTime: 6, distillRuns: 1, wood: 1, age: 5,
    color: brewColor('YELLOW'), difficulty: 4, alcohol: 12,
    lore: ['Сладкое вино, собранное во время Праздника середины осени.', 'Дарует ощущение лёгкости и благословение луны.'],
    drinkMessage: 'Тонкий аромат цветов заставляет вас забыть о земных проблемах.',
    effects: ['LUCK/2-3/120-300','SLOW_FALLING/1/30-60','REGENERATION/1/30-90'].map(parseEffect),
    category: 'Вино',
    glint: true,
  },

  // ══════════════════════════════════════
  //  ВИСКИ / БРЕНДИ
  // ══════════════════════════════════════
  {
    id: 'whiskey',
    ...(() => { const [b,n,g] = parseName('Самогон дяди Боба/Дымный Виски/Шотландский Односолодовый Скотч'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Шотландия', countryFlag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    ingredients: ['WHEAT/12','COAL/1'].map(ing),
    cookingTime: 12, distillRuns: 2, wood: 4, age: 18,
    color: brewColor('ORANGE'), difficulty: 7, alcohol: 40,
    lore: ['Выдержан в прокопчённой бочке из-под хереса.', 'Аромат торфяного дыма, костра и суровых гор.'],
    drinkMessage: 'Настоящий шотландский характер обжигает горло дымом!',
    effects: ['FIRE_RESISTANCE/1/30-120','INCREASE_DAMAGE/1/30-90','DAMAGE_RESISTANCE/1/0-60'].map(parseEffect),
    category: 'Виски',
  },
  {
    id: 'bourbon',
    ...(() => { const [b,n,g] = parseName('Кукурузный самогон/Кентукки Бурбон/Пряный Jim Beam (США)'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'США', countryFlag: '🇺🇸',
    ingredients: ['WHEAT/6','SUGAR_CANE/6','OAK_LOG/1'].map(ing),
    cookingTime: 12, distillRuns: 2, wood: 2, age: 8,
    color: brewColor('ORANGE'), difficulty: 6, alcohol: 43,
    lore: ['Американская классика из Кентукки.', 'Сладковатый вкус благодаря кукурузной основе и обожжённому дубу.'],
    drinkMessage: 'Вкус дикого запада и ковбойской свободы!',
    effects: ['INCREASE_DAMAGE/1/40-100','FIRE_RESISTANCE/1/30-90','DAMAGE_RESISTANCE/1/0-60'].map(parseEffect),
    category: 'Виски',
  },
  {
    id: 'calvados',
    ...(() => { const [b,n,g] = parseName('Перебродивший яблочный сок/Нормандский Кальвадос/Кальвадос «Пер Мажу» 15 лет'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Франция', countryFlag: '🇫🇷',
    ingredients: ['APPLE/20','OAK_LOG/2'].map(ing),
    cookingTime: 10, distillRuns: 2, wood: 2, age: 15,
    color: brewColor('ORANGE'), difficulty: 7, alcohol: 40,
    lore: ['Яблочный бренди из нормандских садов.', 'Богатый ванильный аромат с нотками запечённого яблока и дуба.'],
    drinkMessage: 'Нормандская осень разливается теплом внутри вас!',
    effects: ['LUCK/1-2/60-180','SATURATION/1/20'].map(parseEffect),
    category: 'Мировое',
  },
  {
    id: 'grappa',
    ...(() => { const [b,n,g] = parseName('Кислая виноградная жижа/Итальянская Граппа/Граппа «Нонино» 10-летней выдержки'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Италия', countryFlag: '🇮🇹',
    ingredients: ['SWEET_BERRIES/20','SUGAR/1'].map(ing),
    cookingTime: 10, distillRuns: 3, wood: 3, age: 10,
    color: brewColor('BRIGHT_GREY'), difficulty: 7, alcohol: 42,
    lore: ['Итальянский дух, рождённый из виноградных выжимок.', 'Пряный, огненный, с ноткой сухофруктов.'],
    drinkMessage: 'Итальянский огонь обжигает горло и разливается по венам!',
    effects: ['INCREASE_DAMAGE/1-2/30-90','FIRE_RESISTANCE/1/20-60'].map(parseEffect),
    category: 'Мировое',
  },
  {
    id: 'slivovica',
    ...(() => { const [b,n,g] = parseName('Сливовый самогон/Сливовица/Балканская Старая Сливовица'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Балканы', countryFlag: '🇷🇸',
    ingredients: ['SWEET_BERRIES/18','OAK_LOG/1'].map(ing),
    cookingTime: 9, distillRuns: 2, wood: 2, age: 8,
    color: brewColor('PURPLE'), difficulty: 6, alcohol: 52,
    lore: ['Традиционный балканский сливовый бренди.', 'Дымный и терпкий, с глубоким фруктовым послевкусием.'],
    drinkMessage: 'Балканский дух обволакивает вас теплом и пряностью!',
    effects: ['REGENERATION/1-2/20-60','INCREASE_DAMAGE/1/40'].map(parseEffect),
    category: 'Мировое',
  },

  // ══════════════════════════════════════
  //  ВОДКА / САМОГОН
  // ══════════════════════════════════════
  {
    id: 'vodka',
    ...(() => { const [b,n,g] = parseName('Сивуха «Казачок»/Очищенная Водка/Кристальная Водка «Полярный Слон»'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Россия', countryFlag: '🇷🇺',
    ingredients: ['POTATO/15'].map(ing),
    cookingTime: 15, distillRuns: 4, wood: 0, age: 0,
    color: '#C8E8F0', difficulty: 5, alcohol: 40,
    lore: ['Никакого вкуса, только чистый, как лёд, спирт.', 'Идеально для суровых зимних ночей.'],
    drinkMessage: 'Огненная жидкость мгновенно согревает изнутри!',
    effects: ['INCREASE_DAMAGE/1/30-60','NAUSEA/1/15-5','FIRE_RESISTANCE/1/0-30'].map(parseEffect),
    category: 'Водка',
  },
  {
    id: 'baijiu',
    ...(() => { const [b,n,g] = parseName('Палёный Самогон/Китайский Байцзю/Огненная Вода Поднебесной'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Китай', countryFlag: '🇨🇳',
    ingredients: ['BAMBOO/12','WHEAT/6'].map(ing),
    cookingTime: 15, distillRuns: 4, wood: 0, age: 0,
    color: '#C8E8F0', difficulty: 7, alcohol: 55,
    lore: ['Крепость этого китайского монстра зашкаливает.', 'Запах напоминает растворитель, но эффект...'],
    drinkMessage: 'Вы выпиваете стопку Байцзю. Горло горит синим пламенем!',
    effects: ['DAMAGE_RESISTANCE/2-3/40-120','SLOWNESS/2/30','BLINDNESS/1/10-0','INCREASE_DAMAGE/1/0-60'].map(parseEffect),
    category: 'Водка',
  },
  {
    id: 'khrenovukha',
    ...(() => { const [b,n,g] = parseName('Горькая Бурда/Хреновуха/Ядрёная Хреновуха'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Украина', countryFlag: '🇺🇦',
    ingredients: ['POTATO/8','NETHER_WART/3','QUARTZ/1'].map(ing),
    cookingTime: 12, distillRuns: 3, wood: 0, age: 2,
    color: brewColor('YELLOW'), difficulty: 6, alcohol: 35,
    lore: ['Заменяет любой визит к лекарю.', 'Прошибает до самых слёз!'],
    drinkMessage: 'Ух! Хрен ударил прямо в мозг! Выдыхай!',
    effects: ['INCREASE_DAMAGE/1-2/30-90','NAUSEA/1/15-5','REGENERATION/2/5-15','DAMAGE_RESISTANCE/1/0-45'].map(parseEffect),
    category: 'Водка',
  },
  {
    id: 'palinka',
    ...(() => { const [b,n,g] = parseName('Мутная брага/Венгерская Палинка/Барачи Палинка (абрикосовая)'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Венгрия', countryFlag: '🇭🇺',
    ingredients: ['SWEET_BERRIES/12','APPLE/6','SUGAR/2'].map(ing),
    cookingTime: 8, distillRuns: 2, wood: 1, age: 5,
    color: brewColor('YELLOW'), difficulty: 5, alcohol: 48,
    lore: ['Огненный венгерский фруктовый самогон.', 'Из спелых абрикосов, чистейший, как венгерская душа.'],
    drinkMessage: 'Фруктовое пламя Венгрии обжигает вас изнутри!',
    effects: ['SPEED/2/30-60','JUMP/1/30'].map(parseEffect),
    category: 'Мировое',
  },

  // ══════════════════════════════════════
  //  РОМ
  // ══════════════════════════════════════
  {
    id: 'rum',
    ...(() => { const [b,n,g] = parseName('Жижа с пиратского судна/Капитанский Ром/Пиратский Ром «Старый Флинт»'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Карибы', countryFlag: '🏴‍☠️',
    ingredients: ['SUGAR_CANE/24'].map(ing),
    cookingTime: 8, distillRuns: 3, wood: 3, age: 12,
    color: brewColor('DARK_RED'), difficulty: 6, alcohol: 45,
    lore: ['Йо-хо-хо и бутылка рома!', 'Любимый напиток флибустьеров Карибского моря.'],
    drinkMessage: 'Внутри вас просыпается жажда морских приключений!',
    effects: ['WATER_BREATHING/1/60-240','SPEED/1/30','INCREASE_DAMAGE/1/0-60','LUCK/1/30-90'].map(parseEffect),
    category: 'Ром',
  },
  {
    id: 'cachaca',
    ...(() => { const [b,n,g] = parseName('Тростниковый жмых/Бразильская Кашаса/Кашаса для Кайпириньи'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Бразилия', countryFlag: '🇧🇷',
    ingredients: ['SUGAR_CANE/32','MELON_SLICE/2'].map(ing),
    cookingTime: 7, distillRuns: 2, wood: 3, age: 4,
    color: brewColor('WATER'), difficulty: 5, alcohol: 40,
    lore: ['Крепкий дух бразильского карнавала.', 'Основа для самого освежающего коктейля на пляже Копакабана.'],
    drinkMessage: 'Ритмы самбы так и просятся в пляс!',
    effects: ['SPEED/2/30-90','JUMP/1/30','SATURATION/1/15-30','DOLPHINS_GRACE/1/0-30'].map(parseEffect),
    category: 'Ром',
  },
  {
    id: 'pirate_rum_punch',
    ...(() => { const [b,n,g] = parseName('Мутный пунш/Пиратский Пунш/Джекпот «Весёлый Роджер»'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Карибы', countryFlag: '☠️',
    ingredients: ['SUGAR_CANE/16','MELON_SLICE/4','SWEET_BERRIES/4','GLOW_BERRIES/2'].map(ing),
    cookingTime: 7, distillRuns: 2, wood: 3, age: 5,
    color: brewColor('DARK_RED'), difficulty: 5, alcohol: 35,
    lore: ['То, что пьют на пиратских кораблях перед абордажем.', 'Красный, как кровь врагов. Сладкий, как победа!'],
    drinkMessage: 'Пиратский дух пробуждается! На абордаж!',
    effects: ['SPEED/2/60-120','INCREASE_DAMAGE/1-2/30-90','WATER_BREATHING/1/60-180'].map(parseEffect),
    category: 'Тематическое',
  },

  // ══════════════════════════════════════
  //  ТЕКИЛА / АБСЕНТ
  // ══════════════════════════════════════
  {
    id: 'tequila',
    ...(() => { const [b,n,g] = parseName('Сок кактуса/Серебряная Текила/Золотая Текила Аньехо'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Мексика', countryFlag: '🇲🇽',
    ingredients: ['CACTUS/12','SUGAR/2'].map(ing),
    cookingTime: 14, distillRuns: 2, wood: 1, age: 10,
    color: brewColor('YELLOW'), difficulty: 5, alcohol: 38,
    lore: ['Прямиком из раскалённых пустынь Мексики.', 'Не забудьте соль и лайм!'],
    drinkMessage: 'Горячий дух Мексики заставляет вашу кровь кипеть!',
    effects: ['SPEED/1-2/20-60','JUMP/1-2/20-50','HASTE/1/0-30'].map(parseEffect),
    category: 'Другое',
  },
  {
    id: 'absinthe',
    ...(() => { const [b,n,g] = parseName('Зелёная жижа/Крепкий Абсент/Изумрудная Зелёная Фея'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Франция', countryFlag: '🇫🇷',
    ingredients: ['SHORT_GRASS/24','POISONOUS_POTATO/1'].map(ing),
    cookingTime: 5, distillRuns: 6, wood: 0, age: 0,
    color: brewColor('LIME'), difficulty: 8, alcohol: 70,
    lore: ['Напиток французской богемы и безумных художников.', 'Осторожно: Фея может утащить вас в трип!'],
    drinkMessage: 'Реальность вокруг начинает странно плыть и искриться...',
    effects: ['NAUSEA/2/30-60','NIGHT_VISION/1/60-180','LEVITATION/1/3-0','SLOW_FALLING/1/0-30'].map(parseEffect),
    category: 'Другое',
    glint: true,
  },
  {
    id: 'absinthe_gold',
    ...(() => { const [b,n,g] = parseName('Горькая Полынь/Чешский Абсент/Золотая Зелёная Фея'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Чехия', countryFlag: '🇨🇿',
    ingredients: ['SHORT_GRASS/20','GOLD_NUGGET/4','FEATHER/1'].map(ing),
    cookingTime: 8, distillRuns: 6, wood: 0, age: 0,
    color: brewColor('LIME'), difficulty: 9, alcohol: 70,
    lore: ['Высокоградусное безумие. Вызывает галлюцинации.', 'Зелёная Фея унесёт вас в стратосферу.'],
    drinkMessage: 'Мир вокруг вас начинает окрашиваться в ядовито-зелёные тона!',
    effects: ['NAUSEA/3/40','INCREASE_DAMAGE/2-3/60-150','LEVITATION/1/5-0','NIGHT_VISION/1/120-240','SLOW_FALLING/1/10-30'].map(parseEffect),
    category: 'Другое',
    glint: true,
  },

  // ══════════════════════════════════════
  //  ЛИКЁРЫ
  // ══════════════════════════════════════
  {
    id: 'sake',
    ...(() => { const [b,n,g] = parseName('Рисовая брага/Традиционное Саке/Императорское Саке «Нихонсю»'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Япония', countryFlag: '🇯🇵',
    ingredients: ['WHEAT/10','SUGAR/3'].map(ing),
    cookingTime: 10, distillRuns: 1, wood: 1, age: 2,
    color: '#C8E8F0', difficulty: 6, alcohol: 16,
    lore: ['Традиционный японский алкоголь из риса.', 'Подаётся тёплым в крошечных пиалах. С чистотой самурая.'],
    drinkMessage: 'Вы ловите волну полного дзена и душевного спокойствия.',
    effects: ['REGENERATION/1-2/15-45','DOLPHINS_GRACE/1/30-90','SLOW_FALLING/1/0-30','LUCK/1/0-60'].map(parseEffect),
    category: 'Ликёр',
  },
  {
    id: 'jager',
    ...(() => { const [b,n,g] = parseName('Болотный Сироп/Ликёр Jägermeister/Легендарный Егерь (56 трав)'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Германия', countryFlag: '🇩🇪',
    ingredients: ['SHORT_GRASS/10','SWEET_BERRIES/5','SPIDER_EYE/1'].map(ing),
    cookingTime: 14, distillRuns: 1, wood: 4, age: 12,
    color: brewColor('PURPLE'), difficulty: 8, alcohol: 35,
    lore: ['Знаменитый немецкий травяной ликёр.', 'Рецепт держится в строжайшем секрете!', 'Пить строго ледяным. Идеально для охотников.'],
    drinkMessage: 'Леденящий немецкий ликёр со вкусом хвои и трав проваливается внутрь!',
    effects: ['NIGHT_VISION/1/120-300','SPEED/1/60-120','REGENERATION/1/20','INCREASE_DAMAGE/1/0-90'].map(parseEffect),
    category: 'Ликёр',
    glint: true,
  },
  {
    id: 'irish_cream',
    ...(() => { const [b,n,g] = parseName('Жидкий шоколад/Ирландский Крем/Baileys Original Irish Cream'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Ирландия', countryFlag: '🇮🇪',
    ingredients: ['MILK_BUCKET/1','COCOA_BEANS/4','WHEAT/4','SUGAR/3'].map(ing),
    cookingTime: 6, distillRuns: 1, wood: 2, age: 3,
    color: brewColor('ORANGE'), difficulty: 4, alcohol: 17,
    lore: ['Нежный и бархатный ирландский ликёр.', 'Сливочный шоколад встречает ирландский виски. Любовь с первого глотка.'],
    drinkMessage: 'Шёлковый ирландский крем тает во рту...',
    effects: ['SATURATION/2/30-60','REGENERATION/1/20-40'].map(parseEffect),
    category: 'Ликёр',
  },
  {
    id: 'coffee_liqueur',
    ...(() => { const [b,n,g] = parseName('Горькая кофейная жижа/Кофейный Ликёр/Kahlúa (Калуа Мексиканская)'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Мексика', countryFlag: '🇲🇽',
    ingredients: ['COCOA_BEANS/8','SUGAR_CANE/6','SUGAR/4'].map(ing),
    cookingTime: 7, distillRuns: 1, wood: 3, age: 4,
    color: brewColor('BLACK'), difficulty: 5, alcohol: 20,
    lore: ['Мексиканский кофейный ликёр с нотками ванили.', 'Основа White Russian и Espresso Martini.'],
    drinkMessage: 'Интенсивный кофейный аромат разгоняет сонливость!',
    effects: ['HASTE/2/120-300','NIGHT_VISION/1/60-180','SPEED/1/60'].map(parseEffect),
    category: 'Ликёр',
  },
  {
    id: 'krambambulya',
    ...(() => { const [b,n,g] = parseName('Мутная жижа/Крамбамбуля/Шляхетская Крамбамбуля'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Беларусь', countryFlag: '🇧🇾',
    ingredients: ['WHEAT/8','BLAZE_POWDER/1','DARK_OAK_LOG/2'].map(ing),
    cookingTime: 10, distillRuns: 2, wood: 2, age: 6,
    color: brewColor('ORANGE'), difficulty: 5, alcohol: 25,
    lore: ['Древний согревающий напиток со специями.', 'Развязывает язык и зажигает огонь в груди.'],
    drinkMessage: 'Пряный огонь разливается по вашему телу!',
    effects: ['HERO_OF_THE_VILLAGE/1-2/120-300','FIRE_RESISTANCE/1/60-180','INCREASE_DAMAGE/1/0-60'].map(parseEffect),
    category: 'Ликёр',
  },
  {
    id: 'arak',
    ...(() => { const [b,n,g] = parseName('Анисовая вода/Левантийский Арак/Арак «Лион Нуар» (Lion Noir)'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Ливан', countryFlag: '🇱🇧',
    ingredients: ['SHORT_GRASS/8','SUGAR_CANE/10','SNOWBALL/3'].map(ing),
    cookingTime: 11, distillRuns: 3, wood: 0, age: 6,
    color: '#C8E8F0', difficulty: 7, alcohol: 63,
    lore: ['Национальный напиток Ближнего Востока.', 'При разбавлении водой становится молочно-белым — «Молоко льва»!'],
    drinkMessage: 'Анисовый аромат ударяет в нос, а крепость — в голову!',
    effects: ['SLOW_FALLING/1/30-90','SPEED/1/60'].map(parseEffect),
    category: 'Мировое',
  },

  // ══════════════════════════════════════
  //  СИДР / МЕДОВУХА
  // ══════════════════════════════════════
  {
    id: 'cidre',
    ...(() => { const [b,n,g] = parseName('Перебродивший сок/Яблочный Сидр/Французский Дюпон'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Франция', countryFlag: '🇫🇷',
    ingredients: ['APPLE/16'].map(ing),
    cookingTime: 7, distillRuns: 0, wood: 0, age: 4,
    color: brewColor('ORANGE'), difficulty: 3, alcohol: 6,
    lore: ['Шипучий, лёгкий и безумно яблочный.', 'Родом из нормандских садов Франции.'],
    drinkMessage: 'Искристые пузырьки приятно покалывают язык!',
    effects: ['SATURATION/1/10-30','SPEED/1/20-40','JUMP/1/0-20'].map(parseEffect),
    category: 'Другое',
  },
  {
    id: 'spotykach',
    ...(() => { const [b,n,g] = parseName('Кислая ягода/Спотыкач/Праздничный Спотыкач'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Украина', countryFlag: '🇺🇦',
    ingredients: ['SWEET_BERRIES/12','SUGAR/4'].map(ing),
    cookingTime: 6, distillRuns: 1, wood: 2, age: 3,
    color: brewColor('DARK_RED'), difficulty: 3, alcohol: 16,
    lore: ['Голова абсолютно трезвая...', '...а вот ноги уже не слушаются.'],
    drinkMessage: 'Вкусно, сладко, но почему земля уходит из-под ног?',
    effects: ['JUMP/2/30','SLOWNESS/2-4/20-40','NAUSEA/1/5-15','REGENERATION/1/0-20'].map(parseEffect),
    category: 'Ликёр',
  },
  {
    id: 'shejiu',
    ...(() => { const [b,n,g] = parseName('Странный рассол/Змеиное Вино/Эликсир Бессмертного Шаолиня'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Китай', countryFlag: '🇨🇳',
    ingredients: ['BAMBOO/8','SPIDER_EYE/1','SUGAR_CANE/4'].map(ing),
    cookingTime: 8, distillRuns: 2, wood: 1, age: 15,
    color: brewColor('GREEN'), difficulty: 8, alcohol: 38,
    lore: ['Настоящая змея растворилась в этой бутылке.', 'Токсины превратились в целебный бальзам.'],
    drinkMessage: 'Вы проглатываете напиток с привкусом змеиной чешуи. Начинается мутация!',
    effects: ['POISON/2-1/10-0','REGENERATION/2-3/30-90','NIGHT_VISION/1/120','INCREASE_DAMAGE/1/0-60'].map(parseEffect),
    category: 'Мировое',
    glint: true,
  },

  // ══════════════════════════════════════
  //  КОКТЕЙЛИ
  // ══════════════════════════════════════
  {
    id: 'mojito',
    ...(() => { const [b,n,g] = parseName('Мятная вода с ромом/Кубинский Мохито/Mojito Fresco'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Куба', countryFlag: '🇨🇺',
    ingredients: ['SUGAR_CANE/8','SHORT_GRASS/4','SUGAR/3','SNOWBALL/2'].map(ing),
    cookingTime: 4, distillRuns: 1, wood: 0, age: 0,
    color: brewColor('LIME'), difficulty: 4, alcohol: 15,
    lore: ['Душа Гаваны в стакане со льдом.', 'Мята, лайм, ром, содовая — квинтэссенция лета!'],
    drinkMessage: 'Ледяная свежесть мохито мгновенно освежает в жаркий день!',
    effects: ['SPEED/2/60-120','SATURATION/1/20-40','SLOW_FALLING/1/10'].map(parseEffect),
    category: 'Коктейль',
  },
  {
    id: 'margarita',
    ...(() => { const [b,n,g] = parseName('Кислая текильная смесь/Маргарита на льду/Маргарита «Золотой берег»'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Мексика', countryFlag: '🇲🇽',
    ingredients: ['CACTUS/6','SUGAR/4','SNOWBALL/2'].map(ing),
    cookingTime: 5, distillRuns: 1, wood: 0, age: 0,
    color: brewColor('YELLOW'), difficulty: 4, alcohol: 22,
    lore: ['Классический коктейль с текилой, трипл-секом и лаймом.', 'Подаётся с ободком из соли — и всё сразу становится лучше!'],
    drinkMessage: 'Соль, лайм, текила — вот рецепт веселья!',
    effects: ['SPEED/1-2/30-90','LUCK/1/60'].map(parseEffect),
    category: 'Коктейль',
  },
  {
    id: 'pina_colada',
    ...(() => { const [b,n,g] = parseName('Сладкая каша/Пина-Колада/Тропическая Пина-Колада'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Пуэрто-Рико', countryFlag: '🌴',
    ingredients: ['SUGAR_CANE/6','MELON_SLICE/6','MILK_BUCKET/1'].map(ing),
    cookingTime: 5, distillRuns: 1, wood: 3, age: 0,
    color: brewColor('YELLOW'), difficulty: 3, alcohol: 18,
    lore: ['«Если ты любишь Пина-Коладу...»', 'Кокос, ананас, ром и немного солнца Пуэрто-Рико.'],
    drinkMessage: 'Тропический рай в стакане переносит вас на пляж!',
    effects: ['SATURATION/2/30-60','SLOW_FALLING/1/20-60','SPEED/1/30'].map(parseEffect),
    category: 'Коктейль',
  },
  {
    id: 'gluhwein',
    ...(() => { const [b,n,g] = parseName('Горькое варево/Глинтвейн/Рождественский Глинтвейн'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Германия', countryFlag: '🇩🇪',
    ingredients: ['SWEET_BERRIES/12','BLAZE_POWDER/2','SUGAR/3','OAK_LOG/1'].map(ing),
    cookingTime: 7, distillRuns: 0, wood: 2, age: 2,
    color: brewColor('RED'), difficulty: 3, alcohol: 10,
    lore: ['Горячий пряный глинтвейн с корицей и гвоздикой.', 'Согревает в самые лютые метели!'],
    drinkMessage: 'Рождественский уют разливается по всему телу!',
    effects: ['FIRE_RESISTANCE/1/120-300','REGENERATION/1/30-60','SLOW_FALLING/1/20'].map(parseEffect),
    category: 'Коктейль',
  },

  // ══════════════════════════════════════
  //  БЕЗАЛКОГОЛЬНЫЕ
  // ══════════════════════════════════════
  {
    id: 'zhivchik',
    ...(() => { const [b,n,g] = parseName('Кислый Живчик/Классический Живчик/Легендарный Живчик'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Украина', countryFlag: '🇺🇦',
    ingredients: ['APPLE/10','SUGAR/4','SHORT_GRASS/2'].map(ing),
    cookingTime: 4, distillRuns: 0, wood: 0, age: 0,
    color: brewColor('YELLOW'), difficulty: 2, alcohol: 0,
    lore: ['Тот самый, из детства!', 'Вкус спелых яблок и эхинацеи.', 'Прекрасно утоляет жажду в жаркую погоду.'],
    drinkMessage: 'Освежающий яблочный вкус бьёт в нос!',
    effects: ['SATURATION/1-2/10-30','REGENERATION/1/15','SPEED/1/15-30'].map(parseEffect),
    category: 'Безалкогольное',
  },
  {
    id: 'energy_drink',
    ...(() => { const [b,n,g] = parseName('Химозный Энергетик/Энергетик Red Bull/Заряженный Red Bull'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Австрия', countryFlag: '🇦🇹',
    ingredients: ['COCOA_BEANS/6','GLOW_BERRIES/4','SUGAR/6'].map(ing),
    cookingTime: 3, distillRuns: 0, wood: 0, age: 0,
    color: brewColor('CYAN'), difficulty: 4, alcohol: -15,
    lore: ['Ред Булл окрыля-я-яет!', 'Внимание: вызывает тахикардию у кубических человечков.'],
    drinkMessage: 'Вы выпиваете баночку энергетика. Сердце начинает бешено стучать!',
    effects: ['SPEED/2-3/60-180','HASTE/1-2/60-120','JUMP/1-2/20-60','WEAKNESS/1/0-15'].map(parseEffect),
    category: 'Безалкогольное',
  },
  {
    id: 'puerh_tea',
    ...(() => { const [b,n,g] = parseName('Земляной Чай/Чай Пуэр/Императорский Пуэр 15-летней выдержки'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Китай', countryFlag: '🇨🇳',
    ingredients: ['OAK_LEAVES/8','COCOA_BEANS/3'].map(ing),
    cookingTime: 5, distillRuns: 0, wood: 6, age: 15,
    color: brewColor('BLACK'), difficulty: 5, alcohol: -5,
    lore: ['Пахнет старым подвалом и землёй, но как же он бодрит!', 'Напиток для глубокой медитации и прояснения разума.'],
    drinkMessage: 'Эффект «чайного опьянения» плавно окутывает ваш разум...',
    effects: ['NIGHT_VISION/1/300','HASTE/2/180','LUCK/1/120','SLOW_FALLING/1/30-60'].map(parseEffect),
    category: 'Безалкогольное',
  },
  {
    id: 'kompot',
    ...(() => { const [b,n,g] = parseName('Кислая бурда/Домашний Компот/Мамин Фруктовый Компот'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'СНГ', countryFlag: '🏡',
    ingredients: ['SWEET_BERRIES/8','APPLE/4','SUGAR/3'].map(ing),
    cookingTime: 4, distillRuns: 0, wood: 0, age: 0,
    color: brewColor('DARK_RED'), difficulty: 1, alcohol: 0,
    lore: ['Тот самый вкус лета из трёхлитровой банки.', 'Мамины руки, запах варенья и детство — всё в одном стакане.'],
    drinkMessage: 'Тёплый домашний компот напоминает о беззаботном детстве...',
    effects: ['SATURATION/2/20-40','REGENERATION/1/15-30','LUCK/1/30'].map(parseEffect),
    category: 'Безалкогольное',
  },
  {
    id: 'sbiten',
    ...(() => { const [b,n,g] = parseName('Горький кипяток/Сбитень/Русский Праздничный Сбитень'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Россия', countryFlag: '🇷🇺',
    ingredients: ['PUMPKIN/1','GLOW_BERRIES/3','BLAZE_POWDER/1','SUGAR/2'].map(ing),
    cookingTime: 6, distillRuns: 0, wood: 0, age: 0,
    color: brewColor('ORANGE'), difficulty: 3, alcohol: 0,
    lore: ['Старославянский горячий медово-пряный напиток.', 'Корица, имбирь, мёд — согревает лучше любой шубы!'],
    drinkMessage: 'Горячий пряный сбитень разливается огнём по телу!',
    effects: ['FIRE_RESISTANCE/1/60-120','REGENERATION/1/20-40','DAMAGE_RESISTANCE/1/30'].map(parseEffect),
    category: 'Безалкогольное',
  },
  {
    id: 'black_coffee',
    ...(() => { const [b,n,g] = parseName('Чёрная жижа/Крепкий Кофе/Эспрессо «Двойной удар»'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Эфиопия', countryFlag: '☕',
    ingredients: ['COCOA_BEANS/8','COAL/1'].map(ing),
    cookingTime: 3, distillRuns: 0, wood: 0, age: 0,
    color: brewColor('BLACK'), difficulty: 2, alcohol: -20,
    lore: ['Для тех, кто не спит уже третьи сутки.', 'Горький, концентрированный, бескомпромиссный.'],
    drinkMessage: 'Концентрированный кофеин резко взбадривает вас!',
    effects: ['HASTE/3/120-240','SPEED/2/90-180','NAUSEA/1/5-0','WEAKNESS/1/0-10'].map(parseEffect),
    category: 'Безалкогольное',
  },

  // ══════════════════════════════════════
  //  ХЭЛЛОУИН / СЕЗОННЫЕ
  // ══════════════════════════════════════
  {
    id: 'halloween_brew',
    ...(() => { const [b,n,g] = parseName('Мутное варево ведьмы/Зелье Ведьмы/Хэллоуинское Варево «Котёл»'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Хэллоуин', countryFlag: '🕷️',
    ingredients: ['SHORT_GRASS/6','NETHER_WART/2','POISONOUS_POTATO/2','SPIDER_EYE/1'].map(ing),
    cookingTime: 8, distillRuns: 2, wood: 0, age: 0,
    color: brewColor('PURPLE'), difficulty: 7, alcohol: 25,
    lore: ['Сварено в котле старой ведьмы на перекрёстке дорог.', 'Запах серы, паучьего яда и чего-то неопознанного...'],
    drinkMessage: 'Тёмные силы пробуждаются в вашем теле!',
    effects: ['NIGHT_VISION/1/300','INVISIBILITY/1/30-60','POISON/1/5-0','SPEED/2/60'].map(parseEffect),
    category: 'Тематическое',
  },

  // ══════════════════════════════════════
  //  ОПАСНЫЕ
  // ══════════════════════════════════════
  {
    id: 'dragon_breath',
    ...(() => { const [b,n,g] = parseName('Вонючий дым/Дыхание Дракона/Дыхание Дракона (Нельзя Больше Пить!)'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Ад', countryFlag: '🔥',
    ingredients: ['BLAZE_POWDER/4','NETHER_WART/2','MAGMA_CREAM/2','SUGAR_CANE/8'].map(ing),
    cookingTime: 15, distillRuns: 4, wood: 7, age: 0,
    color: brewColor('BRIGHT_RED'), difficulty: 9, alcohol: 80,
    lore: ['Буквально сварено из огненного дыхания дракона.', 'Вызывает ожоги пищевода, воспламенение одежды и потерю разума.'],
    drinkMessage: 'ОГОНЬ! Всё вокруг горит! Вы горите! ВСЁ ПРЕКРАСНО!',
    effects: ['FIRE_RESISTANCE/2/120-300','INCREASE_DAMAGE/3/60-180','NAUSEA/2/20-60','SPEED/3/30-90'].map(parseEffect),
    category: 'Опасное',
  },
  {
    id: 'witchers_potion',
    ...(() => { const [b,n,g] = parseName('Мутная дрянь/Ведьмачье Зелье/Ведьмачье Зелье «Чёрная кровь»'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: 'Ведьмачий мир', countryFlag: '⚔️',
    ingredients: ['NETHER_WART/3','SPIDER_EYE/2','POISONOUS_POTATO/1','FERMENTED_SPIDER_EYE/1'].map(ing),
    cookingTime: 12, distillRuns: 3, wood: 0, age: 5,
    color: brewColor('BLACK'), difficulty: 9, alcohol: 50,
    lore: ['Токсично для обычных смертных. Ведьмаки пьют перед битвой с монстрами.', 'Содержит мутагены. Влечёт за собой изменение пигментации глаз.'],
    drinkMessage: 'Чёрные жилы разбегаются от сердца. Чувства обостряются!',
    effects: ['NIGHT_VISION/1/600','SPEED/2/120-300','INCREASE_DAMAGE/2-3/60-180','POISON/2-1/30-0','DAMAGE_RESISTANCE/1/60'].map(parseEffect),
    category: 'Опасное',
  },
  {
    id: 'abomination',
    ...(() => { const [b,n,g] = parseName('Что это вообще?/Мерзость в бутылке/«Омерзение» — Не открывать!'); return { nameBad: b, nameNormal: n, name: g }; })(),
    country: '???', countryFlag: '💀',
    ingredients: ['ROTTEN_FLESH/4','POISONOUS_POTATO/2','FERMENTED_SPIDER_EYE/2','NETHER_WART/2','MAGMA_CREAM/1'].map(ing),
    cookingTime: 20, distillRuns: 5, wood: 7, age: 0,
    color: brewColor('OLIVE'), difficulty: 10, alcohol: 95,
    lore: ['Это не должно существовать. Сварено из мерзейших ингредиентов Нижнего Мира.', 'Употреблять только если других вариантов не осталось.'],
    drinkMessage: 'Омерзительное варево захлёстывает всё тело хаосом!',
    effects: ['POISON/3/60-20','INCREASE_DAMAGE/3/120-300','DAMAGE_RESISTANCE/2/60-180','SPEED/3/60-120','NAUSEA/3/30-60','NIGHT_VISION/1/600'].map(parseEffect),
    category: 'Опасное',
  },
];

// ─── Список категорий ─────────────────────────────────────────────────────────

export const CATEGORIES: DrinkCategory[] = [
  'Пиво', 'Вино', 'Виски', 'Водка', 'Ром', 'Ликёр',
  'Коктейль', 'Безалкогольное', 'Тематическое', 'Мировое', 'Опасное', 'Другое',
];

// ─── Список стран ─────────────────────────────────────────────────────────────

export const countries = [...new Set(drinks.map(d => ({ name: d.country, flag: d.countryFlag }))
  .sort((a, b) => a.name.localeCompare(b.name, 'ru')))]
  .filter((v, i, arr) => arr.findIndex(x => x.name === v.name) === i);
