export function get(event) {
	return {
		body: {
			userAgent: event.request.headers.get('user-agent')
		}
	}
}