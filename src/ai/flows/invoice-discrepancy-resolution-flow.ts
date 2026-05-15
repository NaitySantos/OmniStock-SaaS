'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const InvoiceItemSchema = z.object({
  sku: z.string(),
  description: z.string(),
  invoiceQuantity: z.number().int().positive(),
  unitPrice: z.number().positive(),
});

const PhysicalInventoryItemSchema = z.object({
  sku: z.string(),
  description: z.string(),
  physicalQuantity: z.number().int().min(0),
});

const InvoiceDiscrepancyResolutionInputSchema = z.object({
  invoiceItems: z.array(InvoiceItemSchema),
  physicalInventoryItems: z.array(PhysicalInventoryItemSchema),
});
export type InvoiceDiscrepancyResolutionInput = z.infer<typeof InvoiceDiscrepancyResolutionInputSchema>;

const DiscrepancySchema = z.object({
  sku: z.string(),
  description: z.string(),
  invoiceQuantity: z.number().int(),
  physicalQuantity: z.number().int(),
  difference: z.number().int(),
  suggestedAction: z.string(),
});
export type Discrepancy = z.infer<typeof DiscrepancySchema>;

const InvoiceDiscrepancyResolutionOutputSchema = z.array(DiscrepancySchema);
export type InvoiceDiscrepancyResolutionOutput = z.infer<typeof InvoiceDiscrepancyResolutionOutputSchema>;

export async function resolveInvoiceDiscrepancies(input: InvoiceDiscrepancyResolutionInput): Promise<InvoiceDiscrepancyResolutionOutput> {
  return invoiceDiscrepancyResolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'invoiceDiscrepancyResolutionPrompt',
  input: { schema: InvoiceDiscrepancyResolutionInputSchema },
  output: { schema: InvoiceDiscrepancyResolutionOutputSchema },
  prompt: `Analise as discrepâncias entre a nota fiscal e a contagem física.
  
  Nota Fiscal:
  {{#each invoiceItems}}
  - SKU: {{{this.sku}}}, Qtd: {{{this.invoiceQuantity}}}
  {{/each}}
  
  Físico:
  {{#each physicalInventoryItems}}
  - SKU: {{{this.sku}}}, Qtd: {{{this.physicalQuantity}}}
  {{/each}}
  
  Retorne apenas os itens com diferença diferente de zero.`,
});

const invoiceDiscrepancyResolutionFlow = ai.defineFlow(
  {
    name: 'invoiceDiscrepancyResolutionFlow',
    inputSchema: InvoiceDiscrepancyResolutionInputSchema,
    outputSchema: InvoiceDiscrepancyResolutionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
