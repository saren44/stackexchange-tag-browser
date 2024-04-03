import axios from "axios";
import { create } from "zustand";
import { IData } from "./types";

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
	sortBy: 'popular' | 'name';
	sortDir: 'asc' | 'desc';

	currentFilter: string;
	setFilter: (newFilter: string) => void;

	errorMessage: string | null;
	execute: () => void;
	mockExecute: (id: number) => void;
	mockData: MockType | null,
	setItemsPerPage: (val: number) => void;
	decreasePage: () => void;
	increasePage: () => void;

	setSortDir: (dir: 'asc' | 'desc') => void;
	setSortBy: (by: 'popular' | 'name') => void;
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
	sortBy: "popular",
	sortDir: "desc",

	currentFilter: '',


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
			const endpoint = `order=${dir}&sort=${by}${inname !== '' ? `&inname=${inname}` : ''}&site=stackoverflow&filter=!nNPvSNMp2Q`
			
			console.log(endpoint, ipp)

			const cachedRes = dataCache.get(endpoint);

			if (!cachedRes) {
				console.log('fetching')
				const url = 'https://api.stackexchange.com/2.3/tags?page=1&pagesize=100&' + endpoint;
				const res = await axios.get(url);
				dataCache.set(endpoint, res.data.items)
				set((state) => ({ ...state, loading: false, success: true, data: res.data.items.slice(from, to) }));
			}
			else if (cachedRes.length < to) {
				console.log('downloading more')
				const pageNumber = cachedRes.length / 100 + 1
				const url = `https://api.stackexchange.com/2.3/tags?page=${pageNumber}&pagesize=100&` + endpoint;
				const res = await axios.get(url);
				const newData = cachedRes.concat(res.data.items)
				dataCache.set(endpoint, newData)
				set((state) => ({ ...state, loading: false, success: true, data: newData.slice(from, to) }));
			}
			else {
				console.log('using cached')
				set((state) => ({ ...state, loading: false, success: true, data: cachedRes.slice(from, to) }));
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

	increasePage: () => { set((state) => ({currentPage: state.currentPage + 1})); get().execute() },
	decreasePage: () => { set((state) => ({currentPage: state.currentPage - 1})); get().execute() },
	
	setItemsPerPage: (val: number) => { set(({itemsPerPage: val})); get().execute() },
	setSortBy: (by: 'name' | 'popular') => { set({sortBy: by}); get().execute },
	setSortDir: (dir: 'asc' | 'desc') => { set({sortDir: dir}); get().execute() },
	setFilter: (newFilter: string) => {set({ currentFilter: newFilter}); get().execute() },
}));