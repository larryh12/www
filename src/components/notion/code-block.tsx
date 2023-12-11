import { highlight } from "@/lib/shiki";
import { Box, Card, Code, Flex } from "@radix-ui/themes";

export const CodeBlock = async ({ data }) => {
  const code = data.rich_text[0].plain_text;
  const lang = data.language;
  const caption = data.caption ? data.caption[0]?.plain_text : "";

  const html = await highlight(code, lang);

  return (
    <Card my="5">
      <Flex justify="between">
        {caption && (
          <Code variant="ghost" size="2">
            {caption}
          </Code>
        )}
        <Box grow="1" />
        <Code variant="ghost" size="2">
          {lang}
        </Code>
      </Flex>
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="code-container overflow-auto"
      />
    </Card>
  );
};
