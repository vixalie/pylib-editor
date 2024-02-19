import { create } from "zustand";

interface ProjectState {
  projectName?: string;
  fileName?: string;
}

const useProjectStore = create<ProjectState>((set) => ({
  projectName: undefined,
  fileName: undefined,
}));

export default useProjectStore;
