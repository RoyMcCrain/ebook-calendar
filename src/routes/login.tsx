import { SignIn, SignedIn, SignedOut, UserProfile } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<SignedOut>
				<SignIn />
			</SignedOut>
			<SignedIn>
				<UserProfile />
			</SignedIn>
		</div>
	);
}
