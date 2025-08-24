"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import {AppPromo} from "@/components/AppPromo";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Car, ShieldCheck, Users } from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../public/drive.json";
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <Image
          src="/background.jpg"
          alt="Calgary Skyline"
          width={1920}
          height={600}
          priority
          className="object-cover object-center opacity-90"
        />
      </motion.div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-30 pt-60 text-center relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg px-8 py-12 max-w-3xl">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl font-bold leading-tight drop-shadow-md"
          >
            Affordable Carpooling Across Alberta
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground drop-shadow-md"
          >
            Skip the long drives and save money. Find safe and reliable rides
            between Calgary, Edmonton, and Red Deer.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg">
              <Link href="/find">Find a Ride</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Offer a Ride</Link>
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Info Sections with Cards */}
      <section className="relative z-10 bg-white py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {[
            {
              icon: Car,
              title: "Easy Carpooling",
              desc: "Share your journey with others going the same way. Post or book a ride in just a few clicks.",
            },
            {
              icon: Users,
              title: "Save Money",
              desc: "Split travel costs and enjoy more affordable trips across Alberta with fellow passengers.",
            },
            {
              icon: ShieldCheck,
              title: "Safe & Reliable",
              desc: "Profiles, ratings, and secure payments ensure trust on every ride.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="py-6">
                <CardHeader className="flex flex-col items-center text-center">
                  <item.icon className="w-12 h-12 text-primary mb-3" />
                  <CardTitle className="text-xl font-semibold">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-center">
                  {item.desc}
                </CardContent>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <div className="w-full z-10 bg-white flex flex-col md:flex-row items-center justify-center py-12 md:py-20 px-6 gap-8">
        {/* Lottie Animation */}
        <div className="flex justify-center">
          <div className="w-28 md:w-64">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="max-w-2xl text-center md:text-left space-y-4">
          <CardHeader className="flex justify-center md:justify-center mt-4t">
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              Where do you want to drive to?
            </CardTitle>
          </CardHeader>

          <CardContent className="flex justify-center md:justify-center mt-4 text-muted-foreground">
            Save money by sharing your ride and connect with other drivers and passengers
          </CardContent>

          {/* CTA Button */}
            <div className="flex justify-center md:justify-center mt-4">
              <Button asChild size="lg" className="px-8 py-3">
                <Link href="/login">Offer a Ride</Link>
              </Button>
            </div>
        </div>
      </div>
      <AppPromo />
      {/* Footer */}
      <footer className="w-full border-t py-6 text-center text-sm relative z-10 bg-white">
        © {new Date().getFullYear()} Zuzuride · All rights reserved.
      </footer>
    </div>
  );
}
