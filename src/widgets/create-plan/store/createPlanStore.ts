import { create } from 'zustand';

interface CreatePlanStoreT {
  editingScheduleId: string;
  setEditingScheduleId: (id: string) => void;
  activedDateCardIndex: number;
  setActivedDateCardIndex: (activedDateCardIndex: number) => void;
  isRegistration: boolean;
  setIsRegistration: (isRegistration: boolean) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

const useCreatePlanStore = create<CreatePlanStoreT>((set) => ({
  editingScheduleId: '',
  setEditingScheduleId: (id: string) =>
    set((state) => ({ ...state, editingScheduleId: id })),
  activedDateCardIndex: 0,
  setActivedDateCardIndex: (activedDateCardIndex: number) =>
    set((state) => ({ ...state, activedDateCardIndex })),
  isRegistration: false,
  setIsRegistration: (isRegistration: boolean) =>
    set((state) => ({ ...state, isRegistration })),
  isEditing: false,
  setIsEditing: (isEditing: boolean) =>
    set((state) => ({ ...state, isEditing })),
}));

export default useCreatePlanStore;
