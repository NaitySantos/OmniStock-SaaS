"use client"

import * as React from "react"
import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import imagesData from "@/app/lib/placeholder-images.json"

interface StoreItem {
  sku: string
  name: string
  category: string
  price: number
  stock: number
  imageId: string
}

const getImageUrl = (id: string) => imagesData.placeholderImages.find(img => img.id === id)?.imageUrl || ""
const getImageHint = (id: string) => imagesData.placeholderImages.find(img => img.id === id)?.imageHint || ""

const initialProducts: StoreItem[] = [
  { sku: "GPU-3080-TI", name: "ASUS RTX 3080 Ti", category: "Hardware", price: 8500, stock: 4, imageId: "gpu-3080" },
  { sku: "CPU-I9-12", name: "Intel i9-12900K", category: "Hardware", price: 3200, stock: 12, imageId: "cpu-i9" },
  { sku: "SSD-1TB-NVME", name: "Samsung 980 Pro", category: "Storage", price: 800, stock: 58, imageId: "ssd-nvme" },
  { sku: "MOU-LOGI-MX", name: "Logitech MX Master", category: "Peripherals", price: 650, stock: 2, imageId: "mouse-mx" },
  { sku: "MON-4K-DELL", name: "Dell UltraSharp 27", category: "Monitors", price: 4200, stock: 7, imageId: "monitor-4k" },
  { sku: "RAM-16-DDR5", name: "Kingston Fury 16GB", category: "Hardware", price: 450, stock: 45, imageId: "ram-ddr5" },
]

interface CartItem extends StoreItem {
  quantity: number
}

export default function StorePage() {
  const { toast } = useToast()
  const [products, setProducts] = useState<StoreItem[]>(initialProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const addToCart = (product: StoreItem) => {
    const existing = cart.find(item => item.sku === product.sku)
    if (existing) {
      if (existing.quantity >= product.stock) {
        toast({ variant: "destructive", title: "Limite de Estoque", description: "Estoque insuficiente." })
        return
      }
      setCart(cart.map(item => item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (sku: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.sku === sku) {
        const newQty = item.quantity + delta
        const product = products.find(p => p.sku === sku)
        if (product && newQty > product.stock) return item
        return newQty > 0 ? { ...item, quantity: newQty } : item
      }
      return item
    }))
  }

  const handleFinishPurchase = () => {
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(c => c.sku === p.sku)
      return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p
    }))
    setCart([])
    setIsCheckoutOpen(false)
    toast({ title: "Pedido Finalizado!", description: "O estoque foi atualizado com sucesso." })
  }

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <AppShell>
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.sku} className="overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all">
                <div className="relative h-48 w-full shrink-0 bg-secondary/20">
                  <Image 
                    src={getImageUrl(product.imageId)} 
                    alt={product.name} 
                    fill 
                    className="object-cover" 
                    data-ai-hint={product.imageHint} 
                  />
                </div>
                <CardHeader className="p-4 flex-1">
                  <CardTitle className="text-base font-headline line-clamp-2 min-h-[3rem]">{product.name}</CardTitle>
                  <CardDescription className="font-mono-data text-[10px] mt-1">SKU: {product.sku}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-primary text-xl">R$ {product.price}</span>
                    <Badge variant="secondary" className={cn("text-[10px]", product.stock === 0 ? "text-destructive" : "text-green-500")}>
                      Estoque: {product.stock}
                    </Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 border-t bg-secondary/10 mt-auto">
                  <Button className="w-full" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                    {product.stock === 0 ? "Indisponível" : "Adicionar"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <aside className="w-full xl:w-96 shrink-0">
          <Card className="sticky top-24 border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader className="bg-secondary/20 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" /> Carrinho de Requisição
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px] p-4">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-50 space-y-2 py-20">
                    <ShoppingCart className="h-12 w-12" />
                    <p className="text-sm">Nenhum item adicionado</p>
                  </div>
                ) : 
                  cart.map(item => (
                    <div key={item.sku} className="flex justify-between items-center mb-4 border-b border-border/50 pb-3 last:border-0">
                      <div className="flex flex-col min-w-0 flex-1 mr-4">
                        <span className="text-sm font-bold truncate">{item.name}</span>
                        <span className="text-xs text-primary font-semibold">R$ {item.price * item.quantity}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 bg-secondary/30 rounded-lg p-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" onClick={() => updateQuantity(item.sku, -1)}><Minus className="h-3 w-3" /></Button>
                        <span className="text-xs font-mono-data w-5 text-center">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md" onClick={() => updateQuantity(item.sku, 1)}><Plus className="h-3 w-3" /></Button>
                      </div>
                    </div>
                  ))
                }
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex-col gap-4 border-t p-6 bg-secondary/10">
              <div className="w-full flex justify-between items-center">
                <span className="text-sm text-muted-foreground uppercase font-mono-data tracking-widest">Subtotal</span>
                <span className="text-2xl font-bold text-primary">R$ {totalPrice}</span>
              </div>
              <Button className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20" disabled={cart.length === 0} onClick={() => setIsCheckoutOpen(true)}>
                Finalizar Requisição
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-center">Confirmar Entrega</DialogTitle>
          </DialogHeader>
          <div className="py-8 space-y-6 text-center">
            <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-2xl border border-primary/10">
              <span className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Valor do Pedido</span>
              <span className="text-4xl font-bold text-primary font-headline">R$ {totalPrice}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ao confirmar, o inventário será atualizado imutavelmente e o comprovante de retirada será gerado no motor de auditoria.
            </p>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="ghost" onClick={() => setIsCheckoutOpen(false)} className="flex-1">Cancelar</Button>
            <Button className="bg-primary hover:bg-primary/90 flex-1 h-12" onClick={handleFinishPurchase}>Confirmar e Retirar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  )
}