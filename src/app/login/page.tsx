"use client";

import { SignedOut, useSignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { baseWithColorClasses as buttonBaseClasses } from "@/app/_components/button";
import Input from "@/app/_components/input";
import Paragraph from "@/app/_components/paragraph";
import Parent from "@/app/_components/parent";
import { EMPTY_STRING, SHOP_NAME } from "@/utils/const";
import { useGlobalStateContext } from "../_components/state-provider";
import { useSelector } from "@xstate/react";

const initialState = {
  username: EMPTY_STRING,
  password: EMPTY_STRING,
};

const Page = () => {
  const router = useRouter();
  const user = useUser();
  const { inputGlobalAccessibilityService } = useGlobalStateContext();
  const inputState = useSelector(
    inputGlobalAccessibilityService,
    (snapshot) => snapshot.context.state,
  );
  const isSignedIn =
    !(user.isSignedIn === undefined || user.isSignedIn === false) ||
    inputState === "default" ||
    inputState === "logging-in" ||
    inputState === "initial";
  const [state, setState] = useState(initialState);
  const { signIn, setActive } = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router]);

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
        inputGlobalAccessibilityService.send({
          type: "input.signIn",
        });
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
        <Parent className="flex h-screen items-center justify-center bg-gradient-to-tl from-primary via-paper">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col gap-2 rounded-lg border border-primary bg-paper/20 p-8 shadow-sm"
          >
            <h1 className="w-64 pb-4 text-center text-xl font-bold text-primary">{`${SHOP_NAME} Admin`}</h1>
            <Input
              disabled={isSignedIn}
              id="username"
              name="username"
              onChange={handleChange}
              value={state.username}
              placeholder="Username"
            />
            <Input
              disabled={isSignedIn}
              id="password"
              name="password"
              onChange={handleChange}
              value={state.password}
              placeholder="Password"
              type="password"
            />
            <button
              className={buttonBaseClasses}
              disabled={isSignedIn}
              type="submit"
            >
              <Paragraph text="Login" />
            </button>
          </form>
        </Parent>
      </SignedOut>
    </>
  );
};

export default Page;
