"use client";

import Image from "next/image";
import { Facebook, Instagram } from "lucide-react";

export default function ProfileCard({ member }) {
  const { name, post, imgSrc, desc, facebook, instagram } = member;
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-xl transition text-center">
      {/* Profile Image */}
      <div className="relative mx-auto h-28 w-28">
        <Image
          src={imgSrc} // replace with your image
          alt={name}
          fill
          className="rounded-full object-cover border-4 border-pink-500"
        />
      </div>

      {/* Name & Role */}
      <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {name}
      </h2>
      <p className="text-sm text-pink-600 dark:text-pink-400">
        {post}
      </p>

      {/* Personal Info */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {desc}
      </p>

      {/* Social Icons */}
      <div className="mt-4 flex justify-center gap-4">
        <a
          href={facebook}
          target="_blank"
          className="rounded-full bg-gray-100 p-2 hover:bg-blue-400 hover:text-white dark:bg-gray-700 dark:hover:bg-blue-400 transition-colors"
        >
          <Facebook className="h-5 w-5 text-gray-700 hover:text-white/80 dark:text-gray-200" />
        </a>

        {instagram && (<a
          href={instagram}
          target="_blank"
          className="rounded-full bg-gray-100 p-2 hover:bg-pink-400 dark:bg-gray-700 dark:hover:bg-pink-400 transition-colors"
        >
          <Instagram className="h-5 w-5 text-gray-700 hover:text-white dark:text-gray-200" />
        </a>)}
      </div>
    </div>
  );
}
