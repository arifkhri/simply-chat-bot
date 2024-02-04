"use client"

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "../../lib/shadcnUI";
import { BaseProps } from "../../../global";

const Avatar = React.forwardRef(({ className, ...props }: BaseProps, ref: React.Ref<HTMLSpanElement>) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative border p-1 flex justify-center flex h-7 w-7 shrink-0 overflow-hidden rounded-full", className)}
    {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }: BaseProps, ref: React.Ref<HTMLImageElement>) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }: BaseProps, ref: React.Ref<HTMLSpanElement>) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarFallback,AvatarImage }
