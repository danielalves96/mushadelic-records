'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from 'emailjs-com';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  name: z.string().min(1, { message: 'Please enter your name' }).max(30, 'Please use 30 characters or less'),
  artist_name: z
    .string()
    .min(1, { message: 'Please enter your artist name' })
    .max(30, 'Please use 30 characters or less'),
  soundcloud_link: z.string().url({ message: 'Please enter a valid SoundCloud link' }),
  message: z.string().min(1, { message: 'Please enter a release description' }),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const { name, email, message, artist_name, soundcloud_link } = data;

    try {
      const templateParams = {
        name,
        email,
        message,
        artist_name,
        soundcloud_link,
      };

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE as string,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_DEMO as string,
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_USER as string
      );

      toast({
        title: 'Success!',
        description: 'Your demo was sent successfully.',
      });

      reset();
    } catch (e) {
      console.error(e);
      toast({
        title: 'Error!',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Submit Your Demo</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label>Email</label>
          <Input type="email" {...register('email')} className="mt-2" disabled={isSubmitting} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label>Name</label>
          <Input type="text" {...register('name')} className="mt-2" disabled={isSubmitting} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label>Artist Name</label>
          <Input type="text" {...register('artist_name')} className="mt-2" disabled={isSubmitting} />
          {errors.artist_name && <p className="text-red-500 text-sm mt-1">{errors.artist_name?.message?.toString()}</p>}
        </div>

        <div className="mb-4">
          <label>SoundCloud Demo (Private Link)</label>
          <Input type="text" {...register('soundcloud_link')} className="mt-2" disabled={isSubmitting} />
          {errors.soundcloud_link && (
            <p className="text-red-500 text-sm mt-1">{errors.soundcloud_link?.message?.toString()}</p>
          )}
        </div>

        <div className="mb-4">
          <label>Release of Your Project</label>
          <Textarea rows={5} {...register('message')} className="mt-2" disabled={isSubmitting} />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message?.message?.toString()}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              Sending...
            </>
          ) : (
            'Send'
          )}
        </Button>
      </form>
      <Toaster />
    </div>
  );
}
