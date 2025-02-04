import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";

interface ExpenseFormProps {
  onSubmit: (data: {
    description: string;
    value: number;
    isFixed: boolean;
    isCreditCard: boolean;
    taxPercentage: number;
    calculateTax: boolean;
  }) => void;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [isFixed, setIsFixed] = useState(false);
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [calculateTax, setCalculateTax] = useState(false);
  const [taxPercentage, setTaxPercentage] = useState("0");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !value) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      description,
      value: parseFloat(value),
      isFixed,
      isCreditCard,
      taxPercentage: parseFloat(taxPercentage),
      calculateTax,
    });

    setDescription("");
    setValue("");
    setIsFixed(false);
    setIsCreditCard(false);
    setCalculateTax(false);
    setTaxPercentage("0");

    toast({
      title: "Sucesso",
      description: "Lançamento registrado com sucesso!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            placeholder="Digite a descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="value">Valor</Label>
          <Input
            id="value"
            type="number"
            step="0.01"
            placeholder="0,00"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="fixed"
              checked={isFixed}
              onCheckedChange={setIsFixed}
            />
            <Label htmlFor="fixed">Gasto Fixo</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="creditCard"
              checked={isCreditCard}
              onCheckedChange={setIsCreditCard}
            />
            <Label htmlFor="creditCard">Cartão de Crédito</Label>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="tax"
            checked={calculateTax}
            onCheckedChange={setCalculateTax}
          />
          <Label htmlFor="tax">Calcular Imposto</Label>
        </div>
        {calculateTax && (
          <div className="space-y-2">
            <Label htmlFor="taxPercentage">Porcentagem do Imposto (%)</Label>
            <Input
              id="taxPercentage"
              type="number"
              step="0.1"
              placeholder="0"
              value={taxPercentage}
              onChange={(e) => setTaxPercentage(e.target.value)}
            />
          </div>
        )}
      </div>
      <Button type="submit" className="w-full">Registrar</Button>
    </form>
  );
}