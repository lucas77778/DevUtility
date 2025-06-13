import { useDebouncedValue } from "foxact/use-debounced-value";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Zap,
  Clipboard,
  FileText,
  Trash2,
  Settings,
  Copy,
  HelpCircle,
  ChevronDown,
  ZapIcon,
  SettingsIcon,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// import { InvokeFunction } from "@/tauri";
import { utilityInvoke } from "@/utilities/invoke";
import { IndentStyle, IndentStyleEnum, InvokeFunction } from "../types";
import { copyToClipboard, readFromClipboard } from "@/lib/copyboard";

const jsonExampleInput = `{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      },
      {
        "category": "fiction",
        "author": "J. R. R. Tolkien",
        "title": "The Lord of the Rings",
        "isbn": "0-395-19395-8",
        "price": 22.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95
    }
  }
}`;

export default function JsonFormatterPage() {
  const [inputJson, setInputJson] = useState(jsonExampleInput);
  const debouncedInputJson = useDebouncedValue(inputJson, 100, false);

  const [outputJson, setOutputJson] = useState("");
  const [style, setStyle] = useState<IndentStyle>({
    [IndentStyleEnum.Spaces]: 2,
  }); // "2", "4", "tab"

  // Settings states
  const [autoDetect, setAutoDetect] = useState(true);
  const [allowTrailingCommas, setAllowTrailingCommas] = useState(false);
  const [autoRepair, setAutoRepair] = useState(true);
  const [continuousMode, setContinuousMode] = useState(true);
  const [sortKeys, setSortKeys] = useState(true);

  const handleFormat = async () => {
    const result = await utilityInvoke(InvokeFunction.FormatJson, {
      input: debouncedInputJson,
      style,
    });
    console.log(result);
    setOutputJson(result);
  };

  useEffect(() => {
    handleFormat();
  }, [debouncedInputJson, style]);

  const handleLoadSample = () => {
    setInputJson(jsonExampleInput);
  };

  const handlePasteFromClipboard = async () => {
    const clipboardContent = await readFromClipboard();
    setInputJson(clipboardContent);
  };

  const handleClearInput = () => {
    setInputJson("");
    setOutputJson("");
  };

  const handleResetSettings = () => {
    setAutoDetect(true);
    setAllowTrailingCommas(false);
    setAutoRepair(true);
    setContinuousMode(true);
    setSortKeys(true);
  };

  const getStyleLabel = (value: string) => {
    if (value === "tab") return "Tabs";
    return `${value} spaces`;
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
        {/* Input Section */}
        <div className="flex flex-col gap-2 bg-background/95 p-3 rounded-lg">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-sm font-medium text-foreground/80">
              Input
            </span>
            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                    onClick={handleFormat}
                    // disabled={continuousMode}
                  >
                    <ZapIcon size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-popover text-popover-foreground border"
                >
                  <p>Format JSON</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                    onClick={handlePasteFromClipboard}
                  >
                    <Clipboard size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-popover text-popover-foreground border"
                >
                  <p>Paste from Clipboard</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                    onClick={handleLoadSample}
                  >
                    <FileText size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-popover text-popover-foreground border"
                >
                  <p>Load Sample JSON</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                    onClick={handleClearInput}
                  >
                    <Trash2 size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-popover text-popover-foreground border"
                >
                  <p>Clear Input</p>
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-foreground h-8 w-8"
                    >
                      <SettingsIcon size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-2 min-w-96 p-1">
                    <div className="flex gap-2">
                      <Checkbox
                        id="auto-detect"
                        checked={autoDetect}
                        onCheckedChange={(checked) => {
                          if (checked === "indeterminate") {
                            setAutoDetect(false);
                          } else {
                            setAutoDetect(checked);
                          }
                        }}
                        className="mt-1"
                      />
                      <Label
                        htmlFor="auto-detect"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        Auto detect when input is a valid JSON
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="allow-trailing"
                        checked={allowTrailingCommas}
                        onCheckedChange={(checked) => {
                          if (checked === "indeterminate") {
                            setAllowTrailingCommas(false);
                          } else {
                            setAllowTrailingCommas(checked);
                          }
                        }}
                        className="mt-1"
                      />
                      <Label
                        htmlFor="allow-trailing"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        Allow trailing commas and comments in JSON
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="auto-repair"
                        checked={autoRepair}
                        onCheckedChange={(checked) => {
                          if (checked === "indeterminate") {
                            setAutoRepair(false);
                          } else {
                            setAutoRepair(checked);
                          }
                        }}
                        className="mt-1"
                      />
                      <Label
                        htmlFor="auto-repair"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        <div>
                          Auto repair invalid JSON if possible
                          <div className="text-xs text-muted-foreground font-normal">
                            Fix missing quotes, replace Python constants, strip
                            trailing commas, etc.
                          </div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="continuous-mode"
                        checked={continuousMode}
                        onCheckedChange={(checked) => {
                          if (checked === "indeterminate") {
                            setContinuousMode(false);
                          } else {
                            setContinuousMode(checked);
                          }
                        }}
                        className="mt-1"
                      />
                      <Label
                        htmlFor="continuous-mode"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        Continuous Mode: format the input continuously as you
                        type
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="sort-keys"
                        checked={sortKeys}
                        onCheckedChange={(checked) => {
                          if (checked === "indeterminate") {
                            setSortKeys(false);
                          } else {
                            setSortKeys(checked);
                          }
                        }}
                        className="mt-1"
                      />
                      <Label
                        htmlFor="sort-keys"
                        className="text-sm font-medium text-foreground cursor-pointer"
                      >
                        Sort keys in output
                      </Label>
                    </div>
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="preserve-encoded"
                        checked={false}
                        disabled
                        className="mt-1"
                      />
                      <Label
                        htmlFor="preserve-encoded"
                        className="text-sm font-medium text-foreground/70 cursor-not-allowed"
                      >
                        Preserves encoded strings (like {'"\\u00e2"'} ) and big
                        numbers
                        <div className="text-xs text-muted-foreground font-normal">
                          Only works when "Sort keys" and "Auto repair" options
                          are off.
                        </div>
                      </Label>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 w-fit"
                      onClick={handleResetSettings}
                    >
                      Reset to Defaults
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* </TooltipContent>
                </Tooltip> */}
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-popover text-popover-foreground border"
                >
                  <DropdownMenuCheckboxItem
                    checked={autoDetect}
                    onCheckedChange={setAutoDetect}
                    className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  >
                    Auto detect when input is valid JSON
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={allowTrailingCommas}
                    onCheckedChange={setAllowTrailingCommas}
                    className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  >
                    Allow trailing commas and comments
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={autoRepair}
                    onCheckedChange={setAutoRepair}
                    className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  >
                    <div>
                      Auto repair invalid JSON if possible
                      <p className="text-xs text-muted-foreground">
                        Fix missing quotes, strip commas, etc.
                      </p>
                    </div>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={continuousMode}
                    onCheckedChange={setContinuousMode}
                    className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  >
                    Continuous Mode: format as you type
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={sortKeys}
                    onCheckedChange={setSortKeys}
                    className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  >
                    Sort keys in output
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem
                    onSelect={handleResetSettings}
                    className="focus:bg-accent"
                  >
                    Reset to Defaults
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs bg-background border-input hover:bg-accent text-foreground hover:text-accent-foreground"
                  >
                    JSON <ChevronDown size={14} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-popover text-popover-foreground border"
                >
                  <DropdownMenuRadioGroup value="json">
                    <DropdownMenuRadioItem
                      value="json"
                      className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    >
                      JSON
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="xml"
                      disabled
                      className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    >
                      XML (soon)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="yaml"
                      disabled
                      className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    >
                      YAML (soon)
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder="Paste your JSON here"
            className="flex-grow border-input text-foreground font-mono text-sm resize-none focus:ring-ring focus:border-ring"
            spellCheck="false"
          />
        </div>

        {/* Output Section */}
        <div className="flex flex-col gap-2 bg-background/95 p-3 rounded-lg">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-sm font-medium text-foreground/80">
              Output
            </span>
            <div className="flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-input hover:bg-accent text-foreground hover:text-accent-foreground"
                  >
                    {typeof style === "object"
                      ? String(style[IndentStyleEnum.Spaces])
                      : style}
                    <ChevronDown size={14} className="ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-popover text-popover-foreground border"
                >
                  <DropdownMenuRadioGroup
                    value={
                      typeof style === "object"
                        ? String(style[IndentStyleEnum.Spaces])
                        : style
                    }
                    onValueChange={(value) => {
                      if (value === IndentStyleEnum.Tabs) {
                        setStyle(IndentStyleEnum.Tabs);
                      } else if (value === IndentStyleEnum.Minified) {
                        setStyle(IndentStyleEnum.Minified);
                      } else {
                        setStyle({ [IndentStyleEnum.Spaces]: Number(value) });
                      }
                    }}
                  >
                    <DropdownMenuRadioItem
                      value="2"
                      className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    >
                      2 spaces
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value="4"
                      className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    >
                      4 spaces
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value={IndentStyleEnum.Tabs}
                      className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    >
                      Tabs
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      value={IndentStyleEnum.Minified}
                      className="focus:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    >
                      Minified
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground h-8 w-8"
                    onClick={() => copyToClipboard(outputJson)}
                  >
                    <Copy size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-popover text-popover-foreground border"
                >
                  <p>Copy Output</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <Textarea
            value={outputJson}
            readOnly
            placeholder="Formatted JSON will appear here"
            className="flex-grow bg-transparent border-input text-foreground font-mono text-sm resize-none focus:ring-ring focus:border-ring"
            spellCheck="false"
          />
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="text"
              placeholder="JSON Path (e.g., $.store.book[*].author)"
              className="bg-background border-input text-foreground placeholder:text-muted-foreground text-xs h-8 focus:ring-ring focus:border-ring"
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-8 w-8"
                >
                  <HelpCircle size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-popover text-popover-foreground border"
              >
                <p>JSONPath Help</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
