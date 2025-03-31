import "./App.css";
import andreProfileIcon from "./assets/andre-profile-icon.png";
import { InstagramLogo, YoutubeLogo, TiktokLogo } from "@phosphor-icons/react";

function App() {
  const links = [
    { label: "YouTube", url: "https://www.youtube.com/@avalentim7", type: "youtube", icon: YoutubeLogo },
    { label: "Instagram", url: "https://www.instagram.com/avalentim7/", type: "instagram", icon: InstagramLogo },
    { label: "TikTok", url: "https://www.tiktok.com/@avalentimguitar_", type: "tiktok", icon: TiktokLogo },
  ];

  function getColor(linkType: "youtube" | "instagram" | "tiktok" | string) {
    switch (linkType) {
      case "youtube":
        return "bg-gradient-to-r from-gray-900 to-gray-950 hover:from-gray-950/60 hover:to-gray-950 border-1 border-red-500";
      case "instagram":
        return "bg-gradient-to-r from-gray-900 to-gray-950 hover:from-gray-950/60 hover:to-gray-950 border-1 border-orange-400";
      case "tiktok":
        return "bg-gradient-to-r from-gray-900 to-gray-950 hover:from-gray-950/60 hover:to-gray-950 border-1 border-gray-600";
      default:
        return "";
    }
  }

  function getIconColor(linkType: "youtube" | "instagram" | "tiktok" | string) {
    switch (linkType) {
      case "youtube":
        return "#fc5252";
      case "instagram":
        return "#fc9535";
      case "tiktok":
        return "#e7e7e7";
      default:
        return "";
    }
  }


  return (
    <div className="bg-gradient-to-tl from-gray-900 to-gray-950 text-white h-screen items-center flex flex-col overflow-hidden">
      <div className="flex flex-col w-full h-full mx-4 sm:w-140 sm:mx-0 rounded-lg sm:p-4 pt-3 pl-6 pb-6 pr-6 relative sm:my-4">
        <div className="flex flex-col items-center justify-center mt-4">
          <img className="sm:w-56 sm:object-cover w-full h-96 object-cover rounded-lg mb-4 shadow" src={andreProfileIcon} alt="" />
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-3xl">André Valentim</h1>
            <div className="flex gap-3 tracking-wide text-gray-500">
              <h2>Guitarist</h2> |<h2>Software Engineer</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-4">
          <p className="mb-2">Olá, sou o André. 👋🏻</p>
          <p className="text-gray-400 sm:text-normal text-center">Crio conteúdos sobre guitarra com dicas, covers e riffs que fazem o dia valer a pena.</p>
          <p className="text-gray-400 sm:text-normal text-center">Desenvolvedor, apaixonado por transformar ideias em código e música.</p>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.url}
                className={`flex w-full gap-2 items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2 ${getColor(
                  link.type
                )}`}
              >
                <Icon size={32} color={getIconColor(link.type)}/>
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
      <div className="mb-4 text-xs text-gray-600">@ 2025</div>
    </div>
  );
}

export default App;
