import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-paper text-ink">
      <h1 className="font-display text-[20vw] font-black leading-none tracking-tighter">
        404
      </h1>
      <p className="mt-4 text-lg text-muted">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-8 py-3 font-bold text-white transition-colors hover:bg-zinc-800"
      >
        Back home
      </Link>
    </main>
  );
}
