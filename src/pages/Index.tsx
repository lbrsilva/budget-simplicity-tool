import { useState } from "react";
import { FinanceCard } from "@/components/FinanceCard";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Expense {
  id: number;
  description: string;
  value: number;
  isFixed: boolean;
  isCreditCard: boolean;
  taxValue: number;
}

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const handleExpenseSubmit = (data: {
    description: string;
    value: number;
    isFixed: boolean;
    isCreditCard: boolean;
    taxPercentage: number;
    calculateTax: boolean;
  }) => {
    const taxValue = data.calculateTax ? (data.value * data.taxPercentage) / 100 : 0;
    
    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        description: data.description,
        value: data.value,
        isFixed: data.isFixed,
        isCreditCard: data.isCreditCard,
        taxValue,
      },
    ]);
  };

  const totalFixed = expenses
    .filter((e) => e.isFixed)
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalCreditCard = expenses
    .filter((e) => e.isCreditCard)
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalTaxes = expenses
    .reduce((acc, curr) => acc + curr.taxValue, 0);

  const totalExpenses = totalFixed + totalCreditCard + totalTaxes;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Controle Financeiro</h1>
      
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <FinanceCard
          title="Gastos Fixos"
          value={totalFixed}
          isNegative
        />
        <FinanceCard
          title="Cartão de Crédito"
          value={totalCreditCard}
          isNegative
        />
        <FinanceCard
          title="Total em Impostos"
          value={totalTaxes}
          isNegative
        />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Total de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-negative">
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalExpenses)}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">Novo Lançamento</TabsTrigger>
          <TabsTrigger value="list">Lista de Gastos</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>Novo Lançamento</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseForm onSubmit={handleExpenseSubmit} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{expense.description}</h3>
                      <div className="text-sm text-gray-500">
                        {expense.isFixed && "Gasto Fixo • "}
                        {expense.isCreditCard && "Cartão de Crédito • "}
                        {expense.taxValue > 0 && `Imposto: ${new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(expense.taxValue)}`}
                      </div>
                    </div>
                    <div className="text-negative font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(expense.value)}
                    </div>
                  </div>
                ))}
                {expenses.length === 0 && (
                  <div className="text-center text-gray-500">
                    Nenhum gasto registrado
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;