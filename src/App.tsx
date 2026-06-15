import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { WindowManagerProvider } from "./os/WindowManager";
import { Desktop } from "./components/Desktop";
import { BootScreen } from "./components/BootScreen";

export default function App() {
  const [booted, setBooted] = useState(false);
  return (
    <WindowManagerProvider>
      <Desktop />
      <AnimatePresence>
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
      </AnimatePresence>
    </WindowManagerProvider>
  );
}
