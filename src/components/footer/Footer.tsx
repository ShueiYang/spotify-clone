import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { NAVIGATION_ITEMS1, NAVIGATION_ITEMS2, NAVIGATION_ITEMS3 } from "./menu.items";



const Footer = () => {

  return (
    <footer className="bg-neutral-900/95 rounded-b-lg">
      <div className="flex flex-col sm:flex-row justify-between">
        <nav className="flex flex-col sm:flex-row flex-wrap gap-y-8 gap-x-12 p-6 max-w-[675px] xl:flex-1 xl:justify-between">
          <div>
            <h3 className="mb-2">Company</h3>
            {NAVIGATION_ITEMS1.map((item) => (
              <ul key={item.title}>
                <li className="item-link">
                  {item.title}
                </li>
              </ul>
            ))}
          </div>
          <div>
            <h3 className="mb-2">Communities</h3>
            {NAVIGATION_ITEMS2.map((item) => (
              <ul key={item.title}>
                <li className="item-link">
                  {item.title}
                </li>
              </ul>
            ))}
          </div>
          <div>
            <h3 className="mb-2">Useful links</h3>
            {NAVIGATION_ITEMS3.map((item) => (
              <ul key={item.title}>
                <li className="item-link">
                  {item.title}
                </li>
              </ul>
            ))}
          </div>
        </nav>
        
        <div className="flex gap-x-4 px-6 py-4">
          <button className="flex w-10 h-10 justify-center items-center bg-neutral-400/20 rounded-full hover:bg-neutral-400/70">
            <FaInstagram size={16}/>
          </button>
          <button className="flex w-10 h-10 justify-center items-center bg-neutral-400/20 rounded-full hover:bg-neutral-400/70">
            <FaTwitter size={16}/>
          </button>
          <button className="flex w-10 h-10 justify-center items-center bg-neutral-400/20 rounded-full hover:bg-neutral-400/70">
            <FaFacebook size={16}/>
          </button>
        </div>
      </div>

      <div className="mx-6 my-8">
        <p className="py-8 border-t border-neutral-400/50 text-sm text-neutral-400">
          &copy;{new Date().getFullYear()} Spotify clone by Shueiyang
        </p>
      </div>
    </footer>
  )
}

export default Footer;