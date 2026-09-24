import {renderToBuffer} from '@react-pdf/renderer';
import {CVDocument} from '@/lib/cv-document';
export const runtime='nodejs';
export const dynamic='force-static';
export async function GET(){const buffer=await renderToBuffer(<CVDocument/>);return new Response(new Uint8Array(buffer),{headers:{'Content-Type':'application/pdf','Content-Disposition':'attachment; filename="Nimra-Zahid-Academic-CV.pdf"','Cache-Control':'public, max-age=3600'}})}
