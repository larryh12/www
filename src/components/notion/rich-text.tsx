import NextLink from "next/link";
import { Text, Link, Strong, Em, Code } from "@radix-ui/themes";
import { Cross2Icon } from "@radix-ui/react-icons";

export const RichText = ({ data }) => {
  if (!data.text) {
    return (
      <Text size="2" color="gray" mx="2">
        <Cross2Icon className="inline align-sub" /> Unsupported type:{" "}
        <Code>{data.type}</Code>
      </Text>
    );
  }

  let result = data.text.content;

  if (data.href) {
    result = (
      <Link asChild underline="always">
        <NextLink href={data.href} target="_blank">
          {result}
        </NextLink>
      </Link>
    );
  }

  if (data.annotations.italic) {
    result = <Em>{result}</Em>;
  }

  if (data.annotations.bold) {
    result = <Strong>{result}</Strong>;
  }

  if (data.annotations.strikethrough) {
    result = <Text className="line-through">{result}</Text>;
  }

  if (data.annotations.underline) {
    result = <Text className="underline underline-offset-4">{result}</Text>;
  }

  if (data.annotations.color !== "default") {
    result = <Text color={data.annotations.color}>{result}</Text>;
  }

  if (data.annotations.code) {
    result = <Code>{result}</Code>;
  }

  return result;
};
