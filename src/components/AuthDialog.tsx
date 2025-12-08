import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import authApi from "../service/api-auth";
import PrimaryButton from "./PrimaryButton";

const AuthDialog: React.FC<{
  mode: "login" | "register";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setUser: (v: IFetchUserRes) => void;
}> = ({ mode, open, onOpenChange, setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await authApi.login(email, password);

    if (res.statusCode === 200) {
      localStorage.setItem("access_token", res.data.accessToken);
      setUser(res.data.user);
      onOpenChange(false);
      setEmail("");
      setPassword("");
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Mật khẩu không trùng khớp");
    }

    await authApi.register(username, email, password, phone);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white dark:bg-zinc-950 p-10 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-bold text-white">
              {mode === "login" ? "Chào mừng trở lại" : "Tạo tài khoản CineJoy"}
            </Dialog.Title>

            <Dialog.Close asChild>
              <button className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <form
            onSubmit={mode === "login" ? handleLogin : handleRegister}
            className="grid gap-3"
          >
            {mode === "register" && (
              <>
                <label className="grid gap-1">
                  <span className="text-sm font-medium text-white">
                    Họ và tên
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Bingsu"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-white">
                    Số điện thoại
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="0123 456 789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </label>
              </>
            )}

            <label className="grid gap-1">
              <span className="text-sm font-medium text-white">Email</span>
              <input
                type="email"
                required
                placeholder="example@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm font-medium text-white">Mật khẩu</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </label>

            {mode === "login" && (
              <button
                type="button"
                className="text-white ml-auto text-xs hover:underline"
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-white rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </label>
            )}

            <PrimaryButton type="submit" className="mt-2 rounded-md">
              {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </PrimaryButton>
          </form>
          <p className="mt-3 text-xs text-zinc-500">
            Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật
            của CineJoy.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthDialog;
