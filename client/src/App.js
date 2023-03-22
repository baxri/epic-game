import { configureChains, createClient, WagmiConfig } from "wagmi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { publicProvider } from "wagmi/providers/public";
import { polygon } from "wagmi/chains";

import "react-toastify/dist/ReactToastify.css";

import HomeScreen from "./screens/HomeScreen";

import { GameProvider } from "./context";

const { provider, webSocketProvider } = configureChains(
  [polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

function App() {
  return (
    <WagmiConfig client={client}>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
          <ToastContainer />
        </Router>
      </GameProvider>
    </WagmiConfig>
  );
}

export default App;
