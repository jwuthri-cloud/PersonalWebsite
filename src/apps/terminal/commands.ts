export type CommandMeta = {
  name: string;
  summary: string;
  usage: string;
};

// Single source of truth for `help`, `man`, and tab-completion.
export const COMMANDS: CommandMeta[] = [
  { name: "help", summary: "List available commands", usage: "help" },
  { name: "about", summary: "A little about me", usage: "about" },
  { name: "projects", summary: "List my projects", usage: "projects" },
  { name: "resume", summary: "Print my résumé", usage: "resume" },
  { name: "contact", summary: "How to reach me", usage: "contact" },
  { name: "social", summary: "My links around the web", usage: "social" },
  { name: "open", summary: "Open an app or file in a window", usage: "open <app|file>" },
  { name: "ls", summary: "List directory contents", usage: "ls [-la] [path]" },
  { name: "cd", summary: "Change directory", usage: "cd [path]" },
  { name: "pwd", summary: "Print working directory", usage: "pwd" },
  { name: "cat", summary: "Print a file's contents", usage: "cat <file>" },
  { name: "tree", summary: "Show the directory tree", usage: "tree [path]" },
  { name: "echo", summary: "Print text", usage: "echo <text>" },
  { name: "whoami", summary: "Print the current user", usage: "whoami" },
  { name: "date", summary: "Show the current date & time", usage: "date" },
  { name: "neofetch", summary: "System information, with flair", usage: "neofetch" },
  { name: "history", summary: "Show command history", usage: "history" },
  { name: "man", summary: "Show the manual for a command", usage: "man <command>" },
  { name: "clear", summary: "Clear the screen", usage: "clear" },
  { name: "exit", summary: "Close this terminal window", usage: "exit" },
];

export const COMMAND_NAMES = COMMANDS.map((c) => c.name);

// A few extra completers + easter eggs the help menu doesn't advertise.
export const HIDDEN_COMMANDS = ["sudo", "vim", "nano", "emacs", "coffee", "ls -la", "make"];
