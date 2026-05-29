import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(
    (url) => {
      try {
        const { pathname, hostname } = new URL(url);

        const hasImageExtension =
          /\.(jpg|jpeg|png|gif|webp|svg|avif|bmp)(\?.*)?$/i.test(pathname);

        const isImageCDN = [
          "images.unsplash.com",
          "plus.unsplash.com",
          "res.cloudinary.com",
          "i.imgur.com",
          "images.pexels.com",
          "img.freepik.com",
          "media.istockphoto.com",
          "lh3.googleusercontent.com",
          "pbs.twimg.com",
        ].includes(hostname);

        return hasImageExtension || isImageCDN;
      } catch {
        return false;
      }
    },
    { message: "Please provide a valid image URL" } // ← new message confirms save worked
  ),

  pitch: z.string().min(10),
});


/*
import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
   .url({ message: "Please enter a valid URL" })
    .refine(
      async (url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);   // ✅ real image loaded
          img.onerror = () => resolve(false); // ❌ fake/non-image URL
          img.src = url;
        });
      },
      { message: "URL does not point to a real image" }
    ),

  pitch: z.string().min(10),
});
 */