// deck.js

const apiUrl = "https://deckofcardsapi.com/api/deck";

export async function createDeck() {
  const response = await fetch(`${apiUrl}/new/shuffle/?deck_count=1`);
  const data = await response.json();
  return data.deck_id;
}

export async function drawCards(deckId, count) {
  const response = await fetch(`${apiUrl}/${deckId}/draw/?count=${count}`);
  const data = await response.json();
  return data.cards;
}
