import { Heading } from "@radix-ui/themes";
import { RichText } from "./rich-text";

export const HeadingBlock = ({ data, type }) => {
  let result = data.rich_text.map((text, idx) => (
    <RichText key={idx} data={text} />
  ));

  switch (type) {
    case "heading_1":
      return (
        <Heading as="h2" size="6" weight="medium" mb="5" mt="7">
          {result}
        </Heading>
      );

    case "heading_2":
      return (
        <Heading as="h3" size="5" weight="medium" mb="5" mt="6">
          {result}
        </Heading>
      );

    case "heading_3":
      return (
        <Heading as="h4" size="4" weight="medium" mb="5" mt="5">
          {result}
        </Heading>
      );
  }
};
