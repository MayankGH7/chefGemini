import chefLogo from "/chef.png"
import geminiText from "../assets/Google_Gemini_logo.svg"

export default function Header() {
  return (
    <>
    <header className="flex justify-center items-center py-5  shadow-md shadow-gray-500 dark:shadow-white">
      <ul className="flex gap-x-6 items-end">
        <li><a href="/"><img className="w-14 drop-shadow-[0_0_5px_white] " src={chefLogo} alt="Chef logo" /></a></li>

        <li className="text-4xl flex gap-x-2 items-end">
          <p className="bg-gemini-gradient select-none">
            <span className="font-[450] sm:font-medium">
              <span className="text-5xl">C</span>hef
            </span>
          </p>
            <img className="w-30 mb-2 xs:mb-1 " src={geminiText} alt="gemini text logo" /> 
        </li>

      </ul>
    </header>
    </>
  )
}
