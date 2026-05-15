
"use client"

import * as React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, ShieldCheck, Download } from "lucide-react"

const auditLogs = [
  { 
    id: "tx-8942-A", 
    timestamp: "2023-11-20T14:23:45Z", 
    action: "CORRECTION_AI", 
    entity: "SKU-9923", 
    user: "Admin (via PIN)", 
    unit: "SP-01",
  },
  { 
    id: "tx-8941-B", 
    timestamp: "2023-11-20T14:10:12Z", 
    action: "WEBHOOK_ENTRY", 
    entity: "SKU-1120", 
    user: "System (Machine-01)", 
    unit: "RJ-03",
  },
  { 
    id: "tx-8940-C", 
    timestamp: "2023-11-20T13:45:00Z", 
    action: "TRANSFER_START", 
    entity: "SKU-4402", 
    user: "Carlos M.", 
    unit: "RJ -> PR",
  },
]

function FormattedDate({ dateString }: { dateString: string }) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <>...</>

  return <>{new Date(dateString).toLocaleString('pt-BR')}</>
}

export default function AuditPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="font-headline text-2xl font-bold tracking-tight">Motor de Auditoria Imutável</h2>
            <p className="text-muted-foreground">Log detalhado de todas as transações verificadas.</p>
          </div>
          <Button variant="outline" className="border-border">
            <Download className="mr-2 h-4 w-4" /> Exportar para CSV/PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-mono-data">Integridade</span>
                <ShieldCheck className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold font-headline">100% Verificado</div>
              <p className="text-[10px] text-muted-foreground mt-1">Hash SHA-256 Validado</p>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground font-mono-data">Eventos Hoje</span>
                <History className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold font-headline">1.452</div>
              <p className="text-[10px] text-muted-foreground mt-1">+12% vs Ontem</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-card border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-secondary/30">
                <TableRow className="border-border">
                  <TableHead className="font-mono-data text-[10px] uppercase">ID Transação</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase">Timestamp</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase">Ação / Evento</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase">Entidade</TableHead>
                  <TableHead className="font-mono-data text-[10px] uppercase">Agente / Unidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id} className="border-border hover:bg-secondary/10 group">
                    <TableCell className="font-mono-data text-xs text-primary font-medium">{log.id}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <FormattedDate dateString={log.timestamp} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-border bg-secondary/50 text-[10px] font-mono-data">
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-semibold">{log.entity}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs">{log.user}</span>
                        <span className="text-[10px] text-muted-foreground font-mono-data uppercase">{log.unit}</span>
                      </div>
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
