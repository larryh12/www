import { Text } from "@radix-ui/themes";
import { RichText } from "./rich-text";

export const ParagraphBlock = ({ data }) => {
  return (
    <Text as="p" my="5">
      {data.rich_text.map((text, idx) => (
        <RichText key={idx} data={text} />
      ))}
    </Text>
  );
};
