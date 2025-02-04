import { ExpenseForm } from "@/components/ExpenseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Expenses = () => {
  const handleExpenseSubmit = (data: {
    description: string;
    value: number;
    isFixed: boolean;
    isCreditCard: boolean;
    taxPercentage: number;
    calculateTax: boolean;
  }) => {
    console.log("Expense submitted:", data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Despesas</h1>
      <Card>
        <CardHeader>
          <CardTitle>Nova Despesa</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm onSubmit={handleExpenseSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Expenses;