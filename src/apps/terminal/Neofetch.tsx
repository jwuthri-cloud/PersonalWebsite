import { profile } from "../../data/profile";

const ART = `        .:'
    __ :'__
 .'\`__\`-'__\`\`.
:__________.-'
:_________:
 :_________\`-;
  \`.__.-.__.'`;

export function Neofetch({ startTime }: { startTime: number }) {
  const upMs = Date.now() - startTime;
  const mins = Math.floor(upMs / 60000);
  const secs = Math.floor((upMs % 60000) / 1000);
  const uptime = mins > 0 ? `${mins} min${mins > 1 ? "s" : ""}, ${secs} secs` : `${secs} secs`;

  const info: [string, string][] = [
    ["OS", "julienOS 1.0 (Sequoia)"],
    ["Host", "MacBook Pro (browser edition)"],
    ["Kernel", "darwin-webkit 16.0"],
    ["Uptime", uptime],
    ["Shell", "zsh 5.9"],
    ["Resolution", `${window.innerWidth}x${window.innerHeight}`],
    ["DE", "Aqua"],
    ["WM", "react-window-manager"],
    ["Terminal", "julien-term"],
    ["CPU", "V8 JavaScript Engine"],
    ["Memory", "just enough ✨"],
  ];

  const swatches = ["#FF5F57", "#FEBC2E", "#28C840", "#5AC8FA", "#0A84FF", "#A78BFA", "#F472B6", "#fff"];

  return (
    <div className="neofetch">
      <pre className="neo-art">{ART}</pre>
      <div className="neo-info">
        <div className="neo-title">
          <span className="t-user">{profile.username}</span>@<span className="t-host">{profile.hostname}</span>
        </div>
        <div className="neo-rule">{"─".repeat(22)}</div>
        {info.map(([k, v]) => (
          <div key={k}>
            <span className="neo-key">{k}</span>: {v}
          </div>
        ))}
        <div className="neo-swatches">
          {swatches.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}
