import { Button } from "@resume/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@resume/ui/popover";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { type ColorChangeHandler, TwitterPicker } from "react-color";

interface ColorPickerProps {
  primaryColor: string | undefined;
  secondaryColor: string | undefined;
  onPrimaryColorChange: ColorChangeHandler;
  onSecondaryColorChange: ColorChangeHandler;
}

export default function ColorPicker({
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="Change resume colors"
          onClick={() => setShowPopover(true)}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto border-none bg-transparent shadow-none p-0"
        align="end"
      >
        <div className="flex flex-col gap-4 p-4 bg-popover rounded-lg shadow">
          <div>
            <label className="block text-sm font-medium mb-2">
              Primary Color
            </label>
            <TwitterPicker
              color={primaryColor}
              onChange={onPrimaryColorChange}
              triangle="hide"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Secondary Color
            </label>
            <TwitterPicker
              color={secondaryColor}
              onChange={onSecondaryColorChange}
              triangle="hide"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
