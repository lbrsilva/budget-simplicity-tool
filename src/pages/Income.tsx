import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const Income = () => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
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

    console.log("Income submitted:", {
      description,
      value: parseFloat(value),
    });

    setDescription("");
    setValue("");

    toast({
      title: "Sucesso",
      description: "Receita registrada com sucesso!",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Receitas</h1>
      <Card>
        <CardHeader>
          <CardTitle>Nova Receita</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full">Registrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Income;