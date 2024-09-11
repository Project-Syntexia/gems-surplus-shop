"use client";

import { SignedOut, useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import Button from "@/app/_components/button";
import Paragraph from "@/app/_components/paragraph";
import { inputClasses } from "@/app/_components/product";
import { EMPTY_STRING, SHOP_NAME } from "@/utils/const";

const initialState = {
  username: EMPTY_STRING,
  password: EMPTY_STRING,
};

const Page = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const hasNoUser = isSignedIn === undefined || isSignedIn === false;
  const [state, setState] = useState(initialState);
  const { signIn, setActive } = useSignIn();
  const noCapitalClasses = inputClasses.replace("capitalize", EMPTY_STRING);

  useEffect(() => {
    if (!hasNoUser) {
      router.replace("/");
    }
  }, [hasNoUser, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.password === EMPTY_STRING || state.username === EMPTY_STRING) {
      return alert("Empty fields");
    }
    const result = await signIn?.create({
      identifier: state.username,
      password: state.password,
    });

    try {
      if (
        result !== undefined &&
        result.status === "complete" &&
        setActive !== undefined
      ) {
        setState(initialState);
        await setActive({ session: result.createdSessionId! });
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input: HTMLInputElement = e.currentTarget;
    const key = input.id as keyof typeof state;
    setState((prevState) => ({ ...prevState, [key]: input.value }));
  }

  return (
    <>
      <SignedOut>
        <div className="flex h-screen items-center justify-center bg-gradient-to-tl from-primary via-paper">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-2 rounded-lg border border-primary bg-paper/20 p-8 shadow-sm"
          >
            <h1 className="w-64 pb-4 text-center text-xl font-bold text-primary">{`${SHOP_NAME} Admin`}</h1>
            <input
              className={noCapitalClasses}
              disabled={!hasNoUser}
              id="username"
              name="username"
              onChange={handleChange}
              value={state.username}
              placeholder="Username"
            />
            <input
              className={noCapitalClasses}
              disabled={!hasNoUser}
              id="password"
              name="password"
              onChange={handleChange}
              value={state.password}
              placeholder="Password"
              type="password"
            />
            <Button disabled={!hasNoUser} type="submit">
              <Paragraph text="Login" />
            </Button>
          </form>
        </div>
      </SignedOut>
    </>
  );
};

export default Page;
