"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { db, auth } from "@/firebase/config";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import FindRideForm from "@/components/FindRideForm";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  const [userData, setUserData] = useState<any>(null);
  const [nearbyRides, setNearbyRides] = useState<any[]>([]);
  const [loadingRides, setLoadingRides] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          const user = docSnap.data();
          setUserData(user);
          if (user.location) {
            fetchNearbyRides(user.location);
          }
        }
      } else {
        setUserData(null);
      }
      setLoadingUser(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchNearbyRides = async (location: string) => {
    setLoadingRides(true);
    try {
      const today = new Date().toISOString().split("T")[0];

      let snapshot = await getDocs(query(collection(db, "rides"), where("from", "==", location)));
      let docsToUse = snapshot.docs;

      if (docsToUse.length === 0) {
        const allRidesSnap = await getDocs(collection(db, "rides"));
        docsToUse = allRidesSnap.docs;
      }

      const allValidRides: any[] = [];

      for (const docSnap of docsToUse) {
        const ride = { id: docSnap.id, ...docSnap.data() };
        const dateToCheck = Array.isArray(ride.dates) ? ride.dates[0] : ride.date;
        if (!dateToCheck || dateToCheck < today) continue;

        const driverSnap = await getDoc(doc(db, "users", ride.driverId));
        const driverData = driverSnap.exists() ? driverSnap.data() : {};

        allValidRides.push({
          ...ride,
          userName: driverData.name,
          userPhoto: driverData.photoURL,
          fromCity: ride.from,
          toCity: ride.to,
          rideDate: dateToCheck,
        });
      }

      const upcomingRides = allValidRides
        .sort((a, b) => new Date(a.rideDate).getTime() - new Date(b.rideDate).getTime())
        .slice(0, 3);

      setNearbyRides(upcomingRides);
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoadingRides(false);
    }
  };

  if (loadingUser) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen">Please log in</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Top Section */}
      <div className="relative w-full h-96">
        <Image src="/car-doodle.png" alt="Top Image" fill className="object-cover" />
        <div className="absolute top-10 left-10 flex justify-between w-[calc(100%-40px)] items-center">
          <h1 className="text-3xl font-bold text-white drop-shadow">
            {`Hi, ${userData.name?.split(" ").map((w: string) => w[0].toUpperCase() + w.slice(1)).join(" ")}`}
          </h1>
          {userData.photoURL ? (
            <Image src={userData.photoURL} alt="Avatar" width={44} height={44} className="rounded-full border-2 border-white" />
          ) : (
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white">
              <span className="text-white font-bold">{userData.name?.charAt(0).toUpperCase() || "U"}</span>
            </div>
          )}
        </div>
      </div>

      {/* Find Ride Form */}
      <div className="max-w-3xl mx-auto -mt-36 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10 p-6">
        <h2 className="text-center text-white text-xl font-extrabold mb-4">Find Rides</h2>
        <FindRideForm fetchNearbyRides={fetchNearbyRides} />
      </div>
    </div>
  );
}
