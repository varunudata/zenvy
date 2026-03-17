"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-md w-full space-y-10">
                <div className="text-center">
                    <h2 className="text-3xl font-medium tracking-tighter uppercase text-black mb-2">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-sm text-[var(--color-muted-foreground)] tracking-wide">
                        {isLogin
                            ? "Enter your details to access your account."
                            : "Sign up to experience our curated collections."}
                    </p>
                </div>

                <form className="mt-12 space-y-8" onSubmit={(e) => e.preventDefault()}>
                    {!isLogin && (
                        <div className="space-y-6">
                            <Input
                                label="Full Name"
                                type="text"
                                placeholder="Eleanor Shellstrop"
                                required
                            />
                            <Input
                                label="Mobile Number (Optional)"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    )}

                    <div className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="eleanor@example.com"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {isLogin && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded-sm"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-xs tracking-wide text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] hover:text-black transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                    )}

                    <div className="pt-4">
                        <Button variant="primary" size="full" type="submit">
                            {isLogin ? "Sign In" : "Register"}
                        </Button>
                    </div>
                </form>

                <div className="text-center mt-8">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)] hover:text-black transition-colors"
                    >
                        {isLogin ? "Create a new account" : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}
