import Link from 'next/link';
export const metadata={title:'Page not found',description:'This page could not be found.',robots:{index:false,follow:false}};
export default function NotFound(){return <section className="page-section"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>A different direction.</h1><p>This page could not be found.</p><Link href="/" className="button">Back to home →</Link></section>}
