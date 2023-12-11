"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Link } from "@radix-ui/themes";

interface NavLinkProps {
  name: string;
  route: string;
}

export const NavLink = ({ name, route }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive = (route) => {
    const pathnameSegments = pathname.split("/");
    const routeSegments = route.split("/");
    return pathnameSegments[1] === routeSegments[1];
  };

  return isActive(route) ? (
    <Link asChild highContrast underline="always">
      <NextLink href={route}>{name}</NextLink>
    </Link>
  ) : (
    <Link asChild underline="always">
      <NextLink href={route}>{name}</NextLink>
    </Link>
  );
};
