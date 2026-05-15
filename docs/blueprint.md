# **App Name**: OmniStock SaaS

## Core Features:

- Centro de Controle Multiunidade: Painel centralizado para alternar entre múltiplas unidades de negócio, garantindo isolamento total de dados via Row Level Security.
- Autorização por PIN Seguro: Camada de segurança secundária que exige um PIN de 6 dígitos para ações de alto risco, como retiradas e correções de registros.
- Reconciliação Inteligente de NF: Ferramenta (tool) que utiliza IA para detectar automaticamente discrepâncias entre contagens físicas e dados de notas fiscais, sugerindo caminhos de correção.
- Fluxo Logístico entre Unidades: Processo de aprovação em múltiplas etapas para transferências de estoque entre locais, com rastreamento em tempo real e confirmação dupla.
- Motor de Auditoria Imutável: Log imutável de todo o sistema capturando instantâneos JSON (antes/depois) de todas as transações para conformidade e prevenção de fraudes.
- Webhooks para Máquinas Externas: Sistema de entrada via API que permite que máquinas automatizadas atualizem níveis de estoque sem necessidade de intervenção humana.
- Alertas Preditivos de Baixo Estoque: Sistema de notificação proativo acionado por limites configuráveis, com alertas em tempo real via push e e-mail.

## Style Guidelines:

- Cor primária: Cobalto de Alta Precisão (#2B59FF) para evocar confiança e autoridade tecnológica.
- Cor de fundo: Carbono de Ardósia Profunda (#0B0E14) para um espaço de trabalho profissional e focado no modo escuro.
- Destaque: Índigo Elétrico (#7A3BFF) usado para estados ativos e indicadores de progresso críticos.
- Fontes: 'Space Grotesk' para títulos técnicos e 'Inter' para legibilidade máxima em tabelas de dados.
- Monoespaçada: 'Source Code Pro' para UUIDs, números de NF e logs de auditoria.
- Layout de dashboard rígido com barra lateral modular e painéis de detalhes recolhíveis para alta densidade de dados.
- Microinterações táteis no teclado de PIN e transições suaves de deslizamento entre unidades de negócio.