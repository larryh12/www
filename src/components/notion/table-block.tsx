import { Table } from "@radix-ui/themes";
import { RichText } from "./rich-text";

export const TableBlock = ({ data, children }) => {
  const { has_column_header, has_row_header } = data;

  return (
    <Table.Root variant="surface" my="5">
      {has_column_header && (
        <Table.Header>
          <Table.Row>
            {children[0].table_row.cells.map((cell, idx) => {
              return (
                <Table.ColumnHeaderCell key={idx}>
                  <RichText data={cell[0]} />
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
      )}
      {
        <Table.Body>
          {children.map((row, idx) => {
            if (idx === 0 && has_column_header) {
              return null;
            } else {
              return (
                <Table.Row key={idx}>
                  {row.table_row.cells.map((cell, idx) => {
                    if (idx === 0 && has_row_header) {
                      return (
                        <Table.RowHeaderCell key={idx}>
                          <RichText data={cell[0]} />
                        </Table.RowHeaderCell>
                      );
                    } else {
                      return (
                        <Table.Cell key={idx}>
                          <RichText data={cell[0]} />
                        </Table.Cell>
                      );
                    }
                  })}
                </Table.Row>
              );
            }
          })}
        </Table.Body>
      }
    </Table.Root>
  );
};
