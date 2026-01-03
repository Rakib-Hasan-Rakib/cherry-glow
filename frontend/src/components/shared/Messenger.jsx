import Link from "next/link";
import Image from "next/image";

export default function Messenger() {
  return (
    <Link
      href="https://m.me/cherryglow786"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on Messenger"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center
                 rounded-full bg-[#0084FF] shadow-xl
                 messenger-float
                 transition-transform hover:scale-105 active:scale-95"
    >
      <Image
        src="/icons/messenger.svg"
        alt="Messenger"
        width={28}
        height={28}
        priority
      />
    </Link>
  );
}
