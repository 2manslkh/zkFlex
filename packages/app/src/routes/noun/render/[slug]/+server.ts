
import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    // Extract slug parameter from the request
    const { pathname } = url;

    // split the pathname to get the slug
    const slug = pathname.split('/').pop();

    // Verify if slug exists
    if (!slug) {
        return error(400, 'Bad Request');
    }

    // Remove leading 0x from the slug if it exists
    const hash = slug.startsWith('0x') ? slug.slice(2) : slug;

    // verify if slug is a legit hash
    if (slug.length !== 64) {
        return error(400, 'Invalid Slug');
    }

    try {
        // Fetch the image from Supabase
        const response = await fetch(`https://uxxmxcbidkgoeortjpsx.supabase.co/storage/v1/object/public/ethsydney/${hash}.png`);

        // Check if the image was found
        if (!response.ok) {
            return error(response.status, `Failed to fetch image: ${response.statusText}`);
        }

        const base64 = await response.text(); // Assuming the fetch returns a full base64 URI
        const data = base64.split(',')[1]; // This removes the 'data:image/png;base64,' part
        const binaryData = Buffer.from(data, 'base64'); // Decode base64 to binary

        // Stream the image directly in the response
        return new Response(binaryData, {
            headers: {
                'Content-Type': 'image/png'
            }
        });
    } catch (e) {
        console.error('Failed to fetch image:', e);
        return error(500, 'Internal Server Error');
    }
}