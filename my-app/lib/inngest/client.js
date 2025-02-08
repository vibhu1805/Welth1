import { Inngest } from "inngest";

  {/* Changes id and name from finance-platform to welth */}
  {/* as was written in video in video but gitrepo has finance-platform */}

export const inngest = new Inngest({
  id: "welth", // Unique app ID
  name: "welth",
  retryFunction: async (attempt) => ({
    delay: Math.pow(2, attempt) * 1000, // Exponential backoff
    maxAttempts: 2,
  }),
});