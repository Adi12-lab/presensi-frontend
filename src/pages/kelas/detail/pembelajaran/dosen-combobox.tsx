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
import { Dosen, NewPembelajaran, Pembelajaran } from "~/schema";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

interface ComboBoxProps<Form extends FieldValues> {
  form: UseFormReturn<Form>;
  field: keyof Form;
}

function DosenComboBox({ form, field }: ComboBoxProps<NewPembelajaran | Pembelajaran>) {
  const [dosenSelected, setDosenSelected] = useState("");

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
            {dosenSelected
              ? data.find((ps) => ps.nama === dosenSelected)?.nama
              : "Pilih dosen"}
            {/* {pesertaSelected
          ? peserta.find((ps) => ps.nama === pesertaSelected.nama)?.nama
          : "pilih peserta"} */}
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
                  onSelect={(currentDosen) => {
                    setDosenSelected(
                      currentDosen === dosen.nama ? "" : dosen.nama
                    );
                    form.setValue(field, dosen.nidn);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      dosen.nama === dosenSelected ? "opacity-100" : "opacity-0"
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
