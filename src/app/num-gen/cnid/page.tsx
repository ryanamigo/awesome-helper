'use client'
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSettingOptions } from "@/contexts/setting";
import { generateIDCard } from "@/lib/cnid-generator";
import { useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import { useClipboard } from "@/hooks/use-clipboard";

type CnidInfo = {
  cnid: string;
  gender: string;
  regionName: string;
}



export default function Page() {
  const [setting] = useSettingOptions();
  const [results, setResults] = useState<Array<CnidInfo>>([]);
  const { copy } = useClipboard()
  const columns: ColumnDef<CnidInfo>[] = [
    {
      accessorKey: "cnid",
      header: "身份证",
    },
    {
      accessorKey: "gender",
      header: "性别",
    },
    {
      accessorKey: "regionName",
      header: "区域",
    },
    {
      id: "actions",
      header: "操作",
      cell: ({row}) => {
        return (
          <Button onClick={() => copy(row.original.cnid)}>复制</Button>
        )
      }
    }
  ];
  const table = useReactTable({
    data: results,
    columns,
    getCoreRowModel: getCoreRowModel(),
    
  })
  const handleClick = () => {
    const count = setting?.cnidGenCount;
    if (!count) {
      return
    }
    const res: Array<CnidInfo> = []
    for (let i = 0; i < count; i++) {
      const { cnid, gender, regionName} = generateIDCard()
      res.push({
        cnid,
        gender: gender === "M" ? "男" : "女",
        regionName,
      })
    }
    setResults(res);
  }
  return (
    <div>
      <Button onClick={handleClick}>生成</Button>
      <div className="rounded-md border mt-4">
        <Table>
          <TableHeader>
            {
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {
                    headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {
                          header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())
                        }
                      </TableHead>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableHeader>
          <TableBody>
            {
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {
                    row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}