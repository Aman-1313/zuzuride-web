"use client";

import { useState, useRef } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";

export default function FindRideForm() {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const fromRef = useRef<google.maps.places.Autocomplete | null>(null);
  const toRef = useRef<google.maps.places.Autocomplete | null>(null);

  const router = useRouter();

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please select both origin and destination");
      return;
    }
    router.push(
      `/ride-results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyA2j64TE-eDVL98WHNlQKVMJjT9eogz2K8" // 🔑 Inline API Key
      libraries={["places"]}
    >
      <div className="w-full max-w-lg mx-auto p-4 space-y-4">
        {/* From City */}
        <div className="bg-white rounded-lg shadow-md p-2">
          <Autocomplete
            onLoad={(auto) => (fromRef.current = auto)}
            onPlaceChanged={() => {
              const place = fromRef.current?.getPlace();
              setFrom(place?.formatted_address || "");
            }}
            options={{
              types: ["(cities)"], // ✅ restrict to cities
              componentRestrictions: { country: "ca" }, // optional: restrict to Canada
            }}
          >
            <input
              type="text"
              placeholder="Leaving From (City)"
              className="w-full p-3 border rounded-lg shadow-sm"
            />
          </Autocomplete>
        </div>

        {/* To City */}
        <div className="bg-white rounded-lg shadow-md p-2">
          <Autocomplete
            onLoad={(auto) => (toRef.current = auto)}
            onPlaceChanged={() => {
              const place = toRef.current?.getPlace();
              setTo(place?.formatted_address || "");
            }}
            options={{
              types: ["(cities)"], // ✅ restrict to cities
              componentRestrictions: { country: "ca" }, // optional: restrict to Canada
            }}
          >
            <input
              type="text"
              placeholder="Going To (City)"
              className="w-full p-3 border rounded-lg shadow-sm"
            />
          </Autocomplete>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-black text-white py-3 rounded-lg font-bold text-lg hover:bg-gray-900 transition"
        >
          Search
        </button>
      </div>
    </LoadScript>
  );
}
