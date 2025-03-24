"use client";

import { useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const {
    isAuthenticated,
    updateLastActivity,
    checkInactivity,
    logout,
    keepLoggedIn
  } = useAuthStore();

  // Hydrate auth store on client
  useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []);

  // Function to handle user activity
  const handleUserActivity = useCallback(() => {
    if (isAuthenticated) {
      updateLastActivity();
    }
  }, [isAuthenticated, updateLastActivity]);

  // Setup activity tracking
  useEffect(() => {
    if (!isAuthenticated) return;

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

    // Register event listeners for user activity
    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

// u19cm1026
// edache

    // Check for inactivity periodically
    const inactivityCheck = setInterval(() => {
      if (checkInactivity()) {
        toast({
          title: "Session expired",
          description: "You have been logged out due to inactivity",
          variant: "destructive",
        });
        logout();
        router.push("/login");
      }
    }, 10000); // Check every 10 seconds

    return () => {
      // Cleanup event listeners
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearInterval(inactivityCheck);
    };
  }, [isAuthenticated, handleUserActivity, checkInactivity, logout, router, toast]);

  // Check for protected routes
  useEffect(() => {
    const publicRoutes = ['/login', '/register'];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isAuthenticated && !isPublicRoute) {
      router.push('/login');
    } else if (isAuthenticated && isPublicRoute) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, pathname, router]);

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
