
"use client"

import * as React from "react"
import { useState } from "react"
import { Check, ChevronsUpDown, Building2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

const initialUnits = [
  { id: "u1", name: "Matriz São Paulo", code: "SP-01", type: "Centro de Distribuição" },
  { id: "u2", name: "Filial Curitiba", code: "PR-02", type: "Loja Express" },
  { id: "u3", name: "Hub Logístico Rio", code: "RJ-03", type: "Cross-docking" },
]

export function UnitSwitcher() {
  const { toast } = useToast()
  const [units, setUnits] = useState(initialUnits)
  const [selectedUnit, setSelectedUnit] = useState(initialUnits[0])
  const [isNewUnitOpen, setIsNewUnitOpen] = useState(false)

  const handleAddUnit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const newUnit = {
      id: `u${units.length + 1}`,
      name: formData.get("name") as string,
      code: formData.get("code") as string,
      type: formData.get("type") as string,
    }

    setUnits([...units, newUnit])
    setIsNewUnitOpen(false)
    
    toast({
      title: "Unidade Adicionada",
      description: `A nova filial ${newUnit.name} foi registrada com sucesso.`,
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between border-border/50 bg-secondary/50 hover:bg-secondary h-auto py-2.5 px-3 min-h-[48px]"
          >
            <div className="flex items-center gap-3 text-left min-w-0 flex-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                <Building2 className="h-4 w-4" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
                  {selectedUnit.type}
                </span>
                <span className="font-headline text-sm font-medium truncate">
                  {selectedUnit.name}
                </span>
              </div>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[280px] bg-card border-border" align="start">
          <DropdownMenuLabel className="font-headline text-xs font-medium text-muted-foreground px-3 py-2">
            UNIDADES DE NEGÓCIO
          </DropdownMenuLabel>
          {units.map((unit) => (
            <DropdownMenuItem
              key={unit.id}
              onSelect={() => setSelectedUnit(unit)}
              className="flex items-center justify-between px-3 py-3 cursor-pointer hover:bg-secondary focus:bg-secondary"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-headline text-sm">{unit.name}</span>
                <span className="text-xs font-mono-data text-muted-foreground">{unit.code}</span>
              </div>
              {selectedUnit.id === unit.id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            onSelect={(e) => {
              e.preventDefault()
              setIsNewUnitOpen(true)
            }}
            className="flex items-center gap-2 text-primary font-medium px-3 py-3 cursor-pointer hover:bg-secondary focus:bg-secondary"
          >
            <Plus className="h-4 w-4" />
            Adicionar Nova Unidade
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isNewUnitOpen} onOpenChange={setIsNewUnitOpen}>
        <DialogContent className="sm:max-w-[425px] bg-card border-border">
          <form onSubmit={handleAddUnit}>
            <DialogHeader>
              <DialogTitle className="font-headline">Adicionar Nova Unidade</DialogTitle>
              <DialogDescription>
                Cadastre uma nova filial ou centro de distribuição no sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Unidade</Label>
                <Input id="name" name="name" placeholder="Ex: Filial Belo Horizonte" required className="bg-secondary/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Código (Sigla)</Label>
                  <Input id="code" name="code" placeholder="Ex: MG-04" required className="bg-secondary/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Input id="type" name="type" placeholder="Ex: Loja Express" required className="bg-secondary/50" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsNewUnitOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">Salvar Unidade</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
