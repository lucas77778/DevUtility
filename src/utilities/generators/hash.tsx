import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HashAlgorithm, HashResult, InvokeFunction } from "../types";
import { invoke } from "@/tauri";
import { useDebouncedValue } from "foxact/use-debounced-value";

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const debouncedInput = useDebouncedValue(input, 100, false);

  const [hashResult, setHashResult] = useState<Partial<HashResult>>({});
  const [lowercased, setLowercased] = useState(false);

  const handleGenerateHashes = async () => {
    const result = await invoke(InvokeFunction.GenerateHashes, {
      input: debouncedInput,
    });
    console.log(result);
    setHashResult(result);
  };

  useEffect(() => {
    handleGenerateHashes();
  }, [debouncedInput]);

  return (
    <div className="flex flex-col md:flex-row gap-4 h-full">
      {/* Left: Input Area */}
      <Card className="flex-1 flex flex-col min-w-[260px] max-w-lg h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Input:</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 flex-1">
          <div className="flex gap-2 mb-2">
            <Button size="sm" variant="outline" type="button">
              Clipboard
            </Button>
            <Button size="sm" variant="outline" type="button">
              Sample
            </Button>
            <Button size="sm" variant="outline" type="button">
              Load file...
            </Button>
            <Button size="sm" variant="outline" type="button">
              Clear
            </Button>
          </div>
          <ScrollArea className="flex-1 min-h-[300px]">
            <Textarea
              className="h-[300px] resize-none font-mono text-xs"
              placeholder={`- Enter Your Text\n- Drag/Drop Files\n- Right Click • Load from File...\n- ⌘ + F to Search\n- ⌘ + ⌥ + F to Replace`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Right: Hash Results */}
      <Card className="flex-1 min-w-[320px] max-w-xl h-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Length: {input.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Checkbox
              id="lowercased"
              checked={lowercased}
              onCheckedChange={(v) => setLowercased(!!v)}
            />
            <Label htmlFor="lowercased" className="text-xs">
              lowercased
            </Label>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {Object.values(HashAlgorithm).map((algo) => (
            <div key={algo} className="flex items-center gap-2">
              <Label
                htmlFor={`hash-${algo}`}
                className="w-24 text-xs text-muted-foreground"
              >
                {algo}:
              </Label>
              <Input
                id={`hash-${algo}`}
                className="flex-1 text-xs"
                value={hashResult[algo as keyof HashResult] || ""}
                readOnly
                placeholder=""
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
