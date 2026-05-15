
"use client"

import * as React from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Webhook, Key, RefreshCw, Copy, Terminal, ExternalLink, Zap } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function WebhooksPage() {
  const [apiKey, setApiKey] = React.useState("os_live_7x9Bv2kM1pL8qR5wN4t0Y3zX")
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado",
      description: "Conteúdo copiado para a área de transferência.",
    })
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <div className="space-y-1">
          <h2 className="font-headline text-2xl font-bold tracking-tight">Webhooks & Integração de Máquinas</h2>
          <p className="text-muted-foreground">Gerencie chaves de API e webhooks para entrada automatizada de dados externos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary" />
                  Chave de API do Sistema
                </CardTitle>
                <CardDescription>Esta chave permite que máquinas externas autentiquem movimentações via REST API.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-secondary/50 font-mono-data text-xs p-3 rounded-lg border border-border flex items-center justify-between">
                    <span>{apiKey}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-primary" onClick={() => copyToClipboard(apiKey)}>
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button variant="outline" className="border-border">
                    <RefreshCw className="h-4 w-4 mr-2" /> Rotacionar
                  </Button>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg flex gap-3">
                  <Terminal className="h-5 w-5 text-blue-500 shrink-0" />
                  <p className="text-xs text-blue-400 leading-relaxed">
                    <strong>Endpoint:</strong> POST <code className="bg-blue-500/20 px-1 rounded">https://api.omnistock.io/v2/inventory/update</code>
                    <br />
                    Envie snapshots JSON para automação imutável sem intervenção humana.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <Webhook className="h-5 w-5 text-accent" />
                    Webhooks de Notificação
                  </CardTitle>
                  <CardDescription>Envie eventos de baixo estoque para URIs externas (ERP, Slack, etc).</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-border text-xs h-8">Adicionar Webhook</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[
                  { name: "Integração ERP SAP", url: "https://sap.corporate.com/hooks/omni", status: "ACTIVE" },
                  { name: "Alerta Slack Warehouse", url: "https://hooks.slack.com/services/T000/B000", status: "DISABLED" },
                 ].map((hook) => (
                  <div key={hook.name} className="flex items-center justify-between p-4 rounded-xl border border-border bg-secondary/20">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{hook.name}</span>
                      <span className="text-xs text-muted-foreground font-mono-data truncate max-w-[300px]">{hook.url}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className={cn(
                        "text-[10px] font-mono-data",
                        hook.status === "ACTIVE" ? "border-green-500/50 text-green-500" : "border-border text-muted-foreground"
                      )}>{hook.status}</Badge>
                      <Switch checked={hook.status === "ACTIVE"} />
                    </div>
                  </div>
                 ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
             <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-sm font-headline flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  Estatísticas de Integração
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-1">
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-muted-foreground">Requisições/Min</span>
                     <span className="font-mono-data font-bold">142</span>
                   </div>
                   <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[65%]" />
                   </div>
                 </div>
                 <div className="space-y-1">
                   <div className="flex justify-between text-xs mb-1">
                     <span className="text-muted-foreground">Uptime de Webhooks</span>
                     <span className="font-mono-data font-bold">99.98%</span>
                   </div>
                   <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                     <div className="h-full bg-accent w-[99%]" />
                   </div>
                 </div>
              </CardContent>
            </Card>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="font-headline font-semibold text-sm">Documentação</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Consulte nossa documentação técnica para saber como conectar balanças inteligentes e sensores de IoT ao OmniStock.
              </p>
              <Button variant="secondary" className="w-full text-xs h-9">
                <ExternalLink className="h-3 w-3 mr-2" /> Docs Developer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
