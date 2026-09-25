import {makeRouteHandler} from '@keystatic/next/route-handler';
import config from '@/keystatic.config';
import {keystaticEnabled} from '@/lib/keystatic';
const handler=keystaticEnabled?makeRouteHandler({config}):null;
const disabled=()=>new Response('Not Found',{status:404});
export const GET=handler?.GET??disabled;
export const POST=handler?.POST??disabled;
