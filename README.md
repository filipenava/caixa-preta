# Caixa Preta — hub + estúdio

Hub interativo da Produtora Caixa Preta, com entrada 3D, links diretos, landing page opcional e prévia do painel editorial.

- Site: https://filipenava.github.io/caixa-preta/
- Landing page: https://filipenava.github.io/caixa-preta/lp.html
- Painel de demonstração: https://filipenava.github.io/caixa-preta/admin.html

O painel é uma demonstração sem autenticação: as alterações e métricas são locais ao navegador e não atualizam o conteúdo de outros visitantes. Não há credenciais ou dados privados no site. A etapa de backend está descrita em `docs/PLANO.md`.

```text
npm install --ignore-scripts
npm start
```

- Público: http://127.0.0.1:6070/
- Painel: http://127.0.0.1:6070/admin

O front usa Three.js e módulos JavaScript nativos. O servidor Node fornece apenas os arquivos. O gerenciamento funcional desta etapa salva no navegador, sem login ou banco de dados. Abra público e painel no mesmo navegador/origem para ver as alterações refletidas entre abas.

As métricas começam em zero e são geradas pelas interações locais; não são números da produtora, do Linktree ou do Instagram. A prévia usa dados públicos reais para os links e o evento, com textos editoriais propostos para a nova experiência.

## Arquivos

- `index.html`, `entrance.css`, `entrance.js`: cubo e lista completa de links.
- `lp.html`, `site.css`, `site.js`: landing page opcional.
- `cube.js`: cubo com faces e dobradiças reais, marca, pausa, teclado e alternativa sem WebGL.
- `admin.html`, `admin.css`, `admin.js`: gerenciamento.
- `seed.js`: curadoria inicial de 16 links, três publicações editoriais e um evento.
- `store.js`: conteúdo, visibilidade, persistência e registro de interações.
- `docs/PLANO.md`: levantamento, arquitetura, modelo de dados e evolução do backend.
- `docs/source-inventory.json`: URLs e origens das imagens.
- `verify.cjs`: verificação no Chrome local.

Os backups podem ser exportados pelo painel. Nesta etapa, mudanças em um navegador não são compartilhadas com outros dispositivos. O upload reduz as imagens para caber no armazenamento local; o servidor de produção terá armazenamento de arquivos próprio.

## Verificação

```text
npm test
```

O teste utiliza o Chrome instalado em `C:\Program Files\Google\Chrome\Application\chrome.exe`, sem baixar outro navegador. Relatório e capturas ficam em `evidence/`.

`npm run build` prepara `dist/` com o Three.js e sua licença, sem dependência de CDN. `npm run test:responsive` verifica a versão estática em 320×568, 390×844, 568×320, 768×1024, 820×1180, 1024×768, 1366×768 e 1920×1080. O teste cobre a entrada, lista completa, navegação para LP, cinco telas do painel e o formulário de edição. É possível apontá-lo para outra origem com `TEST_URL` e escolher o Chrome com `CHROME_PATH`.

## Publicação

O workflow `.github/workflows/pages.yml` instala as dependências, gera os arquivos estáticos e publica no GitHub Pages a cada push em `main`. Imagens originais de pesquisa, dependências locais e evidências dos testes não entram no repositório. A publicação inclui apenas as imagens otimizadas usadas no site.

## Créditos

Three.js 0.180.0: licença MIT, incluída no pacote estático em `vendor/three/LICENSE`. Identidade, campanhas e fotografias foram obtidas dos destinos públicos da Caixa Preta; suas origens e créditos constam em `docs/source-inventory.json` e no conteúdo dos álbuns. Esses materiais não recebem uma nova licença por estarem neste repositório.

## Próxima etapa

Validar esta experiência e então implementar autenticação, API, banco compartilhado, arquivos persistentes, publicação agendada e coleta de métricas no servidor. O painel atual está identificado como prévia local e não substitui esses componentes.
