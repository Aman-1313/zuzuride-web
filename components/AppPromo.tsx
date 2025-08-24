"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export function AppPromo() {
  return (
    <section className="w-full bg-gradient-to-r from-white to-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="flex items-center gap-3 text-3xl md:text-4xl font-bold leading-tight">
            Take Zuzuride on the Go
            <Image
              src="/car-graphic.svg"
              alt="Mobile App"
              width={40}
              height={40}
              className="w-10 h-10 md:w-12 md:h-12"
            />
          </h2>
          <p className="text-lg text-muted-foreground">
            Book or offer rides anytime, anywhere with our mobile app.
            Stay connected, save money, and enjoy stress-free travel across Alberta.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {/* iOS Button */}
            <Button
              asChild
              size="lg"
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white flex items-center gap-2 rounded-xl"
            >
              <Link href="https://apps.apple.com/" target="_blank">

                <span>Download on iOS</span>
              </Link>
            </Button>

            {/* Android Button */}
            <Button
              asChild
              size="lg"
              className="px-6 py-3 bg-black hover:bg-gray-800 text-white flex items-center gap-2 rounded-xl"
            >
              <Link href="https://play.google.com/" target="_blank">
                <span>Get it on Android</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* App Mockup Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/mobile-app-mockup.png"
            alt="Zuzuride App"
            width={350}
            height={600}
            className="drop-shadow-2xl rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
