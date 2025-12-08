const GhostButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className = "",
  children,
  ...props
}) => (
  <button
    {...props}
    className={
      "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition active:scale-[.98] " +
      "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer" +
      className
    }
  >
    {children}
  </button>
);

export default GhostButton;
