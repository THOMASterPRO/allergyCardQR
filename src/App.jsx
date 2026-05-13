import {LANGUAGE_OPTIONS} from "./locales/index";
import "./App.css";

function App() {
  const params = new URLSearchParams(window.location.search);

  const lang = params.get("lang") || "en";
  const rawSeverity = params.get("severity");
  const severity = rawSeverity && rawSeverity !== "undefined" ? rawSeverity : "mild";

  const allergiesParam = params.get("allergies") || "";

  const allergyKeys = allergiesParam
    .split(",")
    .map((key) => key.trim().replace(/-+$/, ""))
    .filter(Boolean);

  const data = LANGUAGE_OPTIONS[lang];

  if (!data) {
    return <div>Language not found.</div>;
  }

  const instruction = data.instructions[severity];

  return (
    <div className="container">
      <div className="card">

        <div className="front">
          <p>{instruction.front}</p>

          <ul>
            {allergyKeys.map((key) => (
              <li key={key}>
                {data.allergies[key]}
              </li>
            ))}
          </ul>
        </div>

        <div className="back">
          <p>{instruction.back}</p>
        </div>

      </div>
    </div>
  );
}

export default App;