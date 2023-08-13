import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
  label: string
  href: string
  active?: boolean
  icon: IconType
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  active,
  icon: Icon
}) => {

  return (
    <Link
      href={href}
      className={twMerge(`flex flex-row items-center w-full h-auto gap-x-4 font-medium
        cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && "text-white"
      
      )}
    >
      <Icon size={30} />
      <span className="truncate w-full">
        {label}
      </span>
    </Link>
  )
}

export default SidebarItem;