/* eslint-disable react/prop-types */
const StatBar = ({ statName, value, max = 255 }) => (
  <div className="mb-2">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700 capitalize">
        {statName}
      </span>
      <span className="text-sm font-medium text-gray-700">{value}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  </div>
);

const FusionResult = ({ fusedPokemon, parentPokemon, onNewFusion }) => {
  return (
    <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6">
        {fusedPokemon.name}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <img
            src={parentPokemon[0].sprites.front_default}
            alt={parentPokemon[0].name}
            className="mx-auto"
          />
          <p className="mt-2 font-semibold">{parentPokemon[0].name}</p>
        </div>
        <div className="text-center">
          <img
            src={fusedPokemon.sprite}
            alt={fusedPokemon.name}
            className="mx-auto"
          />
          <p className="mt-2 font-semibold">{fusedPokemon.name}</p>
        </div>
        <div className="text-center">
          <img
            src={parentPokemon[1].sprites.front_default}
            alt={parentPokemon[1].name}
            className="mx-auto"
          />
          <p className="mt-2 font-semibold">{parentPokemon[1].name}</p>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Types</h3>
          <div className="flex flex-wrap gap-2">
            {fusedPokemon.types.map((type, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm capitalize"
              >
                {type.type ? type.type.name : type}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold mt-6 mb-4">Abilities</h3>
          <ul className="list-disc list-inside">
            {fusedPokemon.abilities.map((ability, index) => (
              <li key={index} className="capitalize">
                {ability}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mt-6 mb-4">Physical Traits</h3>
          <p>Height: {fusedPokemon.height} m</p>
          <p>Weight: {fusedPokemon.weight} kg</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Stats</h3>
          {fusedPokemon.stats.map((stat, index) => (
            <StatBar
              key={index}
              statName={stat.stat.name}
              value={stat.base_stat}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={onNewFusion}
          className="px-6 py-3 bg-green-500 text-white rounded-full transition-colors duration-200 hover:bg-green-600"
        >
          New Fusion
        </button>
      </div>
    </div>
  );
};

export default FusionResult;
