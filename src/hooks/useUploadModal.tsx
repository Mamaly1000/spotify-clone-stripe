import { create } from "zustand";

interface UploadModalStore {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
export default useUploadModal;
