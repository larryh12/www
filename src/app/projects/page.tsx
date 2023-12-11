import NextLink from "next/link";
import { getDb } from "@/lib/notion";
import { notFound } from "next/navigation";
import { Flex, Section, Text } from "@radix-ui/themes";

export default async function ProjectsPage() {
  const projectDbId = process.env.NOTION_PROJECT_DB_ID!;
  const db = await getDb(projectDbId);
  if (!db) {
    return notFound();
  }

  const projects = db.map((page) => ({
    id: page.id,
    name: page.properties.Name.title[0].plain_text,
    description: page.properties.Description.rich_text[0].plain_text,
    url: page.properties.URL.url,
  }));

  return (
    <Section size="1">
      <Flex direction="column" gap="5">
        {projects.map((proj) => (
          <Flex key={proj.id} direction="column">
            <Text weight="medium">
              <NextLink href={proj.url} target="_blank">
                {proj.name}
              </NextLink>
            </Text>
            <Text color="gray">{proj.description}</Text>
          </Flex>
        ))}
      </Flex>
    </Section>
  );
}
