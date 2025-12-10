import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import authApi from "../service/api-auth";
import PrimaryButton from "./PrimaryButton";
import { Text } from "@radix-ui/themes";
import { useToast } from "../hooks/useToast";
import { Input } from "antd";

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
  const { error, success } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await authApi.login(email, password);

      if (response.statusCode === 200) {
        localStorage.setItem("access_token", response.data.accessToken);
        setUser(response.data.user);
        onOpenChange(false);
        setEmail("");
        setPassword("");
        success("Đăng nhập thành công!");
      }
    } catch (e: any) {
      const msg = e.message;
      error(msg);
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
          style={{
            backgroundColor: "var(--gray-1)",
            color: "var(--gray-12)",
          }}
          className="fixed left-1/2 top-1/2 w-[92vw] max-w-md 
          -translate-x-1/2 -translate-y-1/2 rounded-xl p-10 shadow-xl
          
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
              <button className="rounded-md p-2 transition-colors">
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
                <label className="grid gap-1 font-bold">
                  <Text size="2">Họ và tên</Text>
                  <Input
                    size="large"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-xs border px-3 py-1.5
                    border-zinc-200 dark:border-zinc-800
                    text-zinc-900 dark:text-zinc-50
                    focus:outline-none focus:ring-2 
                    focus:ring-indigo-500 dark:focus:ring-indigo-400"
                  />
                </label>

                <label className="grid gap-1">
                  <Text size="2">Số điện thoại</Text>
                  <Input
                    size="large"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="rounded-xs border px-3 py-1.5
                   
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
              <Input
                size="large"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xs border px-3 py-1.5
                border-zinc-200 dark:border-zinc-800
                focus:outline-none focus:ring-2 
                focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </label>

            <label className="grid gap-1">
              <Text size="2">Mật khẩu</Text>
              <Input
                size="large"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xs border px-3 py-1.5
                border-zinc-200 dark:border-zinc-800
                focus:outline-none focus:ring-2 
                focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </label>

            {mode === "register" && (
              <label className="grid gap-1">
                <Text size="2">Xác nhận mật khẩu</Text>
                <Input
                  size="large"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xs border px-3 py-1.5
                 
                  border-zinc-200 dark:border-zinc-800
                  text-zinc-900 dark:text-zinc-50
                  focus:outline-none focus:ring-2 
                  focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
              </label>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="cursor-pointer ml-auto underline"
                >
                  <Text className="text-xs">Quên mật khẩu?</Text>
                </button>
              </div>
            )}

            <PrimaryButton
              type="submit"
              className="mt-4 rounded-md cursor-pointer"
            >
              {mode === "login" ? (
                <span>Đăng nhập</span>
              ) : (
                <span>Tạo tài khoản</span>
              )}
            </PrimaryButton>
          </form>

          <div className="mt-5">
            <Text color="gray" className="mt-3 block text-xs">
              Bằng việc tiếp tục, bạn đồng ý với Điều khoản & Chính sách bảo mật
              của CineJoy.
            </Text>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthDialog;
