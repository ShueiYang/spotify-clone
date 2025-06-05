import {
  NAVIGATION_FOOTER,
  NAVIGATION_ITEMS1,
  NAVIGATION_ITEMS2,
  NAVIGATION_ITEMS3,
} from "./menu.items";
import { Github } from "../svg/logos/Github";
import { Discord } from "../svg/logos/Discord";
import { Battlenet } from "../svg/logos/Battlenet";
import { Instagram } from "../svg/logos/Instagram";

export function Footer() {
  return (
    <footer className="rounded-b-lg bg-neutral-900/95">
      <div className="mt-8 flex flex-col justify-between sm:flex-row">
        <nav className="flex max-w-[675px] flex-col flex-wrap gap-x-12 gap-y-8 p-6 sm:flex-row xl:flex-1 xl:justify-between">
          <div>
            <h3 className="mb-2">Company</h3>
            {NAVIGATION_ITEMS1.map((item) => (
              <ul key={item.title}>
                <li className="item-link">{item.title}</li>
              </ul>
            ))}
          </div>
          <div>
            <h3 className="mb-2">Communities</h3>
            {NAVIGATION_ITEMS2.map((item) => (
              <ul key={item.title}>
                <li className="item-link">{item.title}</li>
              </ul>
            ))}
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="mb-2">Source Code</h3>
              <a
                href="https://github.com/ShueiYang/spotify-clone"
                className="flex gap-x-1.5 py-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github
                  width={21}
                  height={21}
                  fill="#FFF"
                />
                <span className="item-link">GitHub</span>
              </a>
            </div>
            <div className="mt-4">
              <h3 className="mb-2">Useful links</h3>
              {NAVIGATION_ITEMS3.map((item) => (
                <ul key={item.title}>
                  <li className="item-link">{item.title}</li>
                </ul>
              ))}
            </div>
          </div>
        </nav>
        <div className="flex gap-x-4 px-6 py-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-400/20 hover:bg-neutral-400/70"
          >
            <Discord
              width={18}
              height={18}
              fill="#FFF"
            />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-400/20 hover:bg-neutral-400/70"
          >
            <Battlenet
              width={18}
              height={18}
              fill="#FFF"
            />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-400/20 hover:bg-neutral-400/70"
          >
            <Instagram
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>

      <div className="mx-6 my-8">
        <div className="flex flex-col justify-between gap-x-12 gap-y-4 border-t border-neutral-400/50 py-8 lg:flex-row">
          <p className="text-sm whitespace-nowrap text-neutral-400">
            &copy;{new Date().getFullYear()} Spotify clone by Shueiyang
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {NAVIGATION_FOOTER.map((item) => (
              <ul key={item.title}>
                <li className="item-link pb-0 text-sm whitespace-nowrap">
                  {item.title}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
