
"use client"

import * as React from "react"
import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeftRight, 
  Truck, 
  ChevronRight, 
  PackageCheck,
  Plus,
  SendHorizontal,
  PackageSearch,
  UserCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

const initialTransfers = [
  {
    id: "TRF-9012",
    origin: "Matriz São Paulo",
    dest: "Filial Curitiba",
    items: 45,
    status: "IN_TRANSIT",
    eta: "Há 4h 20min",
    driver: "Paulo Silva",
    lastEvent: "Coleta Realizada"
  },
  {
    id: "TRF-9011",
    origin: "Hub Logístico Rio",
    dest: "Matriz São Paulo",
    items: 12,
    status: "PENDING_PICKUP",
    eta: "Agendado (16h)",
    driver: "Aguardando",
    lastEvent: "Transferência Aprovada"
  },
  {
    id: "TRF-9008",
    origin: "Filial Curitiba",
    dest: "Hub Logístico Rio",
    items: 5,
    status: "DELIVERED",
    eta: "Concluído",
    driver: "Carlos Roberto",
    lastEvent: "Confirmação Dupla OK"
  }
]

const availableStock = [
  { sku: "GPU-3080-TI", name: "ASUS RTX 3080 Ti", qty: 4 },
  { sku: "CPU-I9-12", name: "Intel i9-12900K", qty: 12 },
  { sku: "SSD-1TB-NVME", name: "Samsung 980 Pro", qty: 58 },
  { sku: "MOU-LOGI-MX", name: "Logitech MX Master", qty: 2 },
  { sku: "MON-4K-DELL", name: "Dell UltraSharp 27", qty: 7 },
  { sku: "RAM-16-DDR5", name: "Kingston Fury 16GB", qty: 45 },
]

export function TransfersPage() {
  const { toast } = useToast()
  const [isNewTransferOpen, setIsNewTransferOpen] = useState(false)
  const [transfers, setTransfers] = useState(initialTransfers)

  const handleCreateTransfer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const originVal = formData.get("origin") as string
    const destVal = formData.get("dest") as string
    
    const unitMap: Record<string, string> = {
      "sp": "Matriz São Paulo",
      "rj": "Hub Rio de Janeiro",
      "pr": "Filial Curitiba"
    }

    const newTransfer = {
      id: `TRF-${Math.floor(1000 + Math.random() * 9000)}`,
      origin: unitMap[originVal] || originVal,
      dest: unitMap[destVal] || destVal,
      items: 0, // In a real app we'd parse the summary, but for demo:
      status: "PENDING_PICKUP",
      eta: "Agendando Coleta",
      driver: formData.get("driver") as string || "Aguardando",
      lastEvent: "Guia Gerada"
    }

    setTransfers([newTransfer, ...transfers])
    setIsNewTransferOpen(false)
    
    toast({
      title: "Transferência Iniciada",
      description: `A guia ${newTransfer.id} foi gerada e enviada ao motorista.`,
    })
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-headline text-2xl font-bold tracking-tight">Fluxo Logístico entre Unidades</h2>
            <p className="text-muted-foreground">Rastreamento e aprovação de transferências de estoque em tempo real.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsNewTransferOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nova Transferência
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {transfers.map((trf) => (
            <Card key={trf.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6 flex-1 w-full">
                    <div className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                      trf.status === "DELIVERED" ? "bg-green-500/10 text-green-500" :
                      trf.status === "IN_TRANSIT" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {trf.status === "DELIVERED" ? <PackageCheck className="h-6 w-6" /> : <Truck className="h-6 w-6" />}
                    </div>
                    
                    <div className="flex-1 flex flex-col md:flex-row items-center gap-4 md:gap-12">
                      <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="text-[10px] font-mono-data text-muted-foreground uppercase">Origem</span>
                        <span className="font-headline text-sm font-semibold">{trf.origin}</span>
                      </div>
                      
                      <div className="hidden md:flex flex-1 items-center justify-center relative px-8">
                        <div className="h-px w-full bg-border relative">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2">
                             <ArrowLeftRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <span className="text-[10px] font-mono-data text-muted-foreground uppercase">Destino</span>
                        <span className="font-headline text-sm font-semibold">{trf.dest}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-border pt-4 md:pt-0">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono-data text-muted-foreground uppercase">Itens / Status</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="font-mono-data border-border">{trf.items} Unidades</Badge>
                        <Badge className={cn(
                          "text-[10px] border-none uppercase tracking-tighter",
                          trf.status === "DELIVERED" ? "bg-green-500/20 text-green-500" :
                          trf.status === "IN_TRANSIT" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                        )}>
                          {trf.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] font-mono-data text-muted-foreground uppercase">ETA / Driver</span>
                        <span className="text-xs font-medium">{trf.eta}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={isNewTransferOpen} onOpenChange={setIsNewTransferOpen}>
        <DialogContent className="sm:max-w-[600px] bg-card border-border">
          <form onSubmit={handleCreateTransfer}>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 font-headline">
                <SendHorizontal className="h-5 w-5 text-primary" />
                Nova Transferência Logística
              </DialogTitle>
              <DialogDescription>
                Confirme as unidades e selecione os itens do estoque atual.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Unidade Origem</Label>
                  <Select name="origin" defaultValue="sp">
                    <SelectTrigger id="origin" className="bg-secondary/50">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="sp">Matriz São Paulo</SelectItem>
                      <SelectItem value="rj">Hub Rio de Janeiro</SelectItem>
                      <SelectItem value="pr">Filial Curitiba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dest">Unidade Destino</Label>
                  <Select name="dest" defaultValue="pr">
                    <SelectTrigger id="dest" className="bg-secondary/50">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="sp">Matriz São Paulo</SelectItem>
                      <SelectItem value="rj">Hub Rio de Janeiro</SelectItem>
                      <SelectItem value="pr">Filial Curitiba</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <PackageSearch className="h-4 w-4" />
                  Disponibilidade de Estoque (Referência)
                </div>
                <ScrollArea className="h-[120px] w-full rounded-md border border-border bg-secondary/20 p-2">
                  <div className="space-y-2">
                    {availableStock.map((item) => (
                      <div key={item.sku} className="flex items-center justify-between text-xs p-2 rounded hover:bg-secondary/40 transition-colors">
                        <div className="flex flex-col">
                          <span className="font-mono-data font-bold text-primary">{item.sku}</span>
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                        <Badge variant="secondary" className="font-mono-data text-[10px]">{item.qty} un</Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <Label htmlFor="items-summary">Lista de Produtos e Qtds para Envio</Label>
                <Input name="items-summary" id="items-summary" placeholder="Ex: GPU-3080-TI (2), CPU-I9-12 (5)" className="bg-secondary/50" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="driver" className="flex items-center gap-2">
                  Responsável
                  <Badge variant="outline" className="text-[9px] border-primary/30 text-primary">Preenchido Automaticamente</Badge>
                </Label>
                <div className="relative">
                  <Input 
                    name="driver"
                    id="driver" 
                    defaultValue="Carlos Silva (Coordenador Logístico)" 
                    className="bg-secondary/30 pr-10 border-dashed" 
                    readOnly 
                  />
                  <UserCheck className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsNewTransferOpen(false)}>Cancelar</Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(43,89,255,0.3)]">
                Confirmar Envio
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}

export default TransfersPage;
