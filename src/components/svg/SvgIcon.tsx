import React from "react";
import {
  House,
  Search,
  LucideProps,
  User,
  ChevronLeft,
  ChevronRight,
  Plus,
  Heart,
  XIcon,
  ListMusic,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  RefreshCw,
  Volume,
  Volume2,
  Volume1,
  VolumeX,
} from "lucide-react";

export type SvgIconName = keyof typeof SVG_ICONS;

const SVG_ICONS = {
  House,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
  ListMusic,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  RefreshCw,
  Plus,
  Heart,
  XIcon,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
};

interface SvgIconProps
  extends Omit<LucideProps, "ref">,
    React.RefAttributes<SVGSVGElement> {
  name: SvgIconName;
}

/**
 * Renders an SVG icon based on the provided name.
 */
export function SvgIcon({ name, ...rest }: Readonly<SvgIconProps>) {
  const Icon = SVG_ICONS[name];

  return <Icon {...rest} />;
}
