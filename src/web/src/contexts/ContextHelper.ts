import { Context, useContext } from "react";

export const useOptionalContext = <T>(ctx: Context<T | undefined>): T => {
  const context = useContext(ctx);
  if (context === undefined)
    throw new Error(
      "Context is undefined. Be sure you are using it under the appropriate provider"
    );
  return context;
};
