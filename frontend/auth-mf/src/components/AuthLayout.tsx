import { useState } from "react";
import LoginForm from "./LoginForm";
import Registration from "./Registration";

export default function AuthLayout() {
  const [isSignUp, setIsSignUp] = useState(true);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#C9385F] px-4 py-8 sm:px-6">
      {/* Decorative Shapes */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 h-40 w-40 rounded-full bg-linear-to-br from-[#C9385F] via-[#f34a71] to-[#fb415d] md:h-72 md:w-72"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-linear-to-br from-[#C9385F] via-[#f34a71] to-[#fb415d] md:h-96 md:w-96"
      />

      <section className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-md bg-white shadow-2xl md:flex-row">
        {/* Left Side */}
        <aside className="relative flex h-48 items-center justify-center bg-gradient-to-b from-[#D93F68] to-[#f64e67] p-8 md:h-auto md:w-[40%] md:p-12">
          <header className="text-white">
            <h1 className="text-3xl font-bold md:text-5xl">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h1>

            <hr className="mt-3 h-1 w-14 border-0 bg-white" />
          </header>

          <button
            type="button"
            aria-label={`Switch to ${isSignUp ? "Login" : "Sign Up"
              } form`}
            onClick={() => setIsSignUp(!isSignUp)}
            className="absolute
              -bottom-7
              left-1/2
              z-10
              flex
              h-14
              w-14
              -translate-x-1/2
              items-center
              justify-center
              rounded-full
              bg-[#E44C74]
              text-3xl
              font-bold
              text-white
              shadow-lg
              transition
              hover:scale-105
              md:bottom-auto
              md:left-auto
              md:-right-7
              md:top-1/2
              md:-translate-y-1/2
              md:translate-x-0"
          >
            →
          </button>
        </aside>

        {/* Right Side */}
        <section className="flex flex-1 flex-col justify-center bg-white px-6 py-12 sm:px-8 md:px-14">
          <nav
            aria-label="Authentication options"
            className="mb-8 flex flex-wrap justify-center gap-2 md:justify-end"
          >
            <button
              type="button"
              onClick={() => setIsSignUp(true)}
              className={`px-4 py-2 text-sm font-medium transition ${isSignUp
                ? "bg-[#C9385F] text-white"
                : "bg-gray-100 text-[#C9385F]"
                }`}
            >
              SIGN UP
            </button>

            <button
              type="button"
              onClick={() => setIsSignUp(false)}
              className={`px-4 py-2 text-sm font-medium transition ${isSignUp
                ? "bg-gray-100 text-[#C9385F]"
                : "bg-[#C9385F] text-white"
                }`}
            >
              LOGIN
            </button>
          </nav>

          <article>
            {isSignUp ? <Registration /> : <LoginForm />}
          </article>
        </section>
      </section>
    </main>
  );
}