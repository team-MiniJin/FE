import { create } from 'zustand';

interface PlanEditorStoreT {
  editingScheduleIndex: number | null;
  setEditingScheduleIndex: (id: number | null) => void;
  activatedDateCardIndex: number;
  setActivatedDateCardIndex: (activatedDateCardIndex: number) => void;
  isRegistration: boolean;
  setIsRegistration: (isRegistration: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  dateOfDays: Date[];
  setDateOfDays: (dateOfDays: Date[]) => void;
  resetStore: () => void;
}
const initialState = {
  editingScheduleIndex: null,
  activatedDateCardIndex: 0,
  isRegistration: false,
  isEditing: false,
  dateOfDays: [new Date()],
};

const usePlanEditorStore = create<PlanEditorStoreT>((set) => ({
  editingScheduleIndex: null,
  setEditingScheduleIndex: (id: number | null) =>
    set((state) => ({ ...state, editingScheduleIndex: id })),
  activatedDateCardIndex: 0,
  setActivatedDateCardIndex: (activatedDateCardIndex: number) =>
    set((state) => ({ ...state, activatedDateCardIndex })),
  isRegistration: false,
  setIsRegistration: (isRegistration: boolean) =>
    set((state) => ({ ...state, isRegistration })),
  isEditing: false,
  setIsEditing: (isEditing: boolean) =>
    set((state) => ({ ...state, isEditing })),
  dateOfDays: [new Date()],
  setDateOfDays: (dateOfDays: Date[]) =>
    set((state) => ({ ...state, dateOfDays })),
  resetStore: () => set(() => initialState),
}));

export default usePlanEditorStore;
