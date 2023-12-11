import { Client } from "@notionhq/client";
import { v4 as uuidv4 } from "uuid";

export const client = new Client({ auth: process.env.NOTION_TOKEN });

export async function getDb(databaseId: string) {
  try {
    const response = await client.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });
    return response.results as any;
  } catch (error) {
    return null;
  }
}

export async function getPage(pageId: string) {
  try {
    const response = await client.pages.retrieve({ page_id: pageId });
    return response as any;
  } catch (error) {
    return null;
  }
}

export async function getBlocks(blockId: string) {
  const { results } = (await client.blocks.children.list({
    block_id: blockId,
  })) as any;

  const extendedBlocks = results.map(async (block) => {
    if (block.has_children) {
      const children = await getBlocks(block.id);
      return { ...block, children };
    }
    return block;
  });

  return (await Promise.all(extendedBlocks).then((blocks) => {
    return blocks.reduce((acc, curr) => {
      if (curr.type === "bulleted_list_item") {
        if (acc[acc.length - 1]?.type === "bulleted_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: uuidv4(),
            type: "bulleted_list",
            bulleted_list: { children: [curr] },
          });
        }
      } else if (curr.type === "numbered_list_item") {
        if (acc[acc.length - 1]?.type === "numbered_list") {
          acc[acc.length - 1][acc[acc.length - 1].type].children?.push(curr);
        } else {
          acc.push({
            id: uuidv4(),
            type: "numbered_list",
            numbered_list: { children: [curr] },
          });
        }
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  })) as any;
}
