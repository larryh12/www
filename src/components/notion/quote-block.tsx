import { Blockquote } from "@radix-ui/themes";
import { RichText } from "./rich-text";

export const QuoteBlock = ({ data }) => {
  return (
    <Blockquote my="5">
      {data.rich_text.map((text, idx) => (
        <RichText key={idx} data={text} />
      ))}
    </Blockquote>
  );
};
