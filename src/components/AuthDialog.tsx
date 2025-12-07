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
      <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-zinc-950 p-6 shadow-lg focus:outline-none">
        <div className="flex items-center justify-between mb-4">
          <Dialog.Title className="text-xl font-bold text-white">
            {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản CineJoy"}
          </Dialog.Title>

          <Dialog.Close asChild>
            <button
              aria-label="Đóng"
              className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>
        </div>

        <form className="grid gap-3" onSubmit={(e) => e.preventDefault()}>
          {mode === "register" && (
            <label className="grid gap-1">
              <span className="text-sm font-medium text-white">Họ và tên</span>
              <input
                type="text"
                required
                placeholder="Bingsu"
                className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>
          )}

          <label className="grid gap-1">
            <span className="text-sm font-medium text-white">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="example@example.com"
              className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm font-medium text-white">Mật khẩu</span>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </label>

          {mode === "login" && (
            <button
              type="button"
              className="text-white ml-auto text-xs text-indigo-500 hover:underline"
            >
              Quên mật khẩu?
            </button>
          )}

          {mode === "register" && (
            <label className="grid gap-1">
              <span className="text-sm font-medium text-white">
                Xác nhận mật khẩu
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>
          )}

          <PrimaryButton type="submit" className="mt-2 rounded-md">
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
