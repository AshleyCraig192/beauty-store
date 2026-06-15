import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#fffaf6" }}
    >
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#1a1a1a",
            colorBackground: "#ffffff",
            colorText: "#1a1a1a",
            colorTextSecondary: "#8c7b6e",
            colorInputBackground: "#fffaf6",
            colorInputText: "#1a1a1a",
            borderRadius: "0px",
            fontFamily: "inherit",
          },
          elements: {
            card: "shadow-none border border-[#f0e6dc]",
            headerTitle: "font-playfair text-2xl",
            headerSubtitle: "text-[#8c7b6e]",
            formButtonPrimary: "bg-[#1a1a1a] hover:bg-[#8c7b6e] text-white text-xs tracking-widest uppercase rounded-none",
            formFieldInput: "border-[#f0e6dc] rounded-none bg-[#fffaf6]",
            footerActionLink: "text-[#8c7b6e] hover:text-[#1a1a1a]",
            dividerLine: "bg-[#f0e6dc]",
            dividerText: "text-[#8c7b6e]",
          },
        }}
        routing="hash"
      />
    </div>
  );
}