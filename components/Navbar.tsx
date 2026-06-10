import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-semibold tracking-tight text-gray-900">
        Beauty Store
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/shop" className="text-sm text-gray-600 hover:text-gray-900">
          Shop
        </Link>
        <Link href="/cart" className="text-sm text-gray-600 hover:text-gray-900">
          Cart
        </Link>
        {userId ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}