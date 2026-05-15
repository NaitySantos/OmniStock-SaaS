
"use client"

import * as React from "react"
import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

const initialInventory = [
  { sku: "GPU-3080-TI", name: "ASUS RTX 3080 Ti", category: "Hardware", qty: 4, min: 5, value: 8500, status: "CRITICAL" },
  { sku: "CPU-I9-12", name: "Intel i9-12900K", category: "Hardware", qty: 12, min: 10, value: 3200, status: "OK" },
  { sku: "SSD-1TB-NVME", name: "Samsung 980 Pro", category: "Storage", qty: 58, min: 20, value: 800, status: "OK" },
  { sku: "MOU-LOGI-MX", name: "Logitech MX Master", category: "Peripherals", qty: 2, min: 15, value: 650, status: "CRITICAL" },
  { sku: "MON-4K-DELL", name: "Dell UltraSharp 27", category: "Monitors", qty: 7, min: 10, value: 4200, status: "WARNING" },
]

export default function InventoryPage() {
  const { toast } = useToast()
  const [isNewItemOpen, setIsNewItemOpen] = useState(false)
  const [inventory, setInventory] = useState(initialInventory)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSaveNewItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newItem = {
      sku: formData.get("sku") as string,
      name: formData.get("name") as string,
      category: formData.get("category") as string || "Hardware",
      qty: Number(formData.get("qty")),
      min: Number(formData.get("min")),
      value: Number(formData.get("price")),
      status: Number(formData.get("qty")) <= Number(formData.get("min")) ? "CRITICAL" : "OK"
    }
    setInventory([newItem, ...inventory])
    setIsNewItemOpen(false)
    toast({ title: "Item Cadastrado", description: `O SKU ${newItem.sku} foi registrado.` })
  }

  const filteredInventory = inventory.filter(item => 
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-headline">Gestão de Estoque</h2>
            <p className="text-muted-foreground">Catálogo completo de SKUs.</p>
          </div>
          <Button onClick={() => setIsNewItemOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Novo Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Card>
             <CardContent className="pt-6">
               <div className="flex items-center gap-4">
                 <AlertTriangle className="h-5 w-5 text-destructive" />
                 <div>
                   <p className="text-xs text-muted-foreground uppercase font-mono-data">Críticos</p>
                   <p className="text-lg font-bold font-headline">{inventory.filter(i => i.status === 'CRITICAL').length}</p>
                 </div>
               </div>
             </CardContent>
           </Card>
           <div className="md:col-span-2">
             <div className="relative w-full">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
               <Input 
                 className="pl-10 h-11 w-full bg-card" 
                 placeholder="Buscar SKU ou descrição..." 
                 value={searchTerm} 
                 onChange={(e) => setSearchTerm(e.target.value)} 
               />
             </div>
           </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow>
                <TableHead className="font-mono-data text-[10px] uppercase">Código SKU</TableHead>
                <TableHead className="font-mono-data text-[10px] uppercase">Descrição do Item</TableHead>
                <TableHead className="font-mono-data text-[10px] uppercase text-right">Qtd</TableHead>
                <TableHead className="font-mono-data text-[10px] uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="font-mono-data text-xs font-semibold">{item.sku}</TableCell>
                  <TableCell className="text-sm font-medium">{item.name}</TableCell>
                  <TableCell className="text-right font-bold">{item.qty}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(item.status === 'OK' ? "text-green-500" : "text-destructive")}>{item.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Dialog open={isNewItemOpen} onOpenChange={setIsNewItemOpen}>
        <DialogContent>
          <form onSubmit={handleSaveNewItem}>
            <DialogHeader>
              <DialogTitle>Novo SKU</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Código SKU</Label>
                <Input name="sku" required />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Input name="name" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Qtd</Label>
                  <Input name="qty" type="number" defaultValue="0" required />
                </div>
                <div className="space-y-2">
                  <Label>Preço</Label>
                  <Input name="price" type="number" required />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar Item</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}
