
"use client"

import * as React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Download, Filter, CheckCircle2, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const mockInvoices = [
  {
    id: "NF-2023-001",
    supplier: "Tech Components Ltda",
    date: "2023-11-20",
    amount: 15450.00,
    status: "RECONCILED",
    items: 45
  },
  {
    id: "NF-2023-002",
    supplier: "Global Logistics SA",
    date: "2023-11-21",
    amount: 8200.50,
    status: "PENDING",
    items: 12
  },
  {
    id: "NF-2023-003",
    supplier: "MicroStore Distribution",
    date: "2023-11-19",
    amount: 3500.00,
    status: "ERROR",
    items: 5
  },
  {
    id: "NF-2023-004",
    supplier: "Argo Systems",
    date: "2023-11-22",
    amount: 125000.00,
    status: "PENDING",
    items: 120
  }
]

function FormattedDate({ dateString }: { dateString: string }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>...</>

  return <>{new Date(dateString).toLocaleDateString('pt-BR')}</>
}

export default function InvoicesPage() {
  const { toast } = useToast()

  const handleDownload = (id: string) => {
    toast({
      title: "Download Iniciado",
      description: `Arquivo XML/PDF da nota ${id} sendo gerado.`,
    })
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-headline text-2xl font-bold tracking-tight">Notas Fiscais (Test Data)</h2>
            <p className="text-muted-foreground">Listagem de NFs recebidas para auditoria e reconciliação.</p>
          </div>
          <Button variant="outline" className="border-border">
            <Download className="mr-2 h-4 w-4" /> Exportar Lote
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-xs text-muted-foreground font-mono-data uppercase mb-1">Total Pendente</div>
              <div className="text-2xl font-bold font-headline">R$ 133.200</div>
              <p className="text-[10px] text-amber-500 mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" /> 02 notas aguardando
              </p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-xs text-muted-foreground font-mono-data uppercase mb-1">Processadas (Mês)</div>
              <div className="text-2xl font-bold font-headline">142</div>
              <p className="text-[10px] text-green-500 mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> +12% vs mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 flex items-center h-11">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground z-10" />
            <Input 
              className="pl-10 h-full w-full bg-card border-border focus-visible:ring-primary" 
              placeholder="Buscar por número ou fornecedor..." 
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 shrink-0 border-border bg-card">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="border-border">
                  <TableHead className="font-mono-data text-[10px] uppercase">Número NF</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase">Fornecedor</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase">Data Emissão</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase text-right">Itens</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase text-right">Valor Total</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase">Status</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((nf) => (
                  <TableRow key={nf.id} className="border-border hover:bg-secondary/10 group">
                    <TableCell className="font-mono-data text-xs font-semibold text-primary">{nf.id}</TableCell>
                    <TableCell className="text-sm font-medium">{nf.supplier}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <FormattedDate dateString={nf.date} />
                    </TableCell>
                    <TableCell className="text-right font-mono-data text-xs">{nf.items}</TableCell>
                    <TableCell className="text-right font-headline font-bold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(nf.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn(
                        "text-[10px] font-mono-data",
                        nf.status === 'RECONCILED' && "border-green-500/50 text-green-500 bg-green-500/5",
                        nf.status === 'PENDING' && "border-amber-500/50 text-amber-500 bg-amber-500/5",
                        nf.status === 'ERROR' && "border-destructive/50 text-destructive bg-destructive/5"
                      )}>
                        {nf.status === 'RECONCILED' ? 'CONCLUÍDA' : nf.status === 'PENDING' ? 'PENDENTE' : 'COM ERRO'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => handleDownload(nf.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
