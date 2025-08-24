'use client';

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { auth, db } from "@/firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        const userCred = await signInWithEmailAndPassword(auth, email, password);
        await handlePostLogin(userCred.user.uid);
      } else {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        await handlePostLogin(userCred.user.uid);
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostLogin = async (uid: string) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email,
        createdAt: new Date(),
        roles: {},
      });
    }
    router.push("/homepage");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handlePostLogin(result.user.uid);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      const provider = new OAuthProvider("apple.com");
      const result = await signInWithPopup(auth, provider);
      await handlePostLogin(result.user.uid);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Navbar stays on top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Blurred background */}
      <div className="absolute inset-0 z-0 bg-cover bg-center backdrop-blur" style={{ backgroundImage: "url('/background.jpg')" }} />

      {/* Centered card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md shadow-lg p-6 backdrop-blur bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Login to Your Account" : "Create an Account"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <Button className="w-full mt-2" onClick={handleAuth} disabled={loading}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <div className="flex flex-col gap-3 mt-4">
              <Button variant="outline" onClick={handleGoogleLogin} className="flex items-center justify-center gap-2">
                <FcGoogle size={20} /> Continue with Google
              </Button>
              <Button variant="outline" onClick={handleAppleLogin} className="flex items-center justify-center gap-2">
                <FaApple size={20} /> Continue with Apple
              </Button>
            </div>

            <div className="text-center mt-4">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button onClick={() => setIsLogin(false)} className="text-primary font-semibold hover:underline">
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button onClick={() => setIsLogin(true)} className="text-primary font-semibold hover:underline">
                    Login
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
