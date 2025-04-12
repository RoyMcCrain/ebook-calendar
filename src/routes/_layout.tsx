import { UserButton } from "@clerk/clerk-react";
import {
	Link as L,
	Outlet,
	createFileRoute,
	createLink,
	redirect,
} from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "#/components/ui/navigation-menu";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (!context.isAuth) {
			throw redirect({ to: "/login" });
		}
	},
});

function RouteComponent() {
	const Link = createLink(NavigationMenuLink);
	return (
		<>
			<header className="flex items-center gap-4 bg-gray-100 p-4 md:gap-10">
				<div className="w-20 text-lg md:w-full md:text-2xl">
					<L to="/">Ebook calendar</L>
				</div>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link to="/" className={navigationMenuTriggerStyle()}>
								Calendar
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link to="/list" className={navigationMenuTriggerStyle()}>
								List
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link to="/search" className={navigationMenuTriggerStyle()}>
								Search
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
				<div className="ml-auto">
					<UserButton />
				</div>
			</header>
			<main className="px-12 py-4">
				<Outlet />
			</main>
		</>
	);
}
