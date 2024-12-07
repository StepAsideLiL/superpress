import Image from "next/image";
import LoginForm from "./_parts/LoginForm";
import Link from "next/link";
import LostPassword from "./_parts/LostPassword";

export default function Page() {
  return (
    <main className="container mx-auto">
      <section className="mx-auto flex w-96 flex-col space-y-5 pt-20">
        <Image
          src={"/sp-logo.png"}
          alt="SuperPress Logo"
          width={100}
          height={100}
          className="mx-auto"
        />

        <LoginForm />

        <LostPassword />

        <Link href={"/"} className="w-fit text-sm hover:underline">
          Go to Home
        </Link>
      </section>
    </main>
  );
}
