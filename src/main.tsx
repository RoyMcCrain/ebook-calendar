import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "#/routeTree.gen";
import "./styles.css";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { jaJP } from "@clerk/localizations";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "#/lib/client";
import reportWebVitals from "#/reportWebVitals.ts";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

// Create a new router instance
const router = createRouter({
	routeTree,
	// biome-ignore lint/style/noNonNullAssertion: tanstack/react-routerの仕様
	context: { queryClient, isAuth: undefined! },
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const InnerApp = () => {
	const { isLoaded, isSignedIn } = useAuth();
	if (!isLoaded) {
		return null;
	}
	return (
		<RouterProvider
			router={router}
			context={{ queryClient, isAuth: isLoaded && isSignedIn }}
		/>
	);
};

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ClerkProvider
				publishableKey={PUBLISHABLE_KEY}
				afterSignOutUrl="/login"
				localization={jaJP}
			>
				<QueryClientProvider client={queryClient}>
					<InnerApp />
				</QueryClientProvider>
			</ClerkProvider>
		</StrictMode>,
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
