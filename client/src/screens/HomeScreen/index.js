import Arena from "../../components/Arena";
import Layout from "../../components/Layout";
import SelectCharacter from "../../components/SelectCharacter";
import { useGameContext } from "../../context";

export default function HomeScreen() {
  const { characterNFT } = useGameContext();

  return (
    <Layout isArena={!!characterNFT?.name}>
      {characterNFT?.name ? <Arena /> : <SelectCharacter />}
    </Layout>
  );
}
