
import { z } from "zod";

export const suggestionSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  message: z.string().min(10, {
    message: "Suggestion must be at least 10 characters.",
  }).max(500, {
    message: "Suggestion cannot exceed 500 characters.",
  }),
});

export type SuggestionFormValues = z.infer<typeof suggestionSchema>;
