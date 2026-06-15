import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppleLogo } from "./AppleLogo";

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      // ease toward 100 with a little irregularity, like a real boot
      p += Math.random() * 16 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setTimeout(onDone, 450);
      }
      setProgress(Math.min(p, 100));
    }, 180);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <motion.div
      className="bootscreen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AppleLogo size={72} className="boot-apple" />
      <div className="boot-bar">
        <div className="boot-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </motion.div>
  );
}
