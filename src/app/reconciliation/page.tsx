
"use client"

import * as React from "react"
import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { resolveInvoiceDiscrepancies, type Discrepancy } from "@/ai/flows/invoice-discrepancy-resolution-flow"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Loader2, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { PinAuth } from "@/components/auth/pin-auth"

export default function ReconciliationPage() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Discrepancy[]>([])
  const [isPinOpen, setIsPinOpen] = useState(false)
  const [selectedDiscrepancy, setSelectedDiscrepancy] = useState<Discrepancy | null>(null)

  const handleRunReconciliation = async () => {
    setLoading(true)
    try {
      // Mocking input data for the demo
      const mockInput = {
        invoiceItems: [
          { sku: "CPU-I9-12", description: "Processador Intel Core i9-12900K", invoiceQuantity: 10, unitPrice: 3200 },
          { sku: "RAM-16-DDR5", description: "Memória Kingston Fury 16GB DDR5", invoiceQuantity: 50, unitPrice: 450 },
          { sku: "SSD-1TB-NVME", description: "Samsung 980 Pro 1TB NVMe", invoiceQuantity: 25, unitPrice: 800 },
          { sku: "GPU-3080-TI", description: "ASUS ROG Strix RTX 3080 Ti", invoiceQuantity: 5, unitPrice: 8500 },
        ],
        physicalInventoryItems: [
          { sku: "CPU-I9-12", description: "Processador Intel Core i9-12900K", physicalQuantity: 8 }, // Difference: 2 missing
          { sku: "RAM-16-DDR5", description: "Memória Kingston Fury 16GB DDR5", physicalQuantity: 50 }, // OK
          { sku: "SSD-1TB-NVME", description: "Samsung 980 Pro 1TB NVMe", physicalQuantity: 28 }, // Difference: 3 extra
          { sku: "GPU-3080-TI", description: "ASUS ROG Strix RTX 3080 Ti", physicalQuantity: 5 }, // OK
          { sku: "MOU-LOGI-MX", description: "Mouse Logitech MX Master 3S", physicalQuantity: 10 }, // SKU only in physical
        ]
      }
      const output = await resolveInvoiceDiscrepancies(mockInput)
      setResults(output)
      toast({
        title: "Reconciliação Concluída",
        description: `Encontradas ${output.length} discrepâncias no lote selecionado.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na Reconciliação",
        description: "Não foi possível processar a reconciliação inteligente via IA.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResolveAction = (discrepancy: Discrepancy) => {
    setSelectedDiscrepancy(discrepancy)
    setIsPinOpen(true)
  }

  const handlePinSuccess = () => {
    toast({
      title: "Ação Autorizada",
      description: "As correções de inventário foram aplicadas ao Motor de Auditoria.",
    })
    // Remove from local list after "fixing"
    setResults(prev => prev.filter(d => d.sku !== selectedDiscrepancy?.sku))
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-headline text-2xl font-bold tracking-tight">Reconciliação Inteligente de NF</h2>
            <p className="text-muted-foreground">Utilize nossa IA para detectar falhas entre notas fiscais e contagem física.</p>
          </div>
          <Button 
            onClick={handleRunReconciliation} 
            disabled={loading}
            className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(43,89,255,0.3)]"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Executar Análise de Lote
          </Button>
        </div>

        {!results.length && !loading ? (
          <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-xl bg-card/20">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-headline font-semibold mb-2">Aguardando Dados</h3>
            <p className="text-muted-foreground max-w-sm text-center">Inicie uma nova análise de reconciliação para carregar os dados de movimentação mais recentes.</p>
          </div>
        ) : loading ? (
           <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-primary/20 rounded-xl bg-primary/5">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />
            <h3 className="text-xl font-headline font-semibold mb-2 animate-pulse">Inteligência OmniStock em Ação...</h3>
            <p className="text-muted-foreground text-center">Comparando SKUs, calculando derivativos e sugerindo caminhos de correção.</p>
          </div>
        ) : (
          <Card className="bg-card border-border overflow-hidden">
            <CardHeader className="bg-secondary/30 border-b border-border py-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-headline flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Discrepâncias Detectadas
                </CardTitle>
                <Badge className="bg-destructive/20 text-destructive border-destructive/20">{results.length} Itens com Erro</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-secondary/20">
                  <TableRow className="border-border">
                    <TableHead className="font-mono-data text-[10px] uppercase">SKU / Item</TableHead>
                    <TableHead className="font-mono-data text-[10px] uppercase text-right">Nota Fiscal</TableHead>
                    <TableHead className="font-mono-data text-[10px] uppercase text-right">Físico</TableHead>
                    <TableHead className="font-mono-data text-[10px] uppercase text-right">Diferença</TableHead>
                    <TableHead className="font-mono-data text-[10px] uppercase">Ação Sugerida pela IA</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((item) => (
                    <TableRow key={item.sku} className="border-border hover:bg-secondary/10 group">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-mono-data text-xs font-semibold">{item.sku}</span>
                          <span className="text-xs text-muted-foreground">{item.description}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">{item.invoiceQuantity}</TableCell>
                      <TableCell className="text-right font-medium">{item.physicalQuantity}</TableCell>
                      <TableCell className="text-right font-bold">
                        <span className={item.difference > 0 ? "text-destructive" : "text-amber-500"}>
                          {item.difference > 0 ? `+${item.difference}` : item.difference}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-2 max-w-md">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-xs leading-relaxed italic text-muted-foreground">{item.suggestedAction}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-primary hover:bg-primary/10"
                          onClick={() => handleResolveAction(item)}
                        >
                          Aplicar Ajuste
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <PinAuth 
        isOpen={isPinOpen} 
        onClose={() => setIsPinOpen(false)} 
        onSuccess={handlePinSuccess}
        title="Autorizar Ajuste de Inventário"
      />
    </AppShell>
  )
}
