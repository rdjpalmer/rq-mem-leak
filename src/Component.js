import * as React from "react";
import { useMutation } from "@tanstack/react-query";

export default function Component() {
  const { data, mutate, isLoading } = useMutation({
    mutationFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(Date.now());
        }, 100);
      });
    }
  });

  console.log({ data, isLoading });

  return (
    <>
      <div>Hello, world @ {isLoading ? "Loading…" : data}</div>
      <button
        onClick={() => {
          console.log("clicked");
          mutate();
        }}
      >
        Update
      </button>
    </>
  );
}
