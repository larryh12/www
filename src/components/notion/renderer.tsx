import { Text, Code } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ParagraphBlock } from "./paragraph-block";
import { HeadingBlock } from "./heading-block";
import { QuoteBlock } from "./quote-block";
import { CalloutBlock } from "./callout-block";
import { ListBlock } from "./list-block";
import { ListItemBlock } from "./list-item-block";
import { TableBlock } from "./table-block";
import { ImageBlock } from "./image-block";
import { EquationBlock } from "./equation-block";
import { CodeBlock } from "./code-block";

export const render = (block) => {
  const { type } = block;
  const data = block[type];

  switch (type) {
    case "paragraph":
      return <ParagraphBlock data={data} />;

    case "heading_1":
    case "heading_2":
    case "heading_3":
      return <HeadingBlock data={data} type={type} />;

    case "quote":
      return <QuoteBlock data={data} />;

    case "callout":
      return <CalloutBlock data={data} />;

    case "bulleted_list":
    case "numbered_list":
      return <ListBlock data={data} type={type} />;

    case "bulleted_list_item":
    case "numbered_list_item":
      return <ListItemBlock data={data}>{block.children}</ListItemBlock>;

    case "table":
      return <TableBlock data={data}>{block.children}</TableBlock>;

    case "image":
      return <ImageBlock data={data} />;

    case "equation":
      return <EquationBlock data={data} />;

    case "code":
      return <CodeBlock data={data} />;

    default:
      return (
        <Text as="p" size="2" color="gray" my="5">
          <Cross2Icon className="inline align-sub" /> Unsupported block:{" "}
          <Code>{type}</Code>
        </Text>
      );
  }
};
