"use client";

import { Callout } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { RichText } from "./rich-text";

export const CalloutBlock = ({ data }) => {
  return (
    <Callout.Root size="2" my="5">
      <Callout.Icon>
        <InfoCircledIcon />
      </Callout.Icon>
      <Callout.Text>
        {data.rich_text.map((text, idx) => (
          <RichText key={idx} data={text} />
        ))}
      </Callout.Text>
    </Callout.Root>
  );
};
