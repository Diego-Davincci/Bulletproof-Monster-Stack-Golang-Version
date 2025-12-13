import { AuroraText } from "@/components/ui/aurora-text";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight">
        <AuroraText>Bulletproof Monster Stack</AuroraText> 🔥
      </h1>
    </main>
  );
}
