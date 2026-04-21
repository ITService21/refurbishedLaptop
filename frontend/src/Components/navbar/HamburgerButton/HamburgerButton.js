import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      className="flex items-center justify-center p-2 text-[#FFFFFF] rounded-lg cursor-pointer whitespace-nowrap hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
      onClick={onClick}
    >
      <div className="w-[40px] h-[40px]">
        {isOpen ? <XMarkIcon /> : <Bars3Icon />}
      </div>
    </button>
  );
};
