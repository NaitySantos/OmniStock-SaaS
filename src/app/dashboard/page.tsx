
"use client"

import * as React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  ArrowDownToLine, 
  Activity,
  Zap,
  ArrowLeftRight
} from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const mockData = [
  { name: "Seg", entradas: 400, saídas: 240 },
  { name: "Ter", entradas: 300, saídas: 139 },
  { name: "Qua", entradas: 200, saídas: 980 },
  { name: "Qui", entradas: 278, saídas: 390 },
  { name: "Sex", entradas: 189, saídas: 480 },
  { name: "Sáb", entradas: 239, saídas: 380 },
  { name: "Dom", entradas: 349, saídas: 430 },
]

const recentActivity = [
  { id: 1, type: "entry", item: "Processador Intel i9", unit: "Matriz SP", time: "Há 2 mins", user: "Robô API-01" },
  { id: 2, type: "transfer", item: "SSD 1TB Kingst", unit: "Hub RJ -> PR", time: "Há 15 mins", user: "Carlos M." },
  { id: 3, type: "low_stock", item: "Monitor 4K Dell", unit: "Filial PR", time: "Há 1 hora", user: "Sistema" },
]

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package className="h-16 w-16" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-mono-data text-[10px] uppercase tracking-widest">Total Itens</CardDescription>
            <CardTitle className="text-3xl font-headline font-bold">12.482</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-green-500 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.4% vs mês anterior
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="h-16 w-16 text-accent" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-mono-data text-[10px] uppercase tracking-widest">Entradas Hoje</CardDescription>
            <CardTitle className="text-3xl font-headline font-bold text-accent">542</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-muted-foreground font-medium">
              <Activity className="h-3 w-3 mr-1" />
              Via Webhooks Máquinas
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-mono-data text-[10px] uppercase tracking-widest">Alertas Críticos</CardDescription>
            <CardTitle className="text-3xl font-headline font-bold text-destructive">02</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-muted-foreground font-medium">
              <AlertTriangle className="h-3 w-3 mr-1 text-destructive" />
              Itens abaixo do estoque mínimo
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="h-16 w-16 text-primary" />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="font-mono-data text-[10px] uppercase tracking-widest">Valor em Estoque</CardDescription>
            <CardTitle className="text-3xl font-headline font-bold text-primary">R$ 2.1M</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-xs text-green-500 font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              +R$ 45k essa semana
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="font-headline text-lg font-bold">Fluxo de Movimentação</CardTitle>
              <CardDescription>Entradas vs Saídas por unidade nos últimos 7 dias</CardDescription>
            </div>
            <Badge variant="outline" className="border-primary/50 text-primary">Tempo Real</Badge>
          </CardHeader>
          <CardContent className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="entradas" fill="#2B59FF" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="saídas" fill="#7A3BFF" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-headline text-lg font-bold">Monitor de Audit Engine</CardTitle>
            <CardDescription>Logs de transações imutáveis recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((log) => (
                <div key={log.id} className="flex gap-4 items-start group">
                  <div className={cn(
                    "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary transition-colors group-hover:bg-primary/20",
                    log.type === 'entry' && 'text-green-400',
                    log.type === 'transfer' && 'text-primary',
                    log.type === 'low_stock' && 'text-destructive',
                  )}>
                    {log.type === 'entry' && <ArrowDownToLine className="h-4 w-4" />}
                    {log.type === 'transfer' && <ArrowLeftRight className="h-4 w-4" />}
                    {log.type === 'low_stock' && <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground/90">
                      {log.item}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono-data">
                      <span>{log.unit}</span>
                      <span>•</span>
                      <span>{log.time}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">User: {log.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="font-headline text-lg font-bold">Capacidade das Unidades</CardTitle>
            <CardDescription>Monitoramento de ocupação física por armazém</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
            {[
              { label: "Matriz São Paulo", value: 82, color: "bg-primary" },
              { label: "Filial Curitiba", value: 45, color: "bg-accent" },
              { label: "Hub Rio de Janeiro", value: 18, color: "bg-muted-foreground" },
            ].map((unit) => (
              <div key={unit.label} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{unit.label}</span>
                  <span className="text-xs font-mono-data">{unit.value}%</span>
                </div>
                <Progress value={unit.value} className="h-1.5" indicatorClassName={unit.color} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
