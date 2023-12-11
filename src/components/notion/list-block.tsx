import { Text } from "@radix-ui/themes";
import { render } from "./renderer";

export const ListBlock = ({ data, type }) => {
  let result = data.children.map((child) => render(child));

  switch (type) {
    case "bulleted_list":
      return (
        //@ts-ignore
        <Text as="ul" my="3" className="pl-5 list-disc list-outside">
          {result}
        </Text>
      );

    case "numbered_list":
      return (
        //@ts-ignore
        <Text as="ol" my="3" className="pl-5 list-decimal list-outside">
          {result}
        </Text>
      );
  }
};
