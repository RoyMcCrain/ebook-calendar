import { UserButton } from "@clerk/clerk-react";
import {
	Link as L,
	Outlet,
	createFileRoute,
	createLink,
} from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "#/components/ui/navigation-menu";

export const Route = createFileRoute("/_auth/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	const Link = createLink(NavigationMenuLink);
	return (
		<>
			<header className="flex items-center md:gap-10 gap-4 bg-gray-100 p-4">
				<div className="md:text-2xl text-lg md:w-full w-20">
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
