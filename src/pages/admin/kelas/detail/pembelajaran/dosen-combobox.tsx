import { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import ServiceDosen from "~/actions/dosen";
import { Dosen } from "~/schema";
import { useQuery } from "@tanstack/react-query";

type ComboBoxProps = {
  value: string;
  onValueChange: (value: string) => void;
}

function DosenComboBox({ value, onValueChange }: ComboBoxProps) {

  const { data } = useQuery<Dosen[]>({
    queryKey: ["dosen", "combobox"],
    queryFn: ServiceDosen.all,
  });

  const [open, setOpen] = useState(false);
  return (
    data && (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between"
              // !.value && "text-muted-foreground"
            )}
          >
            {value
              ? data.find((ps) => ps.nidn === value)?.nama
              : "Pilih dosen"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="cari peserta" />
            <CommandEmpty>Dosen tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {data.map((dosen) => (
                <CommandItem
                  value={dosen.nama}
                  key={dosen.nidn}
                  onSelect={() => {
                    onValueChange(dosen.nidn)
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      dosen.nidn === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {dosen.nama}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  );
}

export default DosenComboBox;
