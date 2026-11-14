/* ── Beyond the numbers ── the personal layer. EDIT THIS FILE to update it.
   Rules: nothing invented — every line here comes from Aleks. Anything left empty ('' or [])
   is hidden on the live site. Add ?draft to the address (…github.io/?draft) to see every
   empty slot, marked as an example.
   Spanish: add the English line and its translation to the `es` list at the bottom. */
window.BEYOND = {
  /* 'ring' = personal stars in the Home web, each opening a scene. 'section' = one section on the Experience page. */
  layout: 'ring',

  intro: 'The same person builds the models. This is the rest of him.',

  perfumes: {
    rule: 'I don’t buy by price tag. I buy what I like, what someone I trust recommends, and now and then a great deal.',
    story: 'My best buys were both well under the tag. One of them I picked out with my family — everybody walked out with their own bottle.',
    /* One card per bottle. top / heart / base are the notes; occasion is when you wear it;
       said is one short personal line. Leave a field '' until you have confirmed it. */
    shelf: [
      { name: 'Gentleman Réserve Privée', house: 'Givenchy', top: '', heart: '', base: '', occasion: '', said: 'One of the three that gets noticed.' },
      { name: 'Luna Rossa Ocean', house: 'Prada', top: '', heart: '', base: '', occasion: '', said: '' },
      { name: 'Le Male Elixir', house: 'Jean Paul Gaultier', top: '', heart: '', base: '', occasion: '', said: '' },
      { name: 'Stronger With You Intensely', house: 'Emporio Armani', top: '', heart: '', base: '', occasion: '', said: '' },
      { name: 'Y Le Parfum', house: 'Yves Saint Laurent', top: '', heart: '', base: '', occasion: '', said: '' },
      { name: 'Qaed Al Fursan', house: 'Lattafa', top: '', heart: '', base: '', occasion: '', said: '' },
      /* Notes for the two below are from a retailer listing (jjparfums.com), not the house — confirm by nose. */
      { name: 'Black Diamond', house: 'Édouard Matisse', top: 'Rosemary, Cedar, Bergamot, Lemon', heart: 'Spices, Guaiac Wood, Cedar', base: 'Resins, Amber, Musk', occasion: 'Big days.', said: 'Gets the compliments.' },
      { name: 'Henry VIII', house: 'Édouard Matisse', top: 'Cinnamon, Cardamom, Orange Blossom, Bergamot', heart: 'Bourbon Vanilla, Elemi', base: '', occasion: 'Big days.', said: 'Gets the compliments.' },
      { name: 'Layton', house: 'Parfums de Marly', top: '', heart: '', base: '', occasion: 'Big days.', said: 'I can never remember the name. I never forget the bottle.' },
    ],
  },

  gym: {
    line: 'I never want to go. I go anyway.',
    body: 'Five nights a week, Monday to Friday. Nights, because that’s when my head actually works. It isn’t motivation — it’s a contract with myself. Too sick to breathe or properly injured are the only two ways out.',
    /* Training days as 'YYYY-MM-DD', e.g. days: ['2026-11-10', '2026-11-12']. Real days only — the star field stays hidden until there are some. */
    days: [],
    quotes: [
      'Some days my 100% is 150 points. Some days it’s 40. Either way, it’s 100%.',
      'If it hurts, I’m alive and getting stronger.',
    ],
  },

  football: {
    line: 'Left foot. Left side. Always.',
    body: 'Left back, left mid, left wing — if it was the left lane, it was mine. Real Madrid, because they are never out of a match until the whistle. Cristiano and Messi, both.',
    memory: 'The goal I still think about: against our school rivals, from way out, curling over the keeper into the top corner. I meant it as a cross. I’ll take it.',
    team: 'Real Madrid', position: 'Left side', follows: '',
  },

  cooking: { line: 'I’m the one who eats, not the one who cooks. The exception: a good steak and a glass of wine.' },

  journey: [
    { place: 'Guatemala City', lat: 14.63, lon: -90.51, note: 'Home. I’m a huge dog person, so my dogs are what I miss most. Then my family, and the home-cooked food.' },
    { place: 'Boston', lat: 42.36, lon: -71.06, note: 'Hult, Class of 2027. The first weeks were less networking and more talking to everyone — that’s where I met some of my best friends.' },
  ],

  watching: {
    title: 'Black Clover',
    line: 'Asta is never the most talented person in the room. He just doesn’t know when to quit.',
    body: 'I relate to that more than I’d like to admit. Things rarely work the first time for me. They work after the fifth. One percent better than yesterday beats talent that stands still.',
  },

  /* Spanish for everything above and for the star labels. English on the left, exactly as written above. */
  es: {
    'The shelf': 'El estante', 'The route': 'La ruta', 'Consistency': 'Constancia', 'Football': 'Fútbol', 'Kitchen': 'Cocina',
    'What I wear, and why': 'Lo que uso, y por qué', 'I never want to go. I go anyway.': 'Nunca quiero ir. Voy igual.',
    'Left foot, left side': 'Zurdo, banda izquierda', 'I eat. Occasionally, I cook.': 'Yo como. A veces, cocino.',
    'I don’t buy by price tag. I buy what I like, what someone I trust recommends, and now and then a great deal.': 'No compro por la etiqueta de precio. Compro lo que me gusta, lo que me recomienda alguien de confianza y, de vez en cuando, una gran oferta.',
    'My best buys were both well under the tag. One of them I picked out with my family — everybody walked out with their own bottle.': 'Mis mejores compras salieron muy por debajo del precio de etiqueta. Una la escogí con mi familia: cada quien salió con su propio frasco.',
    'One of the three that gets noticed.': 'Uno de los tres que siempre notan.', 'Gets the compliments.': 'El de los cumplidos.', 'Big days.': 'Días importantes.',
    'I can never remember the name. I never forget the bottle.': 'Nunca me acuerdo del nombre. Nunca se me olvida el frasco.',
    'Five nights a week, Monday to Friday. Nights, because that’s when my head actually works. It isn’t motivation — it’s a contract with myself. Too sick to breathe or properly injured are the only two ways out.': 'Cinco noches a la semana, de lunes a viernes. De noche, porque es cuando de verdad me funciona la cabeza. No es motivación: es un contrato conmigo mismo. Estar tan enfermo que no pueda respirar o lesionado de verdad son las únicas dos salidas.',
    'Some days my 100% is 150 points. Some days it’s 40. Either way, it’s 100%.': 'Hay días en que mi 100% son 150 puntos. Hay días en que son 40. De cualquier forma, es el 100%.',
    'If it hurts, I’m alive and getting stronger.': 'Si duele, estoy vivo y haciéndome más fuerte.',
    'Left foot. Left side. Always.': 'Zurdo. Banda izquierda. Siempre.',
    'Left back, left mid, left wing — if it was the left lane, it was mine. Real Madrid, because they are never out of a match until the whistle. Cristiano and Messi, both.': 'Lateral izquierdo, volante izquierdo, extremo izquierdo: si era el carril izquierdo, era mío. Real Madrid, porque nunca está fuera de un partido hasta el pitazo final. Cristiano y Messi, los dos.',
    'The goal I still think about: against our school rivals, from way out, curling over the keeper into the top corner. I meant it as a cross. I’ll take it.': 'El gol en el que todavía pienso: contra el colegio rival, desde lejísimos, con curva por encima del portero y al ángulo. Era un centro. Me lo quedo.',
    'Left side': 'Banda izquierda',
    'I’m the one who eats, not the one who cooks. The exception: a good steak and a glass of wine.': 'Soy el que come, no el que cocina. La excepción: un buen steak y una copa de vino.',
    'Home. I’m a huge dog person, so my dogs are what I miss most. Then my family, and the home-cooked food.': 'Casa. Soy muy de perros, así que mis perros son lo que más extraño. Después mi familia, y la comida hecha en casa.',
    'Hult, Class of 2027. The first weeks were less networking and more talking to everyone — that’s where I met some of my best friends.': 'Hult, promoción 2027. Las primeras semanas fueron menos networking y más hablar con todo el mundo: ahí conocí a algunos de mis mejores amigos.',
    'Asta is never the most talented person in the room. He just doesn’t know when to quit.': 'Asta nunca es el más talentoso del lugar. Simplemente no sabe cuándo rendirse.',
    'I relate to that more than I’d like to admit. Things rarely work the first time for me. They work after the fifth. One percent better than yesterday beats talent that stands still.': 'Me identifico con eso más de lo que quisiera admitir. A mí las cosas casi nunca me salen a la primera. Salen a la quinta. Ser uno por ciento mejor que ayer le gana al talento que se queda quieto.',
    'Value over price tag → Orcen Valuation Kit': 'Valor sobre precio → Orcen Valuation Kit', 'Where the route led → Experience': 'A dónde llevó la ruta → Experiencia',
    'The other daily streak → Writing': 'La otra racha diaria → Escritos', '1st of 40 teams, built in one day → Lifeline': '1.º de 40 equipos, construido en un día → Lifeline',
    'Close': 'Cerrar', 'Connected': 'Conectado', 'Top': 'Salida', 'Heart': 'Corazón', 'Base': 'Fondo', 'Wear it for': 'Lo uso para',
    'On screen · you found the fifth leaf': 'En pantalla · encontraste la quinta hoja', 'A five-leaf clover': 'Un trébol de cinco hojas',
    'Gym · the last 26 weeks · one star per training day.': 'Gimnasio · últimas 26 semanas · una estrella por día de entrenamiento.', 'training days logged.': 'días de entrenamiento registrados.',
    'The goal': 'El gol',
  },
};
