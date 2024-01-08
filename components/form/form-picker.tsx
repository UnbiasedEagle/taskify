'use client';

import { defaultImages } from '@/constants/images';
import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import FormErrors from './form-errors';

interface Props {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: Props) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const results = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (results && results.response) {
          const newImages = results.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error('Failed to images from unsplash');
        }
      } catch (error) {
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center p-6'>
        <Loader2 className='h-6 w-7 text-sky-700 animate-spin' />
      </div>
    );
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(
                'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
                pending && 'opacity-50 cursor-auto hover:opacity-50'
              )}
              onClick={() => {
                if (pending) return;
                setSelectedImageId(image.id);
              }}
            >
              <input
                type='radio'
                id={id}
                name={id}
                className='hidden'
                checked={selectedImageId === image.id}
                disabled={pending}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
              />
              <Image
                src={image.urls.thumb}
                fill
                alt='unspash-image'
                className='object-cover rounded-sm'
              />

              <Link
                href={image.links.html}
                target='_blank'
                className='opacity-0 group-hover:opacity-100 truncate text-white hover:underline absolute p-1 bg-black/50 bottom-0 w-full text-[10px]'
              >
                {image.user.name}
              </Link>

              {selectedImageId === image.id && (
                <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                  <Check className='h-4 w-4 text-white' />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <FormErrors errors={errors} id='image' />
    </div>
  );
};

export default FormPicker;
