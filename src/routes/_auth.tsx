import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<SignedOut>
				<Button variant="outline" className="w-full" asChild>
					<SignInButton>サインインする</SignInButton>
				</Button>
			</SignedOut>
			<SignedIn>
				<Outlet />
			</SignedIn>
		</>
	);
}
