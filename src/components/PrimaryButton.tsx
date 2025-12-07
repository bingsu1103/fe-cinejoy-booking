const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = "", children, ...props }) => (
  <button
    {...props}
    className={
      "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition active:scale-[.98] " +
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 " +
      className
    }
  >
    {children}
  </button>
);
export default PrimaryButton;
