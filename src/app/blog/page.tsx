import NextLink from "next/link";
import { getDb } from "@/lib/notion";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Flex, Section, Text } from "@radix-ui/themes";

export default async function BlogPage() {
  const blogDbId = process.env.NOTION_BLOG_DB_ID!;
  const db = await getDb(blogDbId);
  if (!db) {
    return notFound();
  }

  const posts = db.map((page) => ({
    id: page.id,
    slug: page.url.split("/").at(-1),
    title: page.properties.Name.title[0].plain_text,
    date: format(new Date(page.properties.Date.date.start), "MMM dd, yyyy"),
  }));

  return (
    <Section size="1">
      <Flex direction="column" gap="5">
        {posts.map((post) => (
          <Flex key={post.id} direction="column">
            <Text weight="medium">
              <NextLink href={`/blog/${post.slug}`}>{post.title}</NextLink>
            </Text>
            <Text color="gray">{post.date}</Text>
          </Flex>
        ))}
      </Flex>
    </Section>
  );
}
