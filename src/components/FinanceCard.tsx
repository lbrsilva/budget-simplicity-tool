import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FinanceCardProps {
  title: string;
  value: number;
  className?: string;
  isNegative?: boolean;
}

export function FinanceCard({ title, value, className, isNegative }: FinanceCardProps) {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);

  return (
    <Card className={cn("w-full transition-all hover:shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold",
          isNegative ? "text-negative" : "text-positive"
        )}>
          {formattedValue}
        </div>
      </CardContent>
    </Card>
  );
}