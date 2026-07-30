# CT Gustavo Pires

Site institucional do CT Gustavo Pires — Mineiros do Tietê, SP.

Site estático: HTML, CSS e JavaScript puros. Não precisa de servidor —
basta abrir o `index.html` ou publicar a pasta (GitHub Pages, Vercel etc.).

## Estrutura

```
index.html            página única do site
css/tailwind.css      CSS gerado pelo Tailwind (NÃO editar à mão)
css/style.css         estilos próprios (editar aqui)
js/script.js          menu, animações de entrada e rolagem suave
img/                  fotos e logos
src/tailwind.src.css  entrada usada para gerar o css/tailwind.css
tailwind.config.js    cores e fontes da marca
```

## ⚠️ Ao mexer nas classes do HTML

O Tailwind **não roda mais no navegador** — o CSS já vem pronto em
`css/tailwind.css`. Isso deixou o site muito mais rápido, mas tem uma
consequência importante:

> Se você adicionar uma classe Tailwind nova no HTML
> (ex: `text-3xl`, `mt-10`, `bg-red-500`), ela **só vai funcionar depois
> de gerar o CSS de novo**.

Para gerar:

```bash
npm install      # só na primeira vez
npm run build:css
```

Depois é só commitar o `css/tailwind.css` junto com a alteração.

Trocar textos, links ou fotos **não exige** rebuild — só mexer em classes.

## Fotos

As fotos da seção "Estrutura" ficam em `img/` e são referenciadas no
`index.html`. Elas foram redimensionadas para no máximo 800px de largura —
é o suficiente para telas retina e mantém o site leve. Ao substituir uma
foto, mantenha o mesmo nome de arquivo e atualize os atributos
`width`/`height` da tag `<img>` se a proporção mudar.

## Ícones

Os ícones são SVG embutidos direto no HTML (biblioteca Lucide). Não há
dependência externa: carregar a biblioteca inteira custava 404 KB para
usar 26 ícones.
