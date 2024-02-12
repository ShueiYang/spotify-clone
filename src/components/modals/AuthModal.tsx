"use client";

import { createClientSupabaseClient } from "@/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Modal from "./Modal";
import { useAuthModal } from "@/hooks/useAuthModal";

const AuthModal = () => {
  const router = useRouter();
  const supabase = createClientSupabaseClient();
  // Zustand custom hook
  const [isOpen, onClose, view] = useAuthModal((state) => [
    state.isOpen,
    state.onClose,
    state.view,
  ]);

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        router.refresh();
        onClose();
      }
    });
  }, [router, onClose, supabase.auth]);

  function onChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  return (
    <Modal
      title={view === "sign_in" ? "Welcome back" : "Sign up"}
      description={
        view === "sign_in"
          ? "Login to your account"
          : "Or sign in with your favorite account"
      }
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={["github", "google", "spotify"]}
        socialLayout="vertical"
        supabaseClient={supabase}
        view={view}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#10b981",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
