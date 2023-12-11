import { render } from "@/components/notion/renderer";
import { getBlocks } from "@/lib/notion";
import { Section } from "@radix-ui/themes";
import { Fragment } from "react";

export default async function Home() {
  const aboutPageId = process.env.NOTION_ABOUT_PAGE_ID!;
  const blocks = await getBlocks(aboutPageId);

  return (
    <Section size="1" className="about-page">
      {blocks.map((block) => (
        <Fragment key={block.id}>{render(block)}</Fragment>
      ))}
    </Section>
  );
}
