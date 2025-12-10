import { Link } from "react-router";

const Brand: React.FC = () => (
  <div className="flex items-center h-16">
    <Link to="/" className="flex items-center h-16 gap-2 select-none">
      <div className="w-8 h-8 bg-blue-500 rounded-xl flex-shrink-0" />
      <span className="text-xl font-extrabold tracking-tight leading-[1] flex items-center h-16">
        CineJoy
      </span>
    </Link>
  </div>
);
export default Brand;
