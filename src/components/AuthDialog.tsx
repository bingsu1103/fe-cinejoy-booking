import * as Dialog from "@radix-ui/react-dialog";
import { CircleUser, ShieldCheck, X } from "lucide-react";
import GhostButton from "./GhostButton";
import PrimaryButton from "./PrimaryButton";
const AuthDialog: React.FC<{ mode: "login" | "register" }> = ({ mode }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      {mode === "login" ? (
        <GhostButton aria-label="Đăng nhập">
          <CircleUser className="w-4 h-4" />
          Đăng nhập
        </GhostButton>
      ) : (
        <PrimaryButton aria-label="Đăng ký">
          <ShieldCheck className="w-4 h-4" />
          Đăng ký
        </PrimaryButton>
      )}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white dark:bg-zinc-900 p-6 shadow-2xl focus:outline-none">
        <div className="flex items-center justify-between mb-4">
          <Dialog.Title className="text-xl font-bold">
            {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản CineJoy"}
          </Dialog.Title>
          <Dialog.Close asChild>
            <button
              aria-label="Đóng"
              className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </div>
        <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
          {mode === "register" && (
            <label className="grid gap-1">
              <span className="text-sm font-medium">Họ và tên</span>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
          )}
          <label className="grid gap-1">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm font-medium">Mật khẩu</span>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          {mode === "register" && (
            <label className="grid gap-1">
              <span className="text-sm font-medium">Xác nhận mật khẩu</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </label>
          )}

          <PrimaryButton type="submit" className="mt-2">
            {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
          </PrimaryButton>
        </form>
        <p className="mt-3 text-xs text-zinc-500">
          Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật của
          CineJoy.
        </p>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
export default AuthDialog;
