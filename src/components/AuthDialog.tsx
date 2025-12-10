import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import authApi from "../service/api-auth";
import PrimaryButton from "./PrimaryButton";
import { Text } from "@radix-ui/themes";

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
        {/* ✅ Overlay đậm – không blur để tránh xuyên nền */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />

        {/* ✅ Content nền CỨNG – KHÔNG trong suốt */}
        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[92vw] max-w-md 
          -translate-x-1/2 -translate-y-1/2 rounded-xl p-10 shadow-xl
          bg-white dark:bg-zinc-900
          border border-zinc-200 dark:border-zinc-800"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title>
              <Text size="5" weight="bold">
                {mode === "login"
                  ? "Chào mừng trở lại"
                  : "Tạo tài khoản CineJoy"}
              </Text>
            </Dialog.Title>

            <Dialog.Close asChild>
              <button className="rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* FORM */}
          <form
            onSubmit={mode === "login" ? handleLogin : handleRegister}
            className="grid gap-3"
          >
            {mode === "register" && (
              <>
                <label className="grid gap-1">
                  <Text size="2">Họ và tên</Text>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-md border px-3 py-2 
                    bg-white dark:bg-zinc-950
                    border-zinc-200 dark:border-zinc-800
                    text-zinc-900 dark:text-zinc-50
                    focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </label>

                <label className="grid gap-1">
                  <Text size="2">Số điện thoại</Text>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-md border px-3 py-2 
                    bg-white dark:bg-zinc-950
                    border-zinc-200 dark:border-zinc-800
                    text-zinc-900 dark:text-zinc-50
                    focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </label>
              </>
            )}

            <label className="grid gap-1">
              <Text size="2">Email</Text>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border px-3 py-2 
                bg-white dark:bg-zinc-950
                border-zinc-200 dark:border-zinc-800
                text-zinc-900 dark:text-zinc-50
                focus:outline-none focus:ring-2 
                focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </label>

            <label className="grid gap-1">
              <Text size="2">Mật khẩu</Text>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border px-3 py-2 
                bg-white dark:bg-zinc-950
                border-zinc-200 dark:border-zinc-800
                text-zinc-900 dark:text-zinc-50
                focus:outline-none focus:ring-2 
                focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </label>

            {mode === "register" && (
              <label className="grid gap-1">
                <Text size="2">Xác nhận mật khẩu</Text>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-md border px-3 py-2 
                  bg-white dark:bg-zinc-950
                  border-zinc-200 dark:border-zinc-800
                  text-zinc-900 dark:text-zinc-50
                  focus:outline-none focus:ring-2 
                  focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </label>
            )}

            {mode === "login" && (
              <button type="button" className="ml-auto text-xs underline">
                Quên mật khẩu?
              </button>
            )}

            <PrimaryButton type="submit" className="mt-2 rounded-md">
              {mode === "login" ? "Đăng nhập" : "Tạo tài khoản"}
            </PrimaryButton>
          </form>

          <Text size="1" color="gray" className="mt-3 block">
            Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật
            của CineJoy.
          </Text>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthDialog;
