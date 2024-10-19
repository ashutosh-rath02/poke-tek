import FusionLab from "./components/FusionLab";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <header className="text-black py-6">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto flex items-center justify-between"
        >
          <h1 className="text-3xl font-bold">Pokémon Fusion Lab</h1>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <img src="/pokeball.svg" alt="Pokeball" className="w-10 h-10" />
          </motion.div>
        </motion.div>
      </header>
      <main className="container mx-auto">
        <FusionLab />
      </main>
      <footer className="bg-indigo-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Pokémon Fusion Laboratory. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
