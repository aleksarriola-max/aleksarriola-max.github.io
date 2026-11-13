/* ── Beyond the numbers ── the personal layer. EDIT THIS FILE to update the section.
   Rules: nothing invented. Anything left empty ('' or []) is hidden on the live site.
   Open the site with ?draft at the end of the address (…github.io/?draft#beyond) to see
   every empty slot, marked as an example, so you know what is still missing. */
window.BEYOND = {
  intro: 'The same person builds the models. This is the rest of him.',

  perfumes: {
    rule: 'I don’t buy by price tag. I buy what I like, what someone I trust recommends, and now and then a great deal.',
    /* One card per bottle. top / heart / base are the notes; occasion is when you wear it.
       Leave a field '' until you have confirmed it — the card simply shows less. */
    shelf: [
      { name: 'Gentleman Réserve Privée', house: 'Givenchy', top: '', heart: '', base: '', occasion: '' },
      { name: 'Luna Rossa Ocean', house: 'Prada', top: '', heart: '', base: '', occasion: '' },
      { name: 'Le Male Elixir', house: 'Jean Paul Gaultier', top: '', heart: '', base: '', occasion: '' },
      { name: 'Stronger With You Intensely', house: 'Emporio Armani', top: '', heart: '', base: '', occasion: '' },
      { name: 'Y Le Parfum', house: 'Yves Saint Laurent', top: '', heart: '', base: '', occasion: '' },
      { name: 'Qaed Al Fursan', house: 'Lattafa', top: '', heart: '', base: '', occasion: '' },
      /* Notes below are from a retailer listing (jjparfums.com), not the house — confirm by nose. */
      { name: 'Black Diamond', house: 'Édouard Matisse', top: 'Rosemary, Cedar, Bergamot, Lemon', heart: 'Spices, Guaiac Wood, Cedar', base: 'Resins, Amber, Musk', occasion: '' },
      { name: 'Henry VIII', house: 'Édouard Matisse', top: 'Cinnamon, Cardamom, Orange Blossom, Bergamot', heart: 'Bourbon Vanilla, Elemi', base: '', occasion: '' },
    ],
  },

  gym: {
    /* Training days as 'YYYY-MM-DD', e.g. days: ['2026-11-10', '2026-11-12']. Real days only. */
    days: [],
    /* Your gym quotes, e.g. quotes: ['First line.', 'Second line.'] */
    quotes: [],
  },

  football: {
    line: 'Soccer taught me the drill: fail in public, immediately, then run it again.',
    team: '', position: '', follows: '',
  },

  cooking: { line: '' },

  journey: [
    { place: 'Guatemala City', lat: 14.63, lon: -90.51, note: 'Where it started — first jobs at Western Union and SeOnline.' },
    { place: 'Boston', lat: 42.36, lon: -71.06, note: 'Hult International Business School · Marketing + Finance · Class of 2027.' },
  ],

  watching: { title: 'Black Clover', line: 'Asta has no magic and outworks everyone anyway.' },
};
