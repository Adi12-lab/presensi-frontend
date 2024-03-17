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
import ServiceMatakuliah from "~/actions/matakuliah";
import { Matakuliah, NewPembelajaran, Pembelajaran } from "~/schema";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

interface ComboBoxProps<Form extends FieldValues> {
  form: UseFormReturn<Form>;
  field: keyof Form;
}

function MatakuliahComboBox({ form, field }: ComboBoxProps<NewPembelajaran | Pembelajaran>) {
  const [matakuliahSelected, setMatakuliahSelected] = useState("");

  const { data } = useQuery<Matakuliah[]>({
    queryKey: ["matakuliah", "combobox"],
    queryFn: ServiceMatakuliah.all,
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
            )}
          >
            {matakuliahSelected
              ? data.find((ps) => ps.nama === matakuliahSelected)?.nama
              : "Pilih matakuliah"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Cari Matakuliah" />
            <CommandEmpty>Matakuliah tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {data.map((matakuliah) => (
                <CommandItem
                  value={matakuliah.nama}
                  key={matakuliah.kode}
                  onSelect={(currentMatakuliah) => {
                    setMatakuliahSelected(
                      currentMatakuliah === matakuliah.nama ? "" : matakuliah.nama
                    );
                    form.setValue(field, matakuliah.kode);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      matakuliah.nama === matakuliahSelected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {matakuliah.nama}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
  );
}

export default MatakuliahComboBox;
