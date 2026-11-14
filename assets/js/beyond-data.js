/* ── Beyond the numbers ── the personal layer. EDIT THIS FILE to update it.
   Facts only — the scenes are animated, the words are kept to labels.
   Anything left empty ('' or []) is hidden. Add ?draft to the address to see empty slots.
   Spanish: add the English label and its translation to the `es` list at the bottom. */
window.BEYOND = {
  /* 'ring' = personal stars in the Home web, each opening an animated scene. */
  layout: 'ring',

  perfumes: {
    /* One bottle each. top / heart / base are the notes; occasion is when you wear it. */
    shelf: [
      { name: 'Gentleman Réserve Privée', house: 'Givenchy', top: '', heart: '', base: '', occasion: '' },
      { name: 'Luna Rossa Ocean', house: 'Prada', top: '', heart: '', base: '', occasion: '' },
      { name: 'Le Male Elixir', house: 'Jean Paul Gaultier', top: '', heart: '', base: '', occasion: '' },
      { name: 'Stronger With You Intensely', house: 'Emporio Armani', top: '', heart: '', base: '', occasion: '' },
      { name: 'Y Le Parfum', house: 'Yves Saint Laurent', top: '', heart: '', base: '', occasion: '' },
      { name: 'Qaed Al Fursan', house: 'Lattafa', top: '', heart: '', base: '', occasion: '' },
      /* Notes for the two below are from a retailer listing (jjparfums.com), not the house — confirm by nose. */
      { name: 'Black Diamond', house: 'Édouard Matisse', top: 'Rosemary, Cedar, Bergamot, Lemon', heart: 'Spices, Guaiac Wood, Cedar', base: 'Resins, Amber, Musk', occasion: 'Big days' },
      { name: 'Henry VIII', house: 'Édouard Matisse', top: 'Cinnamon, Cardamom, Orange Blossom, Bergamot', heart: 'Bourbon Vanilla, Elemi', base: '', occasion: 'Big days' },
      { name: 'Layton', house: 'Parfums de Marly', top: '', heart: '', base: '', occasion: 'Big days' },
    ],
  },

  gym: {
    /* Which days of the week you train (Mon = 1 … Sun = 7) and when. */
    week: [1, 2, 3, 4, 5], when: 'Nights',
    /* Logged training days as 'YYYY-MM-DD'. Real days only — the star field appears once there are some. */
    days: [],
  },

  football: { team: 'Real Madrid', foot: 'Left foot', side: 'Left side', players: 'Cristiano · Messi' },

  cooking: { dish: 'Steak', pair: 'Wine' },

  journey: [
    { place: 'Guatemala City', lat: 14.63, lon: -90.51, tags: ['Dogs', 'Family', 'Home cooking'] },
    { place: 'Boston', lat: 42.36, lon: -71.06, tags: ['Hult', 'Class of 2027'] },
  ],

  watching: { title: 'Black Clover' },

  es: {
    'The shelf': 'El estante', 'The route': 'La ruta', 'Consistency': 'Constancia', 'Football': 'Fútbol', 'Kitchen': 'Cocina',
    'Big days': 'Días importantes', 'Nights': 'De noche', 'Left foot': 'Zurdo', 'Left side': 'Banda izquierda',
    'Steak': 'Steak', 'Wine': 'Vino', 'Dogs': 'Perros', 'Family': 'Familia', 'Home cooking': 'Comida de casa', 'Class of 2027': 'Promoción 2027',
    'bottles': 'frascos', 'nights a week': 'noches por semana', 'Top': 'Salida', 'Heart': 'Corazón', 'Base': 'Fondo',
    'Close': 'Cerrar', 'Connected': 'Conectado', 'Replay': 'Repetir', 'A five-leaf clover': 'Un trébol de cinco hojas',
    'training days logged': 'días de entrenamiento registrados',
    'Orcen Valuation Kit': 'Orcen Valuation Kit', 'Experience': 'Experiencia', 'Writing': 'Escritos', 'Lifeline': 'Lifeline',
    'M': 'L', 'T': 'M', 'W': 'X', 'F': 'V', 'S': 'S',
  },
};
