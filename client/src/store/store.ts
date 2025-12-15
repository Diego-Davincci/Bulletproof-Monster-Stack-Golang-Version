import { create } from "zustand";

type State = {};

interface Actions {}

export const useStore = create<State & Actions>()((set) => ({}));
