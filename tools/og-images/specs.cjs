// Uma entrada por artigo (slug = nome do .md em src/).
//   layout   A painel escuro inclinado · D painel amarelo · G painel claro, corte reto · F foto em cartão sobre navy
//            H foto do parque do stand a toda a largura. Alternar: dois posts seguidos não devem ter o mesmo layout.
//   photo    id da foto no inventário (o número em omeustand.pt/viaturas/224/<id>_omeustand_foto.webp) ou ficheiro em src/img
//   car      nome do carro, só para o ogImageAlt
//   h1       <br> = quebra de linha (só quebra aí), <em> = destaque. No layout G e D, um <em> não pode atravessar um <br>
//   tag      subtítulo curto (quebra em 2 linhas equilibradas); chip = falso botão (não aparece no G)
//   sticker  [linha pequena, número grande] — um facto do próprio artigo, nunca inventado
//   wm       marca d'água (só F) · v = versão do ficheiro (default 1; subir sempre que mudar uma imagem já publicada)
//   ph       { left, top, width } para acertar a foto se a frente do carro ficar tapada pelo painel
// O og:image do TVDE (og-carros-usados-tvde-2026-v2.jpg) foi feito à mão antes deste gerador e não está aqui.
module.exports = [
  { slug: 'carros-automaticos-usados-vantagens-riscos', layout: 'A', photo: '7724357451', car: 'Peugeot 2008 GT automático',
    eyebrow: 'GUIA DE COMPRA', h1: 'Automático<br>usado:<br><em>prós e riscos</em>',
    tag: 'O que verificar antes de comprar', chip: 'LER O GUIA' },

  { slug: 'carros-usados-mais-caros-2026', layout: 'G', photo: '7723893907', car: 'Ford EcoSport',
    eyebrow: 'MERCADO 2026', h1: 'Porque estão<br>os usados<br><em>mais caros</em>?',
    tag: 'O que dizem os números de 2026', sticker: ['PREÇO MÉDIO', '24.800€'] },

  { slug: 'checklist-comprar-carro-usado-antes-visita', layout: 'F', photo: '7724173085', car: 'Citroën C3',
    eyebrow: 'ANTES DA VISITA', h1: 'Checklist<br>para comprar<br><em>usado</em>',
    tag: 'Orçamento, histórico, teste e papéis', chip: 'LER A CHECKLIST', sticker: ['CHECKLIST', '7 PASSOS'], wm: '7' },

  { slug: 'como-funciona-retoma-carro-usado', layout: 'D', photo: '7724223933', car: 'Jeep Renegade',
    eyebrow: 'RETOMA', h1: 'Quanto vale<br>o seu <em>carro</em>?',
    tag: 'Como se calcula uma avaliação justa', chip: 'SIMULAR RETOMA', sticker: ['SIMULADOR', 'GRÁTIS'] },

  { slug: 'diesel-ou-gasolina-carro-usado-2026', layout: 'D', photo: '7724623494', car: 'Skoda Kodiaq diesel',
    eyebrow: 'GUIA 2026', h1: '<em>Diesel</em><br>ou <em>gasolina</em>?',
    tag: 'A escolha certa para o seu uso', chip: 'LER O GUIA', sticker: ['O DIESEL COMPENSA ACIMA DE', '15.000 KM/ANO'] },

  { slug: 'financiamento-carro-usado-portugal', layout: 'G', photo: '7723733021', car: 'Renault Captur',
    eyebrow: 'CRÉDITO AUTOMÓVEL', h1: 'Antes de<br><em>assinar</em><br>o crédito',
    tag: 'TAN, TAEG, entrada e prazo explicados', sticker: ['NÃO CONFUNDA', 'TAN ≠ TAEG'] },

  { slug: 'garantia-carro-usado-portugal', layout: 'F', photo: '7724552048', car: 'Citroën ë-C4 elétrico',
    eyebrow: 'OS SEUS DIREITOS', h1: 'Garantia<br>de usados:<br>o que <em>cobre</em>?',
    tag: 'E o que fica de fora, bateria incluída', chip: 'LER O GUIA', sticker: ['LEI PORTUGUESA', 'DL 84/2021'], wm: 'LEI' },

  { slug: 'guerra-irao-impacto-escolha-carro-usado', layout: 'F', photo: '7724236003', car: 'Tesla Model 3',
    eyebrow: 'ATUALIDADE', h1: 'Guerra no Irão<br>e o seu <em>próximo<br>carro</em>',
    tag: 'Gasolina, diesel, híbrido ou elétrico?', chip: 'LER O ARTIGO' },

  { slug: 'importar-carro-usado-portugal', layout: 'F', photo: 'importar-carro-bmw-116d-circuito-car.webp', car: 'BMW 116d',
    eyebrow: 'IMPORTAÇÃO', h1: 'Importar<br>carro usado:<br><em>compensa</em>?',
    tag: 'Custos, ISV e erros a evitar', chip: 'LER O GUIA', sticker: ['O PREÇO LÁ FORA', 'NÃO É O FINAL'], wm: 'ISV' },

  { slug: 'inspecao-automovel-ipo-2026-portugal', layout: 'A', photo: '7723638615', car: 'Citroën C4 Cactus',
    eyebrow: 'IPO 2026', h1: 'Inspeção:<br>a nova regra<br>dos <em>recalls</em>',
    tag: 'Prazos, preços e o que faz chumbar', chip: 'LER O GUIA', sticker: ['RECALL POR CORRIGIR', 'REPROVA'] },

  { slug: 'iuc-carros-usados-portugal', layout: 'G', photo: '7724454236', car: 'Peugeot 208',
    eyebrow: 'IUC 2026', h1: 'Quanto paga<br>de <em>IUC</em> num<br>usado?',
    tag: 'Cilindrada, CO₂ e ano de matrícula' },

  { slug: 'iuc-novas-regras-pagamento-2027', layout: 'D', photo: '7724444664', car: 'Nissan Qashqai',
    eyebrow: 'IUC · NOVAS REGRAS', h1: 'Acabou o IUC<br>no <em>mês da</em><br><em>matrícula</em>',
    tag: 'O calendário de 2027 e 2028', chip: 'VER O CALENDÁRIO', sticker: ['MÊS BASE EM 2028', 'ABRIL'] },

  { slug: 'onde-comprar-carro-usado-famalicao', layout: 'H', photo: 'circuito-car-stand-automovel-joane.webp', car: 'stand',
    eyebrow: 'GUIA LOCAL · FAMALICÃO', h1: 'Onde comprar<br><em>usado</em> com<br>confiança',
    tag: 'Stand em Joane, Vila Nova de Famalicão', chip: 'LER O GUIA' },

  { slug: 'opel-gt-roadster-usado-2009', layout: 'A', photo: '7724383789', car: 'Opel GT 2009',
    eyebrow: 'DESPORTIVOS', h1: 'Opel GT:<br>o roadster<br><em>esquecido</em>',
    tag: 'Tração traseira, dois lugares, manual', chip: 'LER O ARTIGO', sticker: ['2.0 TURBO', '264 CV'] },

  { slug: 'os-pontos-que-mais-pesam-na-escolha-de-um-carro-para-familia', layout: 'A', photo: '7723819801', car: 'Citroën Grand C4 SpaceTourer',
    eyebrow: 'CARRO PARA FAMÍLIA', h1: 'O que <em>mais<br>pesa</em> na<br>escolha',
    tag: 'Espaço, conforto e custos do dia a dia', chip: 'LER O GUIA' },

  { slug: 'quanto-custa-importar-carro-usado-portugal', layout: 'D', photo: '7723844458', car: 'Mercedes-Benz CLA Shooting Brake',
    eyebrow: 'IMPORTAÇÃO', h1: 'Quanto custa<br><em>importar</em><br>um usado?',
    tag: 'ISV, inspeção B e registo: a conta real', chip: 'VER A CONTA', sticker: ['LEGALIZAÇÃO', '~200€ + ISV'] },

  { slug: 'tabela-isv-2026-portugal', layout: 'A', photo: '7724683456', car: 'Mercedes-Benz Classe A',
    eyebrow: 'TABELA ISV 2026', h1: 'Escalões e<br><em>redução</em> por<br>antiguidade',
    tag: 'Cilindrada, CO₂, NEDC e WLTP', chip: 'VER A TABELA', sticker: ['REDUÇÃO ATÉ', '80%'] },

  { slug: 'vale-a-pena-comprar-eletrico-usado-2026', layout: 'F', photo: '7724518951', car: 'MG4 elétrico',
    eyebrow: 'ELÉTRICOS 2026', h1: 'Elétrico<br>usado: <em>compensa</em><br>mesmo?',
    tag: 'Bateria, autonomia real e custo por km', chip: 'LER O GUIA', sticker: ['PEÇA SEMPRE O', 'SOH'], wm: 'SOH' },

  // Simuladores: o slug é só o nome do ficheiro; as meta tags estão escritas à mão no .njk de cada simulador.
  { slug: 'simulador-credito', layout: 'D', photo: '7724025399', car: 'Peugeot 3008 GT Line',
    eyebrow: 'SIMULADOR GRATUITO', h1: 'Quanto fica<br>a <em>prestação</em>?',
    tag: 'Crédito automóvel sem registo nem compromisso', chip: 'SIMULAR AGORA', sticker: ['PRESTAÇÃO MENSAL', 'EM SEGUNDOS'] },

  { slug: 'simulador-retoma', layout: 'F', photo: '7724352217', car: 'Cupra Born',
    eyebrow: 'SIMULADOR DE RETOMA', h1: 'Saiba quanto<br>vale o seu<br><em>carro</em>',
    tag: 'Uma ideia do valor antes de vir ao stand', chip: 'SIMULAR AGORA', sticker: ['SIMULADOR', 'GRÁTIS'], wm: '€' },

  { slug: 'custo-mensal-carro', layout: 'G', photo: '7724257010', car: 'Opel Mokka-e',
    eyebrow: 'CALCULADORA GRATUITA', h1: 'Quanto custa<br>ter carro<br><em>por mês</em>?',
    tag: 'Prestação, combustível, IUC, seguro e manutenção', sticker: ['A CONTA COMPLETA', '5 CUSTOS'] },

  { slug: 'vale-a-pena-comprar-hibrido-usado-2026', layout: 'G', photo: '7724210070', car: 'Renault Arkana E-Tech híbrido',
    eyebrow: 'HÍBRIDOS', h1: 'Híbrido usado<br>em 2026:<br><em>vale a pena?</em>',
    tag: 'Custos, uso real e pontos críticos' },
];
