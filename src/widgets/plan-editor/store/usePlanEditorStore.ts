import { create } from 'zustand';

interface PlanEditorStoreT {
  editingScheduleIndex: number | null;
  setEditingScheduleIndex: (id: number | null) => void;
  activedDateCardIndex: number;
  setActivedDateCardIndex: (activedDateCardIndex: number) => void;
  isRegistration: boolean;
  setIsRegistration: (isRegistration: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  dateOfDays: Date[];
  setDateOfDays: (dateOfDays: Date[]) => void;
}

const usePlanEditorStore = create<PlanEditorStoreT>((set) => ({
  editingScheduleIndex: null,
  setEditingScheduleIndex: (id: number | null) =>
    set((state) => ({ ...state, editingScheduleIndex: id })),
  activedDateCardIndex: 0,
  setActivedDateCardIndex: (activedDateCardIndex: number) =>
    set((state) => ({ ...state, activedDateCardIndex })),
  isRegistration: false,
  setIsRegistration: (isRegistration: boolean) =>
    set((state) => ({ ...state, isRegistration })),
  isEditing: false,
  setIsEditing: (isEditing: boolean) =>
    set((state) => ({ ...state, isEditing })),
  dateOfDays: [new Date()],
  setDateOfDays: (dateOfDays: Date[]) =>
    set((state) => ({ ...state, dateOfDays })),
}));

export default usePlanEditorStore;
