import NextLink from "next/link";
import { getBlocks } from "@/lib/notion";
import { Fragment } from "react";
import { Flex, Section, Separator, Link, Text } from "@radix-ui/themes";

export const Footer = async () => {
  const contactPageId = process.env.NOTION_CONTACT_PAGE_ID!;
  const blocks = await getBlocks(contactPageId);
  const links = blocks.map((block) => ({
    id: block.id,
    name: block.paragraph.rich_text[0].plain_text,
    url: block.paragraph.rich_text[0].href,
  }));

  return (
    <Section size="2">
      <Separator size="4" my="2" />
      <Flex align="center" gap="4">
        {links.map((link) => (
          <Link key={link.name} asChild underline="always">
            <NextLink href={link.url} target="_blank">
              {link.name}
            </NextLink>
          </Link>
        ))}
      </Flex>
    </Section>
  );
};
