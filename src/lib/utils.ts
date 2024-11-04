import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyToClipboard(text: string) {
  try {
    navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

export function isJson(str: string){
  try {
    JSON.parse(str);
  } catch (err) {
    console.log('not json', err);
    return false;
  }
  return true;
}

// 去转义符
export function unescape(str: string) {
  return str.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t').replace(/\\b/g, '\b').replace(/\\f/g, '\f').replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}
