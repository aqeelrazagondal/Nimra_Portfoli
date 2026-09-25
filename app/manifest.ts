import type {MetadataRoute} from 'next';
import {profile} from '@/content/profile';
import {homeDescription} from '@/lib/site';

// Web app manifest: name, colours and icons for "Add to home screen".
export default function manifest():MetadataRoute.Manifest{
 return {name:`${profile.name} · International Relations researcher & educator`,short_name:profile.name,description:homeDescription,
  start_url:'/',display:'browser',background_color:'#faf7f2',theme_color:'#faf7f2',
  icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png'},{src:'/icon-512.png',sizes:'512x512',type:'image/png'},{src:'/icon.svg',sizes:'any',type:'image/svg+xml'}]};
}
