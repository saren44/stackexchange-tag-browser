import axios from "axios";
import { create } from "zustand";
import { IData } from "./types";

interface TagDataState {
  loading: boolean;
  error: boolean;
  success: boolean;
  data: IData[] | null;
  currentPage: number;
  itemsPerPage: number;
  sortBy: "popular" | "name";
  sortDir: "asc" | "desc";

  currentFilter: string;
  setFilter: (newFilter: string) => void;

  errorMessage: string | null;
  execute: () => void;
  setItemsPerPage: (val: number) => void;
  decreasePage: () => void;
  increasePage: () => void;

  setSortDir: (dir: "asc" | "desc") => void;
  setSortBy: (by: "popular" | "name") => void;
}

const dataCache: Map<string, IData[]> = new Map<string, IData[]>();

export const useTagData = create<TagDataState>((set, get) => ({
  loading: false,
  error: false,
  success: false,
  data: null,
  errorMessage: null,
  currentPage: 0,
  itemsPerPage: 50,
  sortBy: "popular",
  sortDir: "desc",

  currentFilter: "",

  execute: async () => {
    const ipp = get().itemsPerPage;
    const cp = get().currentPage;
    const dir = get().sortDir;
    const by = get().sortBy;
    const inname = get().currentFilter;
    const from = ipp * cp;
    const to = ipp * cp + ipp;
    set((state) => ({ ...state, loading: true }));
    try {
      const endpoint = `order=${dir}&sort=${by}${inname !== "" ? `&inname=${inname}` : ""}&site=stackoverflow&filter=!nNPvSNMp2Q`;

      const cachedRes = dataCache.get(endpoint);

      if (!cachedRes) {
        const url =
          "https://api.stackexchange.com/2.3/tags?key=HPtJFSgz)KxanLYrndisYA((&page=1&pagesize=100&" +
          endpoint;
        const res = await axios.get(url);
        dataCache.set(endpoint, res.data.items);
        set((state) => ({
          ...state,
          loading: false,
          success: true,
          data: res.data.items.slice(from, to),
          error: false,
        }));
      } else if (cachedRes.length < to) {
        const pageNumber = cachedRes.length / 100 + 1;
        const url =
          `https://api.stackexchange.com/2.3/tags?key=HPtJFSgz)KxanLYrndisYA((&page=${pageNumber}&pagesize=100&` +
          endpoint;
        const res = await axios.get(url);
        const newData = cachedRes.concat(res.data.items);
        dataCache.set(endpoint, newData);
        set((state) => ({
          ...state,
          loading: false,
          success: true,
          data: newData.slice(from, to),
          error: false,
        }));
      } else {
        set((state) => ({
          ...state,
          loading: false,
          success: true,
          data: cachedRes.slice(from, to),
          error: false,
        }));
      }
    } catch (err: Error | unknown) {
      //eslint-disable-next-line no-console
      console.error("Error in data fetch:", err);
      let msg: string;
      if (err instanceof Error) msg = err.message;
      else msg = String(err);
      set((state) => ({
        ...state,
        loading: false,
        error: true,
        errorMessage: msg,
      }));
    }
  },

  increasePage: () => {
    set((state) => ({ currentPage: state.currentPage + 1 }));
    get().execute();
  },
  decreasePage: () => {
    set((state) => ({ currentPage: state.currentPage - 1 }));
    get().execute();
  },

  setItemsPerPage: (val: number) => {
    set({ itemsPerPage: val });
    get().execute();
  },
  setSortBy: (by: "name" | "popular") => {
    set({ sortBy: by });
    get().execute();
  },
  setSortDir: (dir: "asc" | "desc") => {
    set({ sortDir: dir });
    get().execute();
  },
  setFilter: (newFilter: string) => {
    set({ currentFilter: newFilter });
    get().execute();
  },
}));
