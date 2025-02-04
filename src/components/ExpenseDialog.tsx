import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import type { Expense } from "@/pages/Expenses";

interface ExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense?: Expense | null;
  onSubmit: (data: Omit<Expense, "id">) => void;
}

const categories = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Educação",
  "Lazer",
  "Outros",
];

export function ExpenseDialog({ open, onOpenChange, expense, onSubmit }: ExpenseDialogProps) {
  const [description, setDescription] = useState(expense?.description ?? "");
  const [isFixed, setIsFixed] = useState(expense?.isFixed ?? false);
  const [category, setCategory] = useState(expense?.category ?? categories[0]);
  const [dueDate, setDueDate] = useState(expense?.dueDate ?? "");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description) {
      toast({
        title: "Erro",
        description: "Preencha a descrição",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      description,
      isFixed,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      value: 0,
      isCreditCard: false,
      taxPercentage: 0,
      calculateTax: false,
    });

    setDescription("");
    setIsFixed(false);
    setCategory(categories[0]);
    setDueDate("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {expense ? "Editar Despesa" : "Nova Despesa"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              maxLength={100}
              placeholder="Digite a descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <select
              id="category"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Vencimento (Opcional)</Label>
            <div className="relative">
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="fixed"
              checked={isFixed}
              onCheckedChange={setIsFixed}
            />
            <Label htmlFor="fixed">Gasto Fixo</Label>
          </div>

          <Button type="submit" className="w-full">
            {expense ? "Salvar" : "Adicionar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}