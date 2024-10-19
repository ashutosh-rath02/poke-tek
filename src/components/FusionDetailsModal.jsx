/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const FusionDetailsModal = ({ fusionResult, onClose }) => {
  if (!fusionResult) return null;

  const statsData = fusionResult.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4 text-center text-indigo-800">
          {fusionResult.name} Details
        </h2>
        <div className="flex justify-center mb-6">
          <img
            src={fusionResult.sprite}
            alt={fusionResult.name}
            className="w-40 h-40 object-contain bg-gray-100 rounded-full shadow-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-xl mb-2 text-indigo-700">
              Types
            </h3>
            <div className="flex flex-wrap gap-2">
              {fusionResult.types.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium capitalize"
                >
                  {typeof type === "string" ? type : type.type.name}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl mb-2 text-indigo-700">
              Abilities
            </h3>
            <ul className="list-disc list-inside">
              {fusionResult.abilities.map((ability, index) => (
                <li key={index} className="capitalize text-gray-700">
                  {typeof ability === "string" ? ability : ability.ability.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-xl mb-2 text-indigo-700">Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mb-6">
          <div>
            <h3 className="font-semibold text-indigo-700">Height</h3>
            <p className="text-2xl font-bold text-gray-700">
              {fusionResult.height} m
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-700">Weight</h3>
            <p className="text-2xl font-bold text-gray-700">
              {fusionResult.weight} kg
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-lg font-semibold"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default FusionDetailsModal;
