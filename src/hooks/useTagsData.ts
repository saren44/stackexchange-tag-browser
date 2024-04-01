import axios from "axios";
import { create } from "zustand";

interface MockType {
	completed: boolean;
	id: number;
	userId: number;
	title: string;
}


interface TagDataState {
	loading: boolean;
	error: boolean;
	success: boolean;
	data: MockType | null;	
	errorMessage: string | null;
	execute: (id: number) => void
}

const dataCache : Map<number, MockType> = new Map<number, MockType>();


export const useTagData = create<TagDataState>((set, get) => ({
  loading: false,
	error: false,
	success: false,
	data: null,
	errorMessage: null,

  execute: async (id: number) => {
    set((state) => ({ ...state, loading: true }));
    try {
			const cachedRes = dataCache.get(id);
			if (cachedRes) {
				console.log('using cached')
				set((state) => ({ ...state, loading: false, success: true, data: cachedRes }));
			}
			else {
				console.log('fetching')
				const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
				dataCache.set(id, res.data)
				set((state) => ({ ...state, loading: false, success: true, data: res.data }));
			}
    } catch (err: Error | unknown) {
      console.error("Error in data fetch:", err);
			let msg: string;
			if (err instanceof Error) msg = err.message
			else msg = String(err)
			set((state) => ({ ...state, loading: false, error: true, errorMessage: msg }));
    }
  },
}));