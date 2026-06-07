"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

 const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgetPassword" ||
    pathname === "/verifyemail"
  ) {
    return;
  }

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/users/me");
      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  checkAuth();
}, [pathname]);
const router = useRouter();

const logout = async () => {
  try {
    await axios.get("/api/users/logout");

    localStorage.removeItem("userId");

    toast.success("Logged out successfully");

    setIsLoggedIn(false);

router.replace("/login");
router.refresh();
  } catch (error) {
    toast.error("Logout failed");
  }
};

  // Hide navbar on auth pages
  const hideNavbar =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgetPassword" ||
    pathname === "/verifyemail";

  if (hideNavbar) return null;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          
          <Link
            href={isLoggedIn ? "/profile" : "/about"}
            className="text-white font-bold text-xl md:text-3xl"
          >
            🚗 Driver Safety AI
          </Link>

          <div className="hidden md:flex items-center gap-3">

            {isLoggedIn ? (
              <>
                <Link
                  href="/about"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-blue-500/20 border border-white/10 text-white"
                >
                  About
                </Link>

                <Link
                  href="/image"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-blue-500/20 border border-white/10 text-white"
                >
                  Image Detection
                </Link>

                <Link
                  href="/video"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-blue-500/20 border border-white/10 text-white"
                >
                  Video Detection
                </Link>

                <Link
                  href="/profile"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-blue-500/20 border border-white/10 text-white"
                >
                  Profile
                </Link>

                <button
  onClick={logout}
  className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white"
>
  Logout
</button>
              </>
            ) : (
              <>
                {pathname !== "/about" && (
                  <Link
                    href="/about"
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-blue-500/20 border border-white/10 text-white"
                  >
                    About
                  </Link>
                )}

                <Link
                  href="/login"
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-blue-500/20 border border-white/10 text-white"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={30} />
          </button>
        </div>
      </nav>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-slate-950 border-l border-blue-900 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-blue-900">
          <h2 className="text-white font-bold text-xl">Menu</h2>

          <button
            onClick={() => setOpen(false)}
            className="text-white"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col p-5 gap-4">

          {isLoggedIn ? (
            <>
              <Link href="/about" onClick={() => setOpen(false)} className="text-white bg-white/10 p-4 rounded-xl">
                About
              </Link>

              <Link href="/image" onClick={() => setOpen(false)} className="text-white bg-white/10 p-4 rounded-xl">
                Image Detection
              </Link>

              <Link href="/video" onClick={() => setOpen(false)} className="text-white bg-white/10 p-4 rounded-xl">
                Video Detection
              </Link>

              <Link href="/profile" onClick={() => setOpen(false)} className="text-white bg-white/10 p-4 rounded-xl">
                Profile
              </Link>

              <button
  onClick={logout}
  className="bg-red-600 text-white p-4 rounded-xl text-center"
>
  Logout
</button>
            </>
          ) : (
            <>
              {pathname !== "/about" && (
                <Link href="/about" onClick={() => setOpen(false)} className="text-white bg-white/10 p-4 rounded-xl">
                  About
                </Link>
              )}

              <Link href="/login" onClick={() => setOpen(false)} className="text-white bg-white/10 p-4 rounded-xl">
                Login
              </Link>

              <Link href="/signup" onClick={() => setOpen(false)} className="bg-green-600 text-white p-4 rounded-xl text-center">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}