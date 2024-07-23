import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProgressDots from '@/components/ProgressDots';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 text-center">
        <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">
          Your Doppel Dashboard
        </h1>
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Your First Project</h2>
          <p className="text-gray-600 mb-6">Start by creating your first Doppel project.</p>
          <Link href="/onboarding/add-project" className={buttonVariants({
            size: "lg",
            className: 'w-full'
          })}>
            Add Project <ArrowRight className='ml-2 h-5 w-5' />
          </Link>
        </div>
      </div>
      <ProgressDots totalSteps={3} currentStep={2} />
    </div>
  );
}