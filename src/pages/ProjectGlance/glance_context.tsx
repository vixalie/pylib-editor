import { createContext } from "react";

export interface LibraryGlance {
  name: string;
  author: string;
  email: string;
  description: string;
  createdAt: string;
  totalPhases: number;
  totalPersistedPhases: number;
  totalDraftPhases: number;
  maxPhaseLength: number;
  minPhaseLength: number;
  avgPhaseLength: number;
  totalPhaseLength: number;
}

export const defaultGlance = Object.freeze<LibraryGlance>({
  name: "",
  author: "",
  email: "",
  description: "",
  createdAt: "",
  totalPhases: 0,
  totalPersistedPhases: 0,
  totalDraftPhases: 0,
  maxPhaseLength: 0,
  minPhaseLength: 0,
  avgPhaseLength: 0,
  totalPhaseLength: 0,
});

export const GlanceContext = createContext<LibraryGlance>(defaultGlance);
