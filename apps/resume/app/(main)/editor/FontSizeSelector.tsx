"use client";

import { useState } from "react";
import { Button } from "@resume/ui/button";
import { Slider } from "@resume/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@resume/ui/popover";

interface FontSizeSelectorProps {
  label: string;
  fontSize: number;
  onFontSizeChange: (fontSize: number) => void;
}

export default function FontSizeSelector({
  label,
  fontSize,
  onFontSizeChange,
}: FontSizeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSliderChange = (value: number[]) => {
    if (value[0] !== undefined) {
      onFontSizeChange(value[0]);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">{label}</h4>
          <Slider
            min={8}
            max={label==='Text Font Size'?22:36}
            step={1}
            value={[fontSize]}
            onValueChange={handleSliderChange}
          />
          <div className="text-sm text-muted-foreground">
            Font size: {fontSize}px
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
