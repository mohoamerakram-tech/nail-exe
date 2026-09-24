import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export const inputClass = 'mt-2 w-full rounded-xl border-2 border-[#57446d] bg-white px-3 py-2.5 font-pixel-body text-sm text-[#3b2b4e] outline-none focus:shadow-[2px_2px_0_#f472b6] disabled:bg-stone-100';
export const labelClass = 'block font-pixel-title text-[10px] text-[#4a3856]';

export function Field({ title, ...props }: InputHTMLAttributes<HTMLInputElement> & { title: string }) {
  return <label className={labelClass}>{title}<input {...props} className={`${inputClass} ${props.className || ''}`} /></label>;
}

export function Area({ title, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { title: string }) {
  return <label className={labelClass}>{title}<textarea {...props} className={`${inputClass} min-h-24 resize-y ${props.className || ''}`} /></label>;
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="pixel-card rounded-2xl bg-white p-5 sm:p-6"><h2 className="mb-5 border-b-2 border-[#fbcfe8] pb-3 font-pixel-title text-sm text-[#3b2b4e]">{title}</h2>{children}</section>;
}
