import { ExpenseForm } from "@/components/ExpenseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreditCard = () => {
  const handleExpenseSubmit = (data: {
    description: string;
    value: number;
    isFixed: boolean;
    isCreditCard: boolean;
    taxPercentage: number;
    calculateTax: boolean;
  }) => {
    console.log("Credit card expense submitted:", data);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cartão de Crédito</h1>
      <Card>
        <CardHeader>
          <CardTitle>Nova Despesa de Cartão</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm onSubmit={handleExpenseSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditCard;