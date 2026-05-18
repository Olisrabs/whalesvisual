import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageUrl = (pathOrUrl: string, compress: boolean = true) => {
  if (!pathOrUrl) return '';
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  
  if (compress) {
    return supabase.storage.from('gallery-images').getPublicUrl(pathOrUrl, {
      transform: {
        quality: 60,
        format: 'origin'
      }
    }).data.publicUrl;
  }

  return supabase.storage.from('gallery-images').getPublicUrl(pathOrUrl).data.publicUrl;
};
