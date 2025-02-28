import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

const Toaster = ({ ...props }: React.ComponentProps<typeof Sonner>) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as React.ComponentProps<typeof Sonner>["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

const LoadingSonner = (message: string, duration = 3000) => {
    const id = toast.custom((t) => (
      <div className="flex flex-col gap-2 p-4 bg-background rounded-lg shadow-lg border border-border">
        <span>{message}</span>
        <Progress value={100} className="h-1 bg-primary/20" />
      </div>
    ), { duration });

    return id;
};


export { Toaster, LoadingSonner };
