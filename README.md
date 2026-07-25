# Estância Santa Mônica — Site (redesign)

## Estrutura de pastas
```
/
├── index.html
├── ovinos.html
├── historia.html
├── contato.html
├── css/
│   └── style.css      (folha de estilos única, organizada por seções e comentada)
├── js/
│   ├── main.js         (header dinâmico, menu mobile, voltar ao topo, contadores, AOS)
│   └── carrossel.js    (carrossel de fotos das fichas de animais)
└── img/                 ← copie aqui as MESMAS imagens do site antigo
```

## Imagens necessárias (mesmos nomes do projeto original)
Copie a pasta `img/` do site antigo para dentro desta pasta, mantendo os nomes:
- logo.png
- carneiros.png
- carneiros2.png
- dorper.jpg
- santaines.jpg, santaines-2.jpg, santaines-3.jpg
- dorper2.jpg, dorper2-2.jpg, dorper2-3.jpg

Nenhuma imagem precisou ser trocada — só o CSS/HTML ao redor delas.

## O que mudou
- Visual 100% novo: paleta verde-pasto + dourado-campo + marfim, tipografia Fraunces (títulos) + Work Sans (texto) + JetBrains Mono (dados/preço), inspirada em marcas premium do agro, sem copiar nenhuma delas.
- Header fixo que fica transparente no topo e sólido com sombra ao rolar.
- Hero novo em tela cheia com overlay, título/subtítulo/botões animados.
- Fichas de animais reformuladas como "cartão de registro" com selo numerado (nº do animal), specs em formato de ficha e carrossel de fotos mantendo a mesma lógica de antes (setas, indicadores, swipe no celular).
- Seção de valores (Trajetória) construída a partir do próprio texto da estância: manejo responsável, bem-estar animal, atendimento transparente e legado familiar.
- Botão "voltar ao topo", contadores animados, animações AOS ao rolar, ícones Bootstrap Icons, Bootstrap 5.3 (via CDN) para o grid/utilitários de base.
- Todos os links funcionais mantidos: WhatsApp (com mensagens pré-preenchidas por animal), Google Maps, iframe do mapa.
- Arquivos antigos `historia.css`, `ovinos.css`, `contato.css` e `script.js` foram substituídos por `css/style.css` e `js/main.js` + `js/carrossel.js` — não são mais necessários.

## Observação sobre os números da faixa de estatísticas (Home)
Os números "2 raças" e "100% manejo responsável" refletem o conteúdo real do site (Dorper/Santa Inês e o texto da página Trajetória). Ajuste-os livremente se quiser incluir outros dados (anos de atuação, nº de animais já vendidos etc.).
