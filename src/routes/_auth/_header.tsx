import { UserButton } from "@clerk/clerk-react";
import { Outlet, createFileRoute, createLink } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "#/components/ui/navigation-menu";

export const Route = createFileRoute("/_auth/_header")({
	component: RouteComponent,
});

function RouteComponent() {
	const Link = createLink(NavigationMenuLink);
	return (
		<>
			<header className="flex items-center gap-10 bg-gray-100 p-4">
				<div className="text-2xl">Ebook calendar</div>
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link to="/" className={navigationMenuTriggerStyle()}>
								Home
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
					<UserButton showName />
				</div>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
}
