const TYPE_EFFECTIVENESS = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2,
  },
  fairy: {
    fire: 0.5,
    fighting: 2,
    poison: 0.5,
    dragon: 2,
    dark: 2,
    steel: 0.5,
  },
};

const calculateTypeEffectiveness = (attackerType, defenderTypes) => {
  let effectiveness = 1;
  defenderTypes.forEach((defenderType) => {
    if (
      TYPE_EFFECTIVENESS[attackerType] &&
      TYPE_EFFECTIVENESS[attackerType][defenderType.type.name]
    ) {
      effectiveness *= TYPE_EFFECTIVENESS[attackerType][defenderType.type.name];
    }
  });
  return effectiveness;
};

const calculateDamage = (attacker, defender) => {
  let totalDamage = 0;
  attacker.types.forEach((attackerType) => {
    const effectiveness = calculateTypeEffectiveness(
      attackerType.type.name,
      defender.types
    );
    const attackStat = attacker.stats.find(
      (stat) => stat.stat.name === "attack"
    ).base_stat;
    const defenseStat = defender.stats.find(
      (stat) => stat.stat.name === "defense"
    ).base_stat;
    const damage = (attackStat / defenseStat) * effectiveness * 50;
    totalDamage += damage;
  });
  return totalDamage;
};

export const predictBattle = (pokemon1, pokemon2) => {
  const damage1to2 = calculateDamage(pokemon1, pokemon2);
  const damage2to1 = calculateDamage(pokemon2, pokemon1);

  const hp1 = pokemon1.stats.find((stat) => stat.stat.name === "hp").base_stat;
  const hp2 = pokemon2.stats.find((stat) => stat.stat.name === "hp").base_stat;

  const rounds1Wins = Math.ceil(hp2 / damage1to2);
  const rounds2Wins = Math.ceil(hp1 / damage2to1);

  let winner, loser, winChance;
  if (rounds1Wins <= rounds2Wins) {
    winner = pokemon1;
    loser = pokemon2;
    winChance = Math.round((rounds2Wins / (rounds1Wins + rounds2Wins)) * 100);
  } else {
    winner = pokemon2;
    loser = pokemon1;
    winChance = Math.round((rounds1Wins / (rounds1Wins + rounds2Wins)) * 100);
  }

  const explanation = `${
    winner.name
  } is likely to win due to a type advantage and/or higher stats. It would take approximately ${Math.min(
    rounds1Wins,
    rounds2Wins
  )} rounds for ${winner.name} to defeat ${
    loser.name
  }, while it would take ${Math.max(rounds1Wins, rounds2Wins)} rounds for ${
    loser.name
  } to defeat ${winner.name}.`;

  return { winner, winChance, explanation };
};
