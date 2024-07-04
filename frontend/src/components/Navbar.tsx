'use client'
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight, LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavItems = () => (
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
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href='/' className='flex z-40 font-semibold'>
            <span>doppel.</span>
          </Link>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="sm:hidden">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop menu */}
          <div className="hidden items-center space-x-4 sm:flex">
            <NavItems />
          </div>
        </div>
      </MaxWidthWrapper>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-x-0 top-14 z-50 sm:hidden">
          <div className="bg-background border-b border-gray-200 shadow-lg">
            <MaxWidthWrapper>
              <div className="flex flex-col items-center space-y-4 py-4">
                <NavItems />
              </div>
            </MaxWidthWrapper>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;