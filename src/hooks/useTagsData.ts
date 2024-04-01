import axios from "axios";
import { create } from "zustand";
import { IData } from "../components/TagsTable/TagsTableNew";

interface MockType {
	completed: boolean;
	id: number;
	userId: number;
	title: string;
}

interface TagReturnType {
	items: Array<IData>;
	has_more: boolean;
	quota_max: number;
	quota_remaining: number;
}



interface TagDataState {
	loading: boolean;
	error: boolean;
	success: boolean;
	data: IData[] | null;	
	currentPage: number;
	itemsPerPage: number;

	errorMessage: string | null;
	execute: (dir: 'asc' | 'desc', by: 'popular' | 'name', from: number, to: number) => void;
	mockExecute: (id: number) => void;
	mockData: MockType | null,
	setItemsPerPage: (val: number) => void;
	decreasePage: () => void;
	increasePage: () => void;
}

const mockDataCache : Map<number, MockType> = new Map<number, MockType>();
const dataCache : Map<string, IData[]> = new Map<string, IData[]>();


export const useTagData = create<TagDataState>((set, get) => ({
  loading: false,
	error: false,
	success: false,
	data: null,
	errorMessage: null,
	currentPage: 0,
	itemsPerPage: 50,
	mockData: null,

	execute: async (dir: 'asc' | 'desc', by: 'popular' | 'name', from: number, to: number) => {
    set((state) => ({ ...state, loading: true }));
    try {
			const endpoint = `order=${dir}&sort=${by}&site=stackoverflow&filter=!nNPvSNMp2Q`

			const cachedRes = dataCache.get(endpoint);
			if (!cachedRes) {
				console.log('fetching')
				const url = 'https://api.stackexchange.com/2.3/tags?page=1&pagesize=100&' + endpoint;
				const res = await axios.get(url);
				dataCache.set(endpoint, res.data.items)
				set((state) => ({ ...state, loading: false, success: true, data: res.data.items }));
			}
			else if (cachedRes.length < to) {
				console.log('downloading more')
				const pageNumber = cachedRes.length / 100 + 1
				const url = `https://api.stackexchange.com/2.3/tags?page=${pageNumber}&pagesize=100&` + endpoint;
				const res = await axios.get(url);
				const newData = cachedRes.concat(res.data.items)
				dataCache.set(endpoint, newData)
				set((state) => ({ ...state, loading: false, success: true, data: newData }));
			}
			else {
				console.log('using cached')
				set((state) => ({ ...state, loading: false, success: true, data: cachedRes }));
			}
    } catch (err: Error | unknown) {
      console.error("Error in data fetch:", err);
			let msg: string;
			if (err instanceof Error) msg = err.message
			else msg = String(err)
			set((state) => ({ ...state, loading: false, error: true, errorMessage: msg }));
    }
  },

  mockExecute: async (id: number) => {
    set((state) => ({ ...state, loading: true }));
    try {
			const cachedRes = mockDataCache.get(id);
			if (cachedRes) {
				console.log('using cached')
				set((state) => ({ ...state, loading: false, success: true, mockData: cachedRes }));
			}
			else {
				console.log('fetching')
				const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
				mockDataCache.set(id, res.data)
				set((state) => ({ ...state, loading: false, success: true, mockData: res.data }));
			}
    } catch (err: Error | unknown) {
      console.error("Error in data fetch:", err);
			let msg: string;
			if (err instanceof Error) msg = err.message
			else msg = String(err)
			set((state) => ({ ...state, loading: false, error: true, errorMessage: msg }));
    }
  },

	increasePage: () => set((state) => ({currentPage: state.currentPage + 1})),
	decreasePage: () => set((state) => ({currentPage: state.currentPage - 1})),
	
	setItemsPerPage: (val: number) => set((state) => ({currentPage: val}))
}));