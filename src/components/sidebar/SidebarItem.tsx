import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  label: string;
  href: string;
  active?: boolean;
  icon: IconType;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  active,
  icon: Icon,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-auto w-full cursor-pointer flex-row items-center gap-x-4
        py-1 font-medium text-neutral-400 transition hover:text-white`,
        active && "text-white",
      )}
    >
      <Icon size={30} />
      <span className="w-full truncate">{label}</span>
    </Link>
  );
};

export default SidebarItem;
