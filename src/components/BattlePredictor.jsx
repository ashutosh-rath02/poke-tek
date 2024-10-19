/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { predictBattle } from "../utils/battlePredictorLogic";

const BattlePredictor = ({ pokemon1, pokemon2 }) => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (pokemon1 && pokemon2) {
      const result = predictBattle(pokemon1, pokemon2);
      setPrediction(result);
    }
  }, [pokemon1, pokemon2]);

  if (!pokemon1 || !pokemon2) {
    return <div>Select two Pokémon to predict a battle outcome.</div>;
  }

  return (
    <div className="battle-predictor p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Battle Prediction</h2>
      {prediction && (
        <>
          <p className="mb-2">
            Predicted Winner:{" "}
            <span className="font-semibold">{prediction.winner.name}</span>
          </p>
          <p className="mb-2">
            Win Chance:{" "}
            <span className="font-semibold">{prediction.winChance}%</span>
          </p>
          <p className="mb-2">Explanation: {prediction.explanation}</p>
        </>
      )}
    </div>
  );
};

export default BattlePredictor;
