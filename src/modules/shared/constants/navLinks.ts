export const baseLinks = [
  { title: 'Головна', path: '/', type: 'route' },
  { title: 'Каталог вин', path: '/wines', type: 'route' },
  { title: 'Про нас', path: '#about', type: 'anchor', onlyHome: true },
  { title: 'Контакти', path: '#contacts', type: 'anchor' },
];

export const mobileNavLinks = [
  ...baseLinks,
  { title: 'Кошик', path: '/cart', type: 'route' },
  { title: 'Особистий кабінет', path: '/account', type: 'route' },
];

export const desktopNavLinks = baseLinks;
