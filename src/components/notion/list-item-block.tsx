import { Text } from "@radix-ui/themes";
import { RichText } from "./rich-text";
import { render } from "./renderer";

export const ListItemBlock = ({ data, children }) => {
  return (
    //@ts-ignore
    <Text as="li" my="2">
      {data.rich_text.map((text, idx) => (
        <RichText key={idx} data={text} />
      ))}
      {!!children && children.map((child) => render(child))}
    </Text>
  );
};
