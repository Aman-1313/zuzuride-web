"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <Image
            src="/og-image.png"
            alt="Zuzuride logo"
            width={100}
            height={100}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/find" className="hover:text-primary">
                  Find a Ride
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/login" className="hover:text-primary">
                  Offer a Ride
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/how-it-works" className="hover:text-primary">
                  How It Works
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild>
            <Link href="/login">Sign Up / Log In</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-white shadow-xl p-6 flex flex-col"
            >
              {/* Header with Close */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Menu</h2>

              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/find"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Find a Ride
                </Link>
                <Link
                  href="/login"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Offer a Ride
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  How It Works
                </Link>
              </nav>

              {/* CTA at bottom */}
              <div className="mt-auto">
                <Button asChild className="w-full">
                  <Link href="/login">Sign Up / Log In</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
