# LUNA MODE — Luxury Digital Flagship Landing Page

Experiência digital editorial de luxo para a fashion house contemporânea **LUNA MODE**.
Construída com direção de arte arquitetônica, tipografia editorial (Syne & Sora), scroll-driven motion, revelação de portal 3D e deck interativo com suporte a gestos touch/mouse.

---

## 📁 Estrutura de Arquivos

```text
├── index.html                 # Página principal com marcação semântica e Tailwind
├── src/
│   ├── styles.css             # Design tokens, CSS moderno, clip-paths e regras responsivas
│   ├── main.ts                # Controlador TypeScript (gestos, scroll portal e fallback)
│   └── main.js                # Versão compilada ES6 para execução direta
├── assets/                    # Imagens do editorial e do laptop da campanha
│   ├── hero-laptop.jpg        # Imagem central do laptop (Website inside Website)
│   ├── model-01.jpg           # Helena Vance (Tricot Oliva / Look 01)
│   ├── model-02.jpg           # Kenji Sato (Jaqueta Corta-Vento / Look 02)
│   ├── model-03.jpg           # Maya Lin (Sobrecamisa Algodão / Look 03)
│   └── model-04.jpg           # Modern Form (Silhueta Escultural / Look 04)
├── package.json               # Configuração do projeto e scripts
├── tsconfig.json              # Configurações do compilador TypeScript
├── vercel.json                # Roteamento e otimizações de cache para Vercel
└── README.md                  # Documentação do projeto
```

---

## 🚀 Como Fazer o Deploy no Vercel

### Opção 1: Via CLI da Vercel
1. Instale a CLI: `npm i -g vercel`
2. No terminal da pasta do projeto, execute: `vercel`
3. Siga as instruções rápidas na tela (o projeto é estático com `index.html` na raiz).

### Opção 2: Via GitHub / Dashboard Vercel
1. Crie um repositório no seu GitHub e suba todos os arquivos deste projeto.
2. Acesse seu painel no [Vercel](https://vercel.com).
3. Clique em **"Add New Project"**, selecione o repositório e clique em **"Deploy"**.

---

## 🖼️ Mapeamento das Imagens do Usuário

O projeto já está configurado com fallbacks automáticos para os nomes originais gerados pelo Gemini:
* **Laptop no Hero**: `assets/hero-laptop.jpg` (ou `assets/Gemini_Generated_Image_z82azlz82azlz82a.jpg`)
* **Modelo 1 (Helena Vance)**: `assets/model-01.jpg` (ou `assets/Gemini_Generated_Image_5iih315iih315iih.jpg`)
* **Modelo 2 (Kenji Sato)**: `assets/model-02.jpg` (ou `assets/Gemini_Generated_Image_iksdv1iksdv1iksd.jpg`)
* **Modelo 3 (Maya Lin)**: `assets/model-03.jpg` (ou `assets/Gemini_Generated_Image_h7au9kh7au9kh7au.jpg`)
* **Look 04 (Modern Form)**: `assets/model-04.jpg` (crop/variação editorial com paleta profunda)

---

## 🎨 Destaques do Design System

- **Cores**: Background `#0A0C0E`, Superfícies `#101317`, Tipografia `#EDE7DC`, Muted `#9EA5A8`, Detalhes em Âmbar `#E8913C` e Deep Teal `#2E6B72`.
- **Hero Sticky Portal**: Sequência cinematográfica em 250vh que afasta os dois painéis arquitetônicos, separa os blocos tipográficos `LUNA` / `MODE` e projeta o laptop 3D.
- **Card Deck com Gestos**: Permite arrastar os cards com rotação proporcional e arremessá-los para fora ao passar de 20% da largura, avançando na contagem `01/03`, `02/03`, `03/03`.
