import { useEffect } from "react";
import { Store } from "@tauri-apps/plugin-store";
import "./App.css";
import { InitScreen } from "./components";

function App() {
  const store = new Store("store.bin");

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await store.get("configStore");
      console.log(config);
    };

    fetchConfig();
  }, []);

  return (
    <div
      style={{ fontFamily: "Open Sans, sans-serif" }}
      className="text-white text-platform w-screen h-screen bg-[#1e1e1e]"
    >
      <InitScreen></InitScreen>
    </div>
  );
}

export default App;
