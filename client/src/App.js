import { configureChains, mainnet, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import HomeScreen from "./components/HomeScreen";
import { GameProvider } from "./context";

const { provider, webSocketProvider } = configureChains(
  [mainnet],
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
        <div className="h-screen bg-ellie-background bg-cover bg-center">
          <HomeScreen />
        </div>
      </GameProvider>
    </WagmiConfig>
  );
}

export default App;
