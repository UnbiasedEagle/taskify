import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const headingFont = localFont({ src: '../public/fonts/font.woff2' });

const Logo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition gap-x-2 hidden md:flex items-center'>
        <Image src='/logo.svg' height={30} width={30} alt='logo' />
        <p className={cn('text-lg text-neutral-700', headingFont.className)}>
          Taskify
        </p>
      </div>
    </Link>
  );
};

export default Logo;
