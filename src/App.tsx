import { useEffect } from "react";
import { Store } from "@tauri-apps/plugin-store";
import "./css/main.css";
import { InitScreen, MainView } from "./components";
import { appDataDir } from "@tauri-apps/api/path";
import { uiStore } from "./utils/stores/uistore";
function App() {
  const store = new Store("store.bin");
  const screen = uiStore();
  useEffect(() => {
    const fetchConfig = async () => {
      const config = await store.get("configStore");
      const app_dir = await appDataDir();
    };
    fetchConfig();
  }, []);

  return (
    <div className="text-white text-platform w-screen h-screen bg-[#1e1e1e]">
      {screen.screen === "init" ? <InitScreen /> : <MainView />}
    </div>
  );
}

export default App;
