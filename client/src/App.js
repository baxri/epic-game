import {
  configureChains,
  mainnet,
  createClient,
  WagmiConfig,
  goerli,
} from "wagmi";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { hardhat } from "wagmi/chains";
import { InjectedConnector } from "@wagmi/core";

import "react-toastify/dist/ReactToastify.css";

import HomeScreen from "./screens/HomeScreen";
import ArenaScreen from "./screens/ArenaScreen";

import { GameProvider } from "./context";

const { provider, webSocketProvider } = configureChains(
  [goerli],
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
            <Route path="/play" element={<HomeScreen />} />
          </Routes>
          <ToastContainer />
        </Router>
      </GameProvider>
    </WagmiConfig>
  );
}

export default App;
