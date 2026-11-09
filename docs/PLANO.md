# Caixa Preta — plano do hub e do gerenciamento

## Ponto de partida

Levantamento em 09/11/2026, a partir de https://linktr.ee/produtoracaixapreta e da página oficial https://cheers.com.br/evento/requebra-com-caio-prince-35077.

O Linktree reúne 16 destinos úteis: Instagram, grupo oficial, quatro contatos de representantes, Cheers, oito destinos de fotografias/acervo e um vídeo da Batalha Vozes do Gueto. O símbolo publicado já incorpora um cubo vermelho. A campanha em destaque é ReQuebra com Caio Prince, em 14/11/2026, às 22h, em Presidente Prudente; a página oficial informa o local como “Em breve”. Não foi inventado um endereço. Preços e disponibilidade são consultados no destino oficial, sem números fixos no front.

O inventário completo e as origens das imagens estão em `source-inventory.json`. As imagens utilizadas são cópias de assets dos canais públicos fornecidos, otimizadas localmente para WebP. Os créditos dos fotógrafos acompanham os álbuns.

## Experiência proposta

O cubo funciona como identidade e entrada interativa. Ao clicar, as faces se abrem e aparece um diretório pesquisável, com filtros de Ingressos, Fotos, Comunidade e Conteúdos. Há acesso direto aos links para quem não quiser passar pela animação, além de pausa de movimento, teclado e respeito a movimento reduzido. Falhas de WebGL mantêm a entrada alternativa.

A página pública contém:

1. Apresentação da produtora e cubo interativo.
2. Encontro em destaque, compra oficial e escolha de representante.
3. Diretório completo de links filtráveis.
4. Memórias e álbuns com crédito.
5. Publicações próprias do hub: chamadas de eventos, registros, vídeos e novidades.
6. Acesso ao grupo e Instagram oficiais.

O público compra no canal oficial. O site não processa pagamentos nem envia mensagens automaticamente.

## Etapa 1 — implementada nesta prévia

- Front público responsivo com cubo Three.js procedural e abertura animada.
- Conteúdo real levantado nos canais acima.
- Painel com visão geral, links, publicações, métricas e aparência.
- CRUD local de links e posts, ordenação, destaque, visibilidade e janelas de publicação.
- Upload de imagem com redução, edição do destaque e da identidade.
- Backup/importação de conteúdo JSON e exportação de métricas CSV.
- Métricas reais de interações de teste neste navegador, sem dados de campanha inventados.

O armazenamento é `localStorage`, no mesmo navegador/origem. Abas abertas recebem as mudanças pelo evento de armazenamento. Não há login nem banco compartilhado. O agendamento controla a visibilidade ao abrir/atualizar o hub; não é um serviço em segundo plano. Não há postagem automática nas redes. A prévia não foi publicada em domínio externo.

## Etapa 2 — gerenciamento de produção

Trocar a camada de armazenamento por API e banco, preservando os conceitos do front. Uma implementação coerente com o projeto atual é API Node.js, PostgreSQL e armazenamento de arquivos compatível com S3. A escolha final do provedor depende de onde a Caixa Preta deseja hospedar. Se for usado Sites, adaptar a API para Worker e usar os serviços persistentes oferecidos pelo ambiente.

### Acesso e equipe

- Administrador: marca, integrações, usuários, publicações e exclusões.
- Editor: links, eventos, galeria e publicações.
- Analista: relatórios e exportações, sem alteração de conteúdo.
- Login real com provedor de identidade ou sessão segura; autorização verificada no servidor em cada operação.
- Histórico de alterações, recuperação de conteúdo e backup.

### Modelo de dados

| Entidade | Campos principais |
| --- | --- |
| Organização | nome, marca, apresentação, tema, redes, domínio |
| Usuário / vínculo | identificador, organização, papel, status |
| Link | título, descrição, URL, categoria, ordem, destaque, ativo, início, fim |
| Publicação | título, chamada, corpo, capa, categoria, destino, rascunho/publicado/agendado, autor, revisão |
| Evento | título, início/fim, local, cidade, capa, links de venda, representantes, destaque |
| Álbum | evento, cidade, capa, destino, fotógrafo e crédito |
| Arquivo | localização, formato, tamanho, dimensões, texto alternativo, autor |
| Interação | tipo, instante, destino/post/evento, origem, sessão anônima, dispositivo |
| Auditoria | usuário, ação, entidade, instante, versão anterior |

### API proposta

- Público: `GET /api/public/content`, `POST /api/analytics/events`.
- Equipe: `GET/POST/PATCH/DELETE /api/links`, `/posts`, `/events`, `/albums`.
- Mídia: upload autorizado, validação de formato/tamanho e otimização.
- Marca: `GET/PATCH /api/profile`.
- Relatórios: `GET /api/analytics/summary`, `/links`, `/posts`, `/sources`, `/devices`, `/export`.
- Agendamento: rotina no servidor com datas e timezone explícitos, além de filtros na consulta pública.

URLs devem continuar limitadas a HTTP/HTTPS. Textos precisam ser tratados como conteúdo, e não HTML executável. Uploads, importação, permissões e limites são validados também no servidor. O painel local atual não deve ser exposto como se já tivesse autenticação.

## Métricas: o que medir

- `page_view`: visita à página pública.
- `cube_open`: abertura da caixa e ponto de entrada.
- `link_click`: saída para um destino, categoria e posição de exibição.
- `post_view`: abertura de uma publicação do hub.
- Clique originado em post: vínculo entre publicação e destino.

Indicadores: visitas, sessões, abertura da caixa, cliques por destino/categoria, sessões que clicaram, origem de tráfego e dispositivo. A taxa exibida é a proporção de sessões com pelo menos um clique; múltiplos cliques da mesma sessão não criam uma conversão acima de 100%.

Em produção, a coleta deve excluir o modo de prévia/equipe, limitar spam, definir retenção e configurar consentimento/privacidade conforme as ferramentas e dados escolhidos. Cliques em ingressos não são vendas: conversão de compra exige retorno da plataforma de ingressos ou integração específica. Curtidas, alcance e impressões do Instagram exigem uma integração autorizada da conta; não podem ser deduzidos de cliques no hub.

## Etapa 3 — evolução opcional

Múltiplos eventos, calendário, publicação agendada com histórico, mídia organizada por evento, campanhas com UTMs, QR de destinos reais, permissões de equipe e integrações oficiais. O conteúdo e as prioridades devem ser aprovados com a produtora antes de conectar contas ou publicar a versão definitiva.

## Critério de passagem do front para o backend

Validar com a Caixa Preta: identidade, comportamento do cubo no celular, organização das categorias, linguagem das chamadas, fluxo de representantes e telas de gerenciamento. Depois conectar persistência compartilhada, autenticação e analytics de produção, migrar o conteúdo e verificar permissões/visibilidade antes da publicação.
