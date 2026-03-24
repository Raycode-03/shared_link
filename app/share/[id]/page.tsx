import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';

// Dynamic OG tags 
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const supabase = await createClient();

    const { data } = await supabase
        .from('shared_links')    
        .select('title, description, image_url')
        .eq('id', params.id)
        .single();

    if (!data) {
        return {
            title: 'Not Found',
            description: 'This link is no longer available.',
        };
    }

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            images: [{ url: data.image_url }],
            url: `https://yourdomain.com/share/${params.id}`,
        },
    };
}

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
    const supabase = await createClient();
    const { id: rawId } = await params 
    const id = parseInt(rawId, 10)
    const { data: item } = await supabase
        .from('shared_links')   
        .select('*')
        .eq('id', id)
        .single();

    // --- FALLBACK ---
    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">This link is no longer available</h1>
                <p className="text-gray-500 mb-6">Download the app to see the latest offers.</p>
                <a href="https://apps.apple.com" className="bg-black text-white px-6 py-3 rounded-full">
                    Download the App
                </a>
            </div>
        );
    }



    // --- NORMAL STATE ---
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <img src={item.image_url} alt={item.title} className="w-72 rounded-xl mb-6" />
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
            <p className="text-gray-500 mb-6">{item.description}</p>
            <a href={`your-app://share/${item.id}`} className="bg-blue-600 text-white px-6 py-3 rounded-full">
                Open in App
            </a>
        </div>
    );
}