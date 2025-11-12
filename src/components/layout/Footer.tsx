import { CircleUser, Ticket, Youtube } from "lucide-react";
import Brand from "../Brand";

const Footer: React.FC = () => (
  <footer className="mt-10 border-t border-zinc-200 dark:border-zinc-800">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
      <div>
        <Brand />
        <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-xs">
          Nền tảng đặt vé xem phim hiện đại, hỗ trợ nhiều hình thức thanh toán
          và trải nghiệm mượt mà trên mọi thiết bị.
        </p>
      </div>
      <div>
        <div className="font-semibold mb-2">Khám phá</div>
        <ul className="space-y-2">
          <li>
            <a href="#phim" className="hover:underline">
              Phim đang chiếu
            </a>
          </li>
          <li>
            <a href="#lichchieu" className="hover:underline">
              Lịch chiếu
            </a>
          </li>
          <li>
            <a href="#uudai" className="hover:underline">
              Ưu đãi
            </a>
          </li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">Hệ thống rạp</div>
        <ul className="space-y-2">
          <li>TP.HCM</li>
          <li>Hà Nội</li>
          <li>Đà Nẵng</li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">Kết nối</div>
        <div className="flex items-center gap-3">
          <a
            href="#"
            aria-label="YouTube"
            className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Youtube className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="Đăng nhập"
            className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <CircleUser className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="Ưu đãi"
            className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Ticket className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
    <div className="text-xs text-zinc-500 text-center py-4">
      © {new Date().getFullYear()} CineJoy. All rights reserved.
    </div>
  </footer>
);
export default Footer;
