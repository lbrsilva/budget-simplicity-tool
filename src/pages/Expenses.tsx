import { Plus } from "lucide-react";
import { useState } from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpenseDialog } from "@/components/ExpenseDialog";
import { ExpenseList } from "@/components/ExpenseList";

export interface Expense {
  id: string;
  description: string;
  value: number;
  isFixed: boolean;
  isCreditCard: boolean;
  taxPercentage: number;
  calculateTax: boolean;
  icon?: string;
  category?: string;
  dueDate?: Date;
}

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleExpenseSubmit = (data: Omit<Expense, "id">) => {
    if (editingExpense) {
      setExpenses(expenses.map(expense => 
        expense.id === editingExpense.id 
          ? { ...data, id: editingExpense.id }
          : expense
      ));
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, { ...data, id: crypto.randomUUID() }]);
    }
    setIsDialogOpen(false);
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Despesas</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2" />
          Adicionar
        </Button>
      </div>

      <ExpenseList 
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ExpenseDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        expense={editingExpense}
        onSubmit={handleExpenseSubmit}
      />
    </div>
  );
};

export default Expenses;