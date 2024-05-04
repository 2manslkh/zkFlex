import type { RequestHandler } from '@sveltejs/kit';
export const ssr = true;

export const load: RequestHandler = (async (request) => {
    // Extract slug parameter from the request
    const { params } = request;
    const { slug } = params;
    const response = await fetch(`https://zkflex.onrender.com/${slug}`);
    const data = await response.json();
    return data
})
