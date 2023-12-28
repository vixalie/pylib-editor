import { create } from "zustand";

/**
 * @template T
 * @typedef {import("zustand").StoreApi<T>} StoreApi
 *
 * @typedef {object} Project
 * @property {string} [projectName]
 * @property {string} [fileName]
 */

/**
 * @type {import("zustand").UseBoundStore<StoreApi<Project>>}
 */
const useProjectStore = create((set) => ({
  projectName: undefined,
  fileName: undefined,
}));

export default useProjectStore;
