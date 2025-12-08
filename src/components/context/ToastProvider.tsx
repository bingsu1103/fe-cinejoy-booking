import * as Toast from "@radix-ui/react-toast";
import { toastStore } from "../../store/toastStore";

export default function ToastProvider() {
  const { toasts, remove } = toastStore();

  return (
    <Toast.Provider swipeDirection="right" duration={3000}>
      {toasts.map((t) => (
        <Toast.Root
          key={t.id}
          open={true}
          onOpenChange={() => remove(t.id)}
          className={`
            px-4 py-3 rounded-md shadow-lg border
            ${
              t.type === "success"
                ? "bg-green-400 text-white"
                : t.type === "error"
                ? "bg-red-600 text-white"
                : "bg-zinc-800 text-white"
            }
          `}
        >
          <Toast.Title className="font-medium text-sm">{t.message}</Toast.Title>
        </Toast.Root>
      ))}

      <Toast.Viewport
        className="
          fixed top-15 right-6 
          flex flex-col gap-2 
          w-96 max-w-[90vw]
          z-9999
        "
      />
    </Toast.Provider>
  );
}
