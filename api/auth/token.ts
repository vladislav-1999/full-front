import Cookies from 'js-cookie'
import type { TokenPair } from './types'

const ACCESS_KEY = 'accessToken'
const REFRESH_KEY = 'refreshToken'

export const tokenStorage = {
	getAccess: () => Cookies.get(ACCESS_KEY),
	getRefresh: () => Cookies.get(REFRESH_KEY),
	set: ({ accessToken, refreshToken }: TokenPair) => {
		Cookies.set(ACCESS_KEY, accessToken, { expires: 1 / 96, sameSite: 'lax' })
		Cookies.set(REFRESH_KEY, refreshToken, { expires: 30, sameSite: 'lax' })
	},
	clear: () => {
		Cookies.remove(ACCESS_KEY)
		Cookies.remove(REFRESH_KEY)
	},
}
