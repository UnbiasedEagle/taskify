import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full p-4 border-t bg-slate-100'>
      <div className='md:max-w-screen-2xl relative mx-auto flex justify-center md:justify-between items-center w-full'>
        <Logo />
        <div className='text-center flex justify-center items-center text-neutral-600'>
          <span>
            Developed by{' '}
            <a
              href='mailto:devsaurabhsingh@gmail.com'
              className='font-semibold ml-0 text-neutral-800 underline'
            >
              Saurabh Singh
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
