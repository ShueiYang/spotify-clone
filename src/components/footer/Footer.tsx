import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import {
  NAVIGATION_FOOTER,
  NAVIGATION_ITEMS1,
  NAVIGATION_ITEMS2,
  NAVIGATION_ITEMS3,
} from "./menu.items";

const Footer = () => {
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
                className="flex items-center gap-x-1.5 py-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaGithub size={18} />
                <span className="item-link pb-0">GitHub</span>
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
            <FaInstagram size={16} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-400/20 hover:bg-neutral-400/70"
          >
            <FaTwitter size={16} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-400/20 hover:bg-neutral-400/70"
          >
            <FaFacebook size={16} />
          </button>
        </div>
      </div>

      <div className="mx-6 my-8">
        <div className="flex flex-col justify-between gap-x-12 gap-y-4 border-t border-neutral-400/50 py-8 lg:flex-row">
          <p className="whitespace-nowrap text-sm text-neutral-400">
            &copy;{new Date().getFullYear()} Spotify clone by Shueiyang
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {NAVIGATION_FOOTER.map((item) => (
              <ul key={item.title}>
                <li className="item-link whitespace-nowrap pb-0 text-sm">
                  {item.title}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
