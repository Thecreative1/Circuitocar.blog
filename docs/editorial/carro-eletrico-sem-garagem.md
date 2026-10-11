# Pesquisa editorial — Carro elétrico sem garagem

## Revisão de clareza — 11 de outubro de 2026

Após observação do utilizador, revistas todas as secções para responder à pergunta antes de apresentar condições. A secção noturna distingue permanência autorizada, fim da carga e custo de inatividade, com uma recomendação prática. Exemplo aritmético: uma hora após o fim da carga, menos 15 minutos de tolerância, dá 45 × 0,20 € = 9 € adicionais na regra publicada pelo Continente; não implica acesso noturno ao parque. Reconsultadas as fontes oficiais Continente, Tesla e FAQ MOBI.E. A Tesla distingue congestionamento em local movimentado do simples fim da carga; pode haver cobrança durante a sessão ao atingir o limiar indicado.

Acrescentados exemplos de duração com potência média (30 kWh / 11 kW ≈ 2 h 45 min; / 60 kW = 30 min), meios de acesso concretos e resposta a posto ocupado/avariado. O título sobre escolha do carro passou a pedir critérios de verificação, correspondendo ao conteúdo. FAQ visível e JSON-LD atualizados em conjunto. O resultado editorial passa a ser resposta → condições → exemplo → ação, sem transformar exemplos em regras universais.

Pesquisa e verificação: **11 de outubro de 2026**. Artigo: `src/carro-eletrico-sem-garagem.md`.

## Método e intenção

Pesquisa qualitativa em resultados de pesquisa e discussões públicas portuguesas. Não foram consultados volumes de palavras-chave, Google Trends ou Search Console; não se afirma que estas sejam as perguntas mais pesquisadas em termos quantitativos.

Consultas utilizadas: `carro elétrico sem garagem carregamento público compensa Portugal reddit 2026`; `site.mobie.pt carregamento preço CEME OPC 2026 como carregar`; `site.erse.pt mobilidade elétrica 2026 preços carregamento público`; `site.continente.pt Plug&Charge kWh`; `site.renault.pt carregamento elétrico AC DC potência carregador bordo`.

## Perguntas observadas e resposta editorial

- [AutoTuga — compensa sem garagem?](https://www.reddit.com/r/AutoTuga/comments/1t3p6f6/carro_el%C3%A9trico_sem_garagem_compensa_mesmo_em/): viabilidade diária, custo face a gasolina/gasóleo, apps e postos ocupados. Origina a resposta inicial, a comparação de custos e o teste da rotina.
- [EVPortugal — sem carregador em casa](https://www.reddit.com/r/EVPortugal/comments/1wkzijg/ev_sem_carregador_em_casa/): proximidade de postos, carregamento no trabalho e experiências divergentes. Origina o plano alternativo e a distinção entre não ter garagem e não ter acesso habitual a carregamento.
- [AutoTuga — elétrico sem garagem](https://www.reddit.com/r/AutoTuga/comments/1wnkmnm/carro_el%C3%A9ctrico_sem_garagem/): conveniência e deslocações dedicadas ao carregamento. Origina a secção sobre tempo e horários.

Os testemunhos servem para identificar dúvidas, não para validar custos, conclusões técnicas ou promessas de poupança. Não foram reproduzidas citações dos participantes.

Ângulo: decidir com os postos e a rotina reais, preço final e consumo faturado. Complementa o guia geral `vale-a-pena-comprar-eletrico-usado-2026.html`, sem repetir o seu foco na compra/bateria. Categoria: Guia de Compra. Não fixar `featured: true`; a data torna-o o mais recente.

## Fontes primárias

- [Continente Plug&Charge](https://feed.continente.pt/plug-charge): preços publicados com IVA, condições de utilização e de inatividade. Revalidar tarifas e campanhas antes de atualizar o artigo.
- [MOBI.E — interpretar o custo](https://www.mobie.pt/carregarveiculo/interpretar-o-custo-de-carregamento): componentes de tarifários no modelo CEME/OPC. Não generalizar este modelo a todos os serviços.
- [ERSE — regulamento](https://www.erse.pt/atividade/regulamento-mobilidade-eletrica/): coexistência das regras anteriores durante a transição; o artigo evita um prazo legal específico porque páginas informativas podem ter datas de atualização distintas.
- [Renault — carregamento](https://www.renault.pt/e-tech-eletrico/carregamento.html): capacidades AC/DC dependem da versão; potência do posto não equivale à potência efetiva do carro.
- [Tesla Portugal — taxas](https://www.tesla.com/pt_pt/support/charging/supercharger/fees): exemplo de condições adicionais de congestionamento. Não extrapolar a todos os operadores.

## Cálculos e limites

- Cenário hipotético: **18 kWh faturados/100 km**, incluindo perdas no pressuposto (não adicionar novamente uma percentagem). Não se apresenta como consumo universal nem como consumo específico do Fiat da foto.
- A 0,35 / 0,45 / 0,60 / 0,75 €/kWh: 6,30 / 8,10 / 10,80 / 13,50 €/100 km; a 1.000 km/mês: 63 / 81 / 108 / 135 €.
- Combustíveis hipotéticos, não cotação atual: gasolina 6 l/100 km × 1,80 €/l = 10,80 €/100 km; gasóleo 5,5 × 1,70 = 9,35 €/100 km.
- Limiar de energia: 10,80 / 18 = 0,60 €/kWh; 9,35 / 18 ≈ 0,52 €/kWh. Não inclui aquisição, seguro, manutenção, depreciação ou financiamento.
- Cenário semanal: 250 km × 18/100 = 45 kWh faturados; a 11 kW médios no posto ≈ 4,1 horas; a 7,4 kW médios ≈ 6,1 horas. Exemplo teórico, não promessa de tempo de carga ou frequência universal.
- Cenário de autonomia: 50 kWh úteis × 60% / (16 kWh/100 km) = 187,5 km entre 20% e 80%, antes de margem. Aqui são kWh da bateria, não faturados; hipótese distinta e identificada.

## Fotografia e validação

[Fiat 500e Icon 2022, anúncio ID175021](https://www.circuitocar.pt/viatura/fiat-500e-ID175021.html), com fotografia real ligada pelo anúncio: https://omeustand.pt/viaturas/224/7724611180_omeustand_foto.webp . Ambos responderam HTTP 200 em verificação direta. A imagem ilustra o tema; os exemplos numéricos não descrevem esta viatura. Não se fixa o preço/stock no corpo, porque pode mudar.

Antes da entrega: build Eleventy, presença no hero/índice/sitemap/RSS, ligações internas, JSON-LD, concordância do FAQ visível e visualização desktop/mobile por HTTP. Sem alterações manuais ao HTML da raiz.

Validação concluída: `npm run build` sem erros; artigo presente no hero, índice, sitemap e RSS. Verificação por HTTP com Chromium a 1440, 390 e 320 px: um H1, 35 ligações internas válidas por viewport, JSON-LD legível e FAQ coincidente com o texto visível, fotografia carregada, CTA de 48 px, sem erros JavaScript nem transbordo horizontal. Texto do corpo: cerca de 1.782 palavras (9 minutos).

A revisão visual detetou o título completo cortado no hero mobile. Foi acrescentado o campo opcional `homeTitle` com fallback para `title` no template da homepage, e ajustados tamanho de letra e espaçamento do cartão mobile. O artigo mantém o H1 completo; o destaque usa “Elétrico sem garagem?”. Verificado sem cortes, mantendo o formato paisagem. Servidor e ficheiros temporários de verificação removidos após revisão. Publicação não efetuada nesta tarefa.
