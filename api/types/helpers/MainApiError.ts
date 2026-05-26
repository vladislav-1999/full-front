export class MainApiError extends Error {
	status: number
	constructor(message = 'Ошибка сервера', status: number) {
		super(message)
		this.status = status
	}
}
