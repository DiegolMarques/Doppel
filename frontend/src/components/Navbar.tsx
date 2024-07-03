'use client'
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Import auth from your firebase.ts file

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
              {user ? (
                <Button
                  onClick={handleSignOut}
                  // variant="destructive"
                  size="sm"
                  className="flex items-center"
                >
                  Sign Out <LogOut className="ml-1.5 h-5 w-5" />
                </Button>
              ) : (
                <>
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
                </>
              )}
              {/* <ThemeToggle /> */}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;