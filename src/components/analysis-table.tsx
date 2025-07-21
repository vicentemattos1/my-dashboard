import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercentage } from '@/utils/formatPercentage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type AnalysisTableProps = {
  data: {
    value: string;
    name: string;
    percentage: string;
  }[];
};

export const AnalysisTable = ({
  data,
}: AnalysisTableProps): React.ReactNode => {
  if (!data) return null;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="text-right">Percentage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={`${item.name}-${index}`}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{formatCurrency(parseFloat(item.value))}</TableCell>
            <TableCell className="text-right">
              {formatPercentage(parseFloat(item.percentage))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
