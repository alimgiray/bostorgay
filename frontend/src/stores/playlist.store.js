import { post } from '$lib/api';

export const create = async (name) => {
	const { response, error } = await post(fetch, `/api/playlists`, { name });
	if (!error) {
		return { playlist: response, success: true };
	} else {
		return { playlist: null, success: false };
	}
};
