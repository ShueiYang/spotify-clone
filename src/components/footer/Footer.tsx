import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa"
import { 
  NAVIGATION_FOOTER, 
  NAVIGATION_ITEMS1, 
  NAVIGATION_ITEMS2, 
  NAVIGATION_ITEMS3 
} from "./menu.items";



const Footer = () => {

  return (
    <footer className="bg-neutral-900/95 rounded-b-lg">
      <div className="flex flex-col sm:flex-row justify-between mt-8">
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
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="mb-2">Source Code</h3>
              <a 
                href="https://github.com/ShueiYang/spotify-clone"
                className="flex gap-x-1.5 items-center py-1"
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
                  <li className="item-link">
                    {item.title}
                  </li>
                </ul>
              ))}
            </div>
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
        <div className="flex flex-col lg:flex-row justify-between py-8 border-t border-neutral-400/50 gap-x-12 gap-y-4">
          <p className="text-sm text-neutral-400 whitespace-nowrap">
            &copy;{new Date().getFullYear()} Spotify clone by Shueiyang
          </p>     
          <div className="flex flex-wrap gap-x-5 gap-y-2">      
            {NAVIGATION_FOOTER.map((item) => (
              <ul key={item.title}>
                <li className="item-link text-sm pb-0 whitespace-nowrap">
                  {item.title}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;