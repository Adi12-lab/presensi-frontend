export type EditDeleteOperation = "edit" | "delete";

export type ModalProps<K, T> = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  operation: K;
  data: T;
};


export type JenisPresensiProps = {
  label: string;
  variant:
    | "default"
    | "warning"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success";
};
