import axios from 'axios'

export const mainApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_MAIN_API,
	adapter: 'fetch',
	fetchOptions: { cache: 'no-store' },
})

mainApi.interceptors.response.use(
	(response) => response,
	(reject) => {
		throw reject?.response?.data
	},
)
