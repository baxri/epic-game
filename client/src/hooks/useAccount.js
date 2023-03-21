import {
  useAccount as useWagmiAccount,
  useConnect,
  useEnsName,
  useDisconnect,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function useAccount() {
  const { address, isConnected } = useWagmiAccount();
  // const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  return {
    address,
    // ensName,
    disconnect,
    connect,
    isConnected,
  };
}
