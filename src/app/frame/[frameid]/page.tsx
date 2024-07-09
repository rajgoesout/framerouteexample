// app/frame/[frameid]/page.tsx
import { Metadata } from 'next';
// import { useRouter } from 'next/router';
import { getFrameMetadata } from '@coinbase/onchainkit/frame';

// Define the props type
interface FramePageProps {
    data: {
        title: string;
        description: string;
        content: string;
    };
}

import { NEXT_PUBLIC_URL } from '../../config';


// Fetch data function
async function fetchFrameData(frameid: string) {
    const res = await fetch(`https://adbase-api.onrender.com/frame/${frameid}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const resp = await res.json();

    // assume this is coming from our adbase-api (created by advertiser)
    // const resp = {
    //     // advertiser: "pudgy pengu tees",
    //     // advertiser: "base cats",
    //     advertiser: "blu pengu",
    //     id: frameid,
    //     // img: "https://sothebys-md.brightspotcdn.com/dims4/default/cae787c/2147483647/strip/true/crop/2000x2000+0+0/resize/1024x1024!/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fmedia-desk%2F56%2Fe8%2Fe34be74e4180a974f016b2de17f3%2F80741.png",
    //     // url: "https://shop.pudgypenguins.com/products/custom-pudgy-penguins-tee-2",
    //     // img: "https://cdn.mint.fun/5ede3c3212ff3e6d023aa6ac6144a72ac96693849c1d142f45ddd81835a23761?format=auto",
    //     // url: "https://mint.fun/base/0xdDdC17AFA03afc66e4178ff1B36E5b2237303a21",
    //     img: "https://quickstart-935a95fe.myshopify.com/cdn/shop/files/IMG_1302.jpg",
    //     url: "https://quickstart-935a95fe.myshopify.com/products/pengu?utm_source=adbase",
    //     title: "hello",
    //     description: "this si reall",
    // }
    return resp;
}

// Generate metadata function
export async function generateMetadata({ params }: { params: { frameid: string } }): Promise<Metadata> {
    const data = await fetchFrameData(params.frameid);
    console.log("dtitle", data)
    const frameMetadata = getFrameMetadata({
        buttons: [
            {
                action: 'link',
                label: 'Shop now',
                target: data?.url,
            },
            // {
            //     action: 'link',
            //     label: 'Add Current Time Action',
            //     target:
            //         'https://warpcast.com/~/add-cast-action?actionType=post&name=Current+Time&icon=clock&postUrl=https%3A%2F%2Fadframeview.vercel.app%2Fapi%2Faction',
            // },
            // {
            //     label: data?.id,
            // },
            // {
            //     action: 'tx',
            //     label: 'Buy',
            //     // target: data?.url,
            //     target: `${NEXT_PUBLIC_URL}/api/tx`,
            //     postUrl: `${NEXT_PUBLIC_URL}/api/tx-success`,
            // },
        ],
        image: {
            src: data?.img,
            aspectRatio: '1:1',
        },
        // postUrl: `${NEXT_PUBLIC_URL}/frame/${data?.id}/actions/click`,
        postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    });
    return {
        title: `${data?.id} - ${data?.advertiser}`,
        description: data.description,
        openGraph: {
            title: `${data?.id} - ${data?.advertiser}`,
            description: data.description,
            images: [data.img]
        },
        other: {
            ...frameMetadata,
        },
    };

    // <meta name="fc:frame" content="vNext"/>
    // <meta name="fc:frame:image" content="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABHoAAAJYCAYAAAAde4FyAAAPoElEQVR4nO3YAREAIAwAIe0fWldjfxCD+8YBAAAAYD3RAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARHyOi1mA9SThMwAAAABJRU5ErkJggg=="/>
    // <meta name="og:image" content="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABHoAAAJYCAYAAAAde4FyAAAPoElEQVR4nO3YAREAIAwAIe0fWldjfxCD+8YBAAAAYD3RAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARIgeAAAAgAjRAwAAABAhegAAAAAiRA8AAABAhOgBAAAAiBA9AAAAABGiBwAAACBC9AAAAABEiB4AAACACNEDAAAAECF6AAAAACJEDwAAAECE6AEAAACIED0AAAAAEaIHAAAAIEL0AAAAAESIHgAAAIAI0QMAAAAQIXoAAAAAIkQPAAAAQIToAQAAAIgQPQAAAAARogcAAAAgQvQAAAAARHyOi1mA9SThMwAAAABJRU5ErkJggg=="/>
    // <meta name="fc:frame:post_url" content="http://localhost:8083/frame/hjd"/>
    // <meta name="fc:frame:image:aspect_ratio" content="1.91:1"/>
    // <meta name="frames.js:version" content="0.16.3"/>
}

// Page component
const FramePage = async ({ params }: { params: { frameid: string } }) => {
    const data = await fetchFrameData(params.frameid);
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
        </div>
    );
};

export default FramePage;
