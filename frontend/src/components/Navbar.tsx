import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-border">
          <Link
            href='/'
            className='flex z-40 font-semibold'>
            <span>doppel.</span>
          </Link>

          {/* todo: add mobile navbar*/}

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link href='/pricing' className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}>
                Pricing
              </Link>
              <Link href='/login' className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}>
                Sign In
              </Link>
              <Link href='/signup' className={buttonVariants({
                size: "sm",
              })}>
                Get started <ArrowRight className='ml-1.5 h-5 w-5' />
              </Link>
              {/* <ThemeToggle /> */}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;