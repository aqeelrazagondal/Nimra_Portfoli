import {makeRouteHandler} from '@keystatic/next/route-handler';
import config from '@/keystatic.config';
import {keystaticEnabled} from '@/lib/keystatic';
const handler=makeRouteHandler({config});
const disabled=()=>new Response('Not Found',{status:404});
export const GET=keystaticEnabled?handler.GET:disabled;
export const POST=keystaticEnabled?handler.POST:disabled;
