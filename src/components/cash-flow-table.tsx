import { formatCurrency } from '@/utils/formatCurrency';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type CashFlowProps = {
  data: {
    investment: {
      2024: number;
      2025: number;
    };
    operations: {
      2024: number;
      2025: number;
    };
  };
};

export const CashFlow = ({ data }: CashFlowProps): React.ReactNode => {
  if (!data) return null;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Flow</TableHead>
          <TableHead>2024</TableHead>
          <TableHead>2025</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Investiment</TableCell>
          <TableCell>{formatCurrency(data.investment['2024'])}</TableCell>
          <TableCell>{formatCurrency(data.investment['2025'])}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Operations</TableCell>
          <TableCell>{formatCurrency(data.operations['2024'])}</TableCell>
          <TableCell>{formatCurrency(data.operations['2025'])}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
