import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

export const tokenStorage = {
	get: () => Cookies.get(TOKEN_KEY),
	set: (token: string) => Cookies.set(TOKEN_KEY, token, { expires: 1 / 96, sameSite: 'lax' }),
	clear: () => Cookies.remove(TOKEN_KEY),
}
