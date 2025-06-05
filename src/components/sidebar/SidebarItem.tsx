import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { SvgIcon, SvgIconName } from "../svg/SvgIcon";

export interface SidebarItemProps {
  label: string;
  href: string;
  active?: boolean;
  icon: SvgIconName;
}

export function SidebarItem({
  label,
  href,
  active,
  icon: iconName,
}: Readonly<SidebarItemProps>) {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 font-medium text-neutral-400 transition hover:text-white`,
        active && "text-white",
      )}
    >
      <SvgIcon
        name={iconName}
        size={30}
      />
      <span className="w-full truncate">{label}</span>
    </Link>
  );
}
