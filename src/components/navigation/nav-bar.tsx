import { Flex, Section, Separator } from "@radix-ui/themes";
import { NavLink } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { name: "Projects", route: "/projects" },
  { name: "Blog", route: "/blog" },
  { name: "About", route: "/" },
];

export const NavBar = () => {
  return (
    <Section size="2">
      <Flex align="center" justify="between">
        <ThemeToggle />
        <Flex align="center" justify="end" gap="4">
          {navLinks.map((item) => (
            <NavLink key={item.name} name={item.name} route={item.route} />
          ))}
        </Flex>
      </Flex>
      <Separator size="4" my="3" />
    </Section>
  );
};
