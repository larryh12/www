import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";
import { Box } from "@radix-ui/themes";

export const EquationBlock = ({ data }) => {
  return (
    <Box my="5" className="overflow-auto">
      <BlockMath math={data.expression} />
    </Box>
  );
};
