import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { getBlocks, getDb, getPage } from "@/lib/notion";
import { Heading, Section, Text, Separator } from "@radix-ui/themes";
import { format } from "date-fns";
import { render } from "@/components/notion/renderer";
import { Fragment } from "react";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: PostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousTitle = (await parent).title?.absolute;

  const pageId = params.slug.split("-").at(-1)!;
  const page = await getPage(pageId);
  if (!page) {
    return {
      title: previousTitle,
    };
  }

  const pageTitle = page.properties.Name.title[0].plain_text;

  return {
    title: `${pageTitle} | ${previousTitle}`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const pageId = params.slug.split("-").at(-1)!;
  const page = await getPage(pageId);
  if (!page) {
    return notFound();
  }

  const pageData = {
    title: page.properties.Name.title[0].plain_text,
    date: format(
      new Date(page.properties.Date.date.start),
      "EEEE, MMMM dd, yyyy"
    ),
  };

  const blocks = await getBlocks(pageId);

  return (
    <Section size="1">
      <Heading size="7">{pageData.title}</Heading>
      <Text as="p" size="3" color="gray">
        {pageData.date}
      </Text>
      <Separator size="2" my="6" />
      {blocks.map((block) => (
        <Fragment key={block.id}>{render(block)}</Fragment>
      ))}
    </Section>
  );
}

export async function generateStaticParams() {
  const blogDbId = process.env.NOTION_BLOG_DB_ID!;
  const db = await getDb(blogDbId);
  if (!db) {
    return null;
  }

  const posts = db.map((page) => ({
    slug: page.url.split("/").at(-1),
  }));

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = true;
