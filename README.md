# OmniStock SaaS — Controle de Inventário Inteligente

Sistema SaaS de gestão de estoque multiunidade desenvolvido com foco em performance, escalabilidade e automação operacional.

## 🚀 Tecnologias Utilizadas

- Next.js 15 (App Router)
- React
- Tailwind CSS
- ShadCN UI
- Genkit + Google Gemini AI
- Lucide React

## ⚙️ Funcionalidades

- Controle de estoque multiunidade
- Entrada e saída de produtos
- Gestão operacional
- Interface responsiva
- Reconciliação inteligente de notas fiscais com IA
- Estrutura preparada para expansão SaaS

## 🛠️ Como Executar o Projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
GOOGLE_GENAI_API_KEY=sua_chave_aqui
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 4. Acesse no navegador

```text
http://localhost:9002
```

---

## 📸 Personalização de Imagens

As imagens do sistema são centralizadas em:

```text
src/app/lib/placeholder-images.json
```

Para alterar imagens:
- substitua o campo `imageUrl`
- utilize URLs válidas com `https://`

---

## 📁 Estrutura de Pastas

```text
src/
├── app/           # Rotas e páginas
├── components/    # Componentes reutilizáveis
├── ai/            # Fluxos de IA com Genkit
├── hooks/         # Hooks customizados
├── lib/           # Utilitários e arquivos JSON
```

---

## 📌 Roadmap

-  Controle de permissões
-  Multiempresa
-  Dashboard analítico
-  Integração fiscal
-  Auditoria de estoque
-  Controle por PIN e máquina

---

## 📄 Licença

Projeto privado para fins de desenvolvimento e estudo.

---

Desenvolvido utilizando o ecossistema moderno React/Next.js.
