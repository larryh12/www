/* eslint-disable @next/next/no-img-element */
import { Box, Text } from "@radix-ui/themes";

export const ImageBlock = ({ data }) => {
  const src = data.type === "external" ? data.external.url : data.file.url;
  const caption = data.caption ? data.caption[0]?.plain_text : "";

  return (
    <Box mx="auto" my="5" className="min-w-[50%] w-fit">
      <img src={src} alt={caption} loading="lazy" className="w-full" />
      {caption && (
        //@ts-ignore
        <Text as="figcaption" size="2" mt="2" color="gray" align="center">
          {caption}
        </Text>
      )}
    </Box>
  );
};
