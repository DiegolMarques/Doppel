import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProgressDots from '@/components/ProgressDots';

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          Welcome to <span className="text-blue-600">Doppel</span>
        </h1>
        <p className="text-xl text-zinc-700">
          Let's get started with your Doppel experience.
        </p>
        <Link href="/onboarding/dashboard" className={buttonVariants({
          size: "lg",
          className: 'w-full'
        })}>
          Next <ArrowRight className='ml-2 h-5 w-5' />
        </Link>
      </div>
      <ProgressDots totalSteps={3} currentStep={1} />
    </div>
  );
}