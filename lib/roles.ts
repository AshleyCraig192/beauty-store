import { auth } from "@clerk/nextjs/server";

export async function isAdmin() {
  const { sessionClaims, userId } = await auth();
  console.log("Session claims:", JSON.stringify(sessionClaims));
  console.log("User ID:", userId);
  const metadata = sessionClaims?.metadata as { role?: string } | undefined;
  console.log("Metadata:", metadata);
  return metadata?.role === "admin";
}