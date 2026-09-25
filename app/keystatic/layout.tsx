import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {keystaticEnabled} from '@/lib/keystatic';
import KeystaticApp from './keystatic';
export const metadata:Metadata={title:'Writing studio',robots:{index:false,follow:false}};
// Keystatic renders its whole admin from the layout; the page below is a placeholder.
export default function KeystaticLayout(){if(!keystaticEnabled)notFound();return <KeystaticApp/>}
