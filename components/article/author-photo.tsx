import Image from 'next/image';
import avatar from '@/public/images/nimra/nimra-avatar.webp';
import dark from '@/public/images/nimra/p1-portrait-B-dark.webp';
import light from '@/public/images/nimra/p1-portrait-B-light.webp';

export function AuthorPhoto({card=false}:{card?:boolean}){
 if(!card)return <Image className="avatar writing-avatar" src={avatar} alt="Nimra Zahid" width={48} height={48} sizes="48px" placeholder="blur"/>;
 return <span className="author-photo">
  <Image className="author-photo-dark" src={dark} alt="Nimra Zahid" width={72} height={72} sizes="72px" placeholder="blur"/>
  <Image className="author-photo-light" src={light} alt="Nimra Zahid" width={72} height={72} sizes="72px" placeholder="blur"/>
 </span>;
}
