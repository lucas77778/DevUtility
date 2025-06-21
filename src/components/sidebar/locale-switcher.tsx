import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { locales, dynamicActivate } from "@/i18n";
import { i18n } from "@lingui/core";
import { useState, useEffect } from "react";

export function LocaleSwitcher() {
  const [currentLocale, setCurrentLocale] = useState(i18n.locale);

  useEffect(() => {
    const handleLocaleChange = () => {
      setCurrentLocale(i18n.locale);
    };

    // Listen for locale changes
    i18n.on("change", handleLocaleChange);

    return () => {
      i18n.removeListener("change", handleLocaleChange);
    };
  }, []);

  const handleLocaleChange = async (locale: string) => {
    await dynamicActivate(locale);
    setCurrentLocale(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        {Object.entries(locales).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleLocaleChange(code)}
            className={currentLocale === code ? "bg-accent" : ""}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
