export async function handle({ event, resolve }) {
	const response = await resolve(event, {
		ssr: !event.url.pathname.startsWith('/playlist') && !event.url.pathname.startsWith('/profile'),
		transformPage: ({ html }) => html.replace('old', 'new')
	});

	return response;
}
