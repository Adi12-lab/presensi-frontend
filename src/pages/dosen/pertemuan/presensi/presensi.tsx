import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import ServiceKelas from "~/actions/kelas";
import ServicePresensi from "~/actions/presensi";
import { JenisPresensi, Mahasiswa, Presensi as PresensiType } from "~/schema";
import { cn } from "~/lib/utils";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "~/components/ui/select";
import { jenisPresensi } from "~/constant";
import { usePresensiStore, useSimpleModal } from "~/store";
import { Anchor } from "~/components/ui/anchor";

export default function Presensi({
  kelas,
  totalJam,
  pertemuan,
}: {
  kelas: string;
  totalJam: number;
  pertemuan: number;
}) {
  const { data = [] } = useQuery<Mahasiswa[]>({
    queryKey: ["anggota"],
    queryFn: async () => {
      return await ServiceKelas.findAnggota(kelas);
    },
    enabled: Boolean(kelas),
  });

  const serverUrl = import.meta.env.VITE_SERVER_URL; // 환경 변수 확인
  const downloadLink = `${serverUrl}/pertemuan/${pertemuan}/presensi?kelas=${kelas}`; // URL 생성
  return (
    data && (
      <>
        <div className="flex justify-between">
          <h1 className="text-lg font-bold my-2">Daftar Presensi</h1>
          <Anchor
            variant={"purple"}
            href={downloadLink}
            className="space-x-3 my-2"
          >
            <Download />
            <span>Download Presensi</span>
          </Anchor>
        </div>
        <Table className="border-spacing-3">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-black text-center">
                NIM
              </TableHead>
              <TableHead className="border border-black text-center">
                Nama Lengkap
              </TableHead>
              <TableHead className="border border-black p-0">
                <h4 className="text-center py-3">Jam Pembelajaran</h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${totalJam}, 1fr)`,
                  }}
                >
                  {[...Array(totalJam)].map((_, index) => (
                    <span
                      className={cn(
                        `border-t border-black py-3 text-center`,
                        index + 1 !== totalJam && "border-r"
                      )}
                      key={index + "total-jam"}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b border-black">
            {data.map((mahasiswa) => (
              <TableRow
                className={cn("border-b border-black")}
                key={mahasiswa.nim}
              >
                <MahasiswaRow
                  {...mahasiswa}
                  totalJam={totalJam}
                  pertemuan={pertemuan}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <PresensiEdit />
      </>
    )
  );
}

const MahasiswaRow = ({
  nim,
  nama,
  totalJam,
  pertemuan,
}: Mahasiswa & { totalJam: number; pertemuan: number }) => {
  useQuery({
    queryKey: ["presensi-mahasiswa", nim, pertemuan],
    queryFn: async () => {
      return ServicePresensi.all(nim, pertemuan);
    },
    staleTime: 1000 * 60 * 5,
    notifyOnChangeProps: [],
  });
  return (
    <>
      <TableCell className="border-l border-black text-center p-0">
        {nim}
      </TableCell>
      <TableCell className="border-l border-black p-0 text-center">
        {nama}
      </TableCell>
      <TableCell
        className={`border-l border-black p-0`}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${totalJam}, 1fr)`,
        }}
      >
        <MahasiswaPresensi nim={nim} pertemuan={pertemuan} />
      </TableCell>
    </>
  );
};

const MahasiswaPresensi = ({
  nim,
  pertemuan,
}: {
  nim: string;
  pertemuan: number;
}) => {
  const { setData } = usePresensiStore();
  const { setIsOpen } = useSimpleModal();
  const { data, isPending } = useQuery<{
    result: PresensiType[];
    presentaseKehadiran: number;
  }>({
    queryKey: ["presensi-mahasiswa", nim, pertemuan],
    queryFn: async () => {
      return ServicePresensi.all(nim, pertemuan);
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return "Loading presensi";
  }

  return (
    data &&
    data.result.map((prens) => (
      <div
        className="border-r border-black py-3 flex items-center justify-center"
        key={prens.id}
      >
        <Button
          variant={jenisPresensi[prens.jenis].variant}
          size={"icon"}
          onClick={() => {
            setData({
              id: prens.id,
              jenis: prens.jenis,
              mahasiswaNim: nim,
              pertemuanId: pertemuan,
            });
            setIsOpen(true);
          }}
        >
          {jenisPresensi[prens.jenis].label}
        </Button>
      </div>
    ))
  );
};

const PresensiEdit = () => {
  const queryClient = useQueryClient();
  const [jenisEdit, setJenisEdit] = useState<JenisPresensi>("masuk");
  const { data } = usePresensiStore();
  const { isOpen, setIsOpen } = useSimpleModal();

  useEffect(() => {
    setJenisEdit(data.jenis);
  }, [data]);

  const presensiMutation = useMutation({
    mutationFn: async () => {
      return ServicePresensi.update(data.id, jenisEdit);
    },
    onSuccess: () => {
      toast.success("Presensi berhasil di update");
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["presensi-mahasiswa", data.mahasiswaNim, data.pertemuanId],
      });
    },
    onError: () => {
      toast.error("Presensi gagal di update");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Presensi ?</DialogTitle>
        </DialogHeader>
        <Select
          value={jenisEdit}
          onValueChange={(value) =>
            setJenisEdit(value as unknown as JenisPresensi)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="masuk">Masuk</SelectItem>
            <SelectItem value="izin">Izin</SelectItem>
            <SelectItem value="sakit">Sakit</SelectItem>
            <SelectItem value="alpha">Alpha</SelectItem>
          </SelectContent>
        </Select>
        <Button
          disabled={presensiMutation.isPending}
          onClick={() => presensiMutation.mutate()}
        >
          {presensiMutation.isPending ? "Menyimpan" : "Simpan"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
