import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "vi" ? "en" : "vi")}
      className="flex items-center gap-2 px-3 py-1.5 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition text-white"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm uppercase">{language}</span>
    </button>
  );
}
