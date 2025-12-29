import { getRandomEmoji } from './utilities.js'
import { useState } from "react";
import "./styles.css";

export const emojisDefault = [
  { id: 1, value: "🍋" },
  { id: 2, value: "🍒" },
  { id: 3, value: "🍊" },
  { id: 4, value: "💎" },
  { id: 5, value: "🍉" },
];

function App() {
  const [emojis, setEmojis] = useState(emojisDefault);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  function calculateScore(finalEmojis) {
    const counts = {};

    finalEmojis.forEach((e) => {
      counts[e.value] = (counts[e.value] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(counts));
    const allSame = maxCount === finalEmojis.length;

    if (allSame) {
      setScore(100);
      setMessage("🎉 JACKPOT! 🎉");
    } else if (maxCount === 4) {
      setScore(50);
      setMessage("Great! Four in a row!");
    } else if (maxCount === 3) {
      setScore(20);
      setMessage("Nice! Three matching!");
    } else if (maxCount === 2) {
      setScore(5);
      setMessage("Two matching!");
    } else {
      setScore(0);
      setMessage("No matches, try again!");
    }
  }

  // ahora updateEmoji sabe si es el último cambio de la tirada
  function updateEmoji(id, value, isLast = false) {
    setEmojis((prevEmojis) => {
      const updated = prevEmojis.map((emoji) =>
        emoji.id === id ? { ...emoji, value } : emoji
      );

      if (isLast) {
        calculateScore(updated); // ⬅ aquí usamos el array ACTUALIZADO
      }

      return updated;
    });
  }

  function handleGenerate() {
    for (let i = 0; i < emojis.length; i++) {
      setTimeout(() => {
        const isLast = i === emojis.length - 1;
        updateEmoji(emojis[i].id, getRandomEmoji(), isLast);
      }, i * 100);
    }
  }

  return (
    <section>
      <h2>Check your luck</h2>
      <p>Create the line of identical emojis</p>

      {message === "🎉 JACKPOT! 🎉" && (
        <h1 style={{ fontSize: "3rem", color: "gold" }}>JACKPOT!</h1>
      )}

      <ul>
        {emojis.map(({ id, value }) => (
          <li key={id}>{value}</li>
        ))}
      </ul>

      <button onClick={handleGenerate}>Generate</button>

      <p>
        <strong>Score:</strong> {score}
      </p>
      <p>{message}</p>
    </section>
  );
}

export default App;
