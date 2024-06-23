import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// This component is used to wrap the children components with a max-width of the screen using a util function from the utils.ts file.
const MaxWidthWrapper = ({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20", className)}>
      {children}
    </div>
  );
}

export default MaxWidthWrapper;