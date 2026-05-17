# Como publicar artigos no blog — Guia para o cliente

---

## Antes de começar (feito uma vez pelo gestor do site)

O painel de administração usa a sua conta GitHub para guardar os artigos diretamente no repositório. Para isso funcionar, é necessário criar uma aplicação OAuth no GitHub e adicionar o código ao ficheiro de configuração.

### Passo 1 — Criar a aplicação OAuth no GitHub

1. Entre em [github.com/settings/developers](https://github.com/settings/developers)
2. Clique em **"OAuth Apps" → "New OAuth App"**
3. Preencha os campos:
   - **Application name:** `Circuito Car Blog CMS`
   - **Homepage URL:** `https://thecreative1.github.io/Circuitocar.blog`
   - **Authorization callback URL:** `https://thecreative1.github.io/Circuitocar.blog/admin/`
4. Clique em **"Register application"**
5. Copie o **Client ID** que aparece no topo da página

> ⚠️ Não precisa de criar nem guardar nenhum Client Secret — o método PKCE não o exige.

### Passo 2 — Adicionar o Client ID ao ficheiro de configuração

Abra o ficheiro `src/admin/config.yml` e substitua a linha:

```
app_id: REPLACE_WITH_YOUR_GITHUB_OAUTH_APP_CLIENT_ID
```

pelo Client ID copiado no passo anterior. Exemplo:

```
app_id: Ov23liABCDEF123456
```

Faça commit e push desta alteração para o GitHub. O site reconstrói automaticamente.

### Passo 3 — Dar acesso ao cliente

Para que o cliente consiga publicar artigos, a sua conta GitHub precisa de ter acesso de escrita ao repositório:

1. Vá a `github.com/thecreative1/Circuitocar.blog/settings/access`
2. Clique em **"Add people"** e convide o email ou username GitHub do cliente
3. O cliente receberá um email de convite — deve aceitá-lo antes de tentar entrar no painel

---

## Como entrar no painel de administração

1. Abra o browser e aceda a:
   **`https://thecreative1.github.io/Circuitocar.blog/admin/`**

2. Clique no botão **"Login with GitHub"**

3. Uma janela do GitHub abre a pedir autorização — clique em **"Authorize"**

4. O painel de administração abre. Verá a lista de artigos existentes e um botão para criar novos.

> 💡 Na próxima vez que entrar, o login é automático enquanto a sessão do GitHub estiver ativa no browser.

---

## Como escrever e publicar um artigo

### 1. Criar um novo artigo

No painel, clique em **"Artigos do Blog"** na barra lateral esquerda e depois em **"New Artigo"** no canto superior direito.

### 2. Preencher os campos

| Campo | O que escrever |
|---|---|
| **Título** | O título do artigo. Ex: *Quando vale a pena comprar um SUV usado?* |
| **Data de publicação** | A data em que o artigo deve aparecer no blog |
| **Categoria** | Escolha a categoria mais adequada na lista |
| **Descrição (SEO)** | Um resumo de 1-2 frases para o Google. Entre 120 e 160 caracteres |
| **Tempo de leitura** | Ex: `5 min de leitura` |
| **Lead** | O parágrafo de introdução em destaque. 2-3 linhas que resumem o artigo |
| **Conteúdo do artigo** | O corpo do artigo. Escreva como num editor de texto normal |

Os campos abaixo são opcionais mas ajudam a completar o artigo:

| Campo | O que escrever |
|---|---|
| **URL da imagem principal** | Cole o link de uma foto da viatura (se aplicável) |
| **Link da imagem** | URL para a página da viatura em circuitocar.pt |
| **Campanha UTM** | Código de tracking. Ex: `blog_suvs` (minúsculas, sem espaços) |
| **Etiqueta da sidebar** | Ex: `Guia prático` ou `Artigo de fundo` |
| **Título da sidebar** | Um curto título para o bloco lateral |
| **Descrição da sidebar** | Breve texto explicativo na coluna lateral |

### 3. Escrever o conteúdo

O editor de conteúdo funciona como um editor de texto simples:

- Use **negrito** para destacar palavras-chave
- Use os botões de cabeçalho (H2, H3) para criar secções
- Use listas com marcadores para enumerar pontos importantes
- Não é necessário escrever código — o editor faz tudo automaticamente

### 4. Publicar o artigo

Quando o artigo estiver pronto:

1. Clique em **"Publish"** no canto superior direito
2. O Decap CMS guarda o ficheiro diretamente no GitHub
3. O GitHub Actions deteta a alteração e reconstrói o site automaticamente
4. **Aguarde 2 a 3 minutos** e o artigo aparece em linha no blog

> ⏱️ O tempo de publicação depende do GitHub. Em horas de ponta pode demorar até 5 minutos.

### 5. Editar um artigo existente

Na lista de artigos, clique no título do artigo que pretende editar. Faça as alterações e clique novamente em **"Publish"**. O processo de rebuild é o mesmo.

---

## Perguntas frequentes

**Posso guardar um rascunho sem publicar?**
Sim. Clique em **"Save"** em vez de "Publish". O artigo fica guardado como rascunho e não aparece no blog até clicar em "Publish".

**O artigo não apareceu após 5 minutos. O que fazer?**
Vá a `github.com/thecreative1/Circuitocar.blog/actions` e verifique se o workflow correu sem erros. Se houver um erro a vermelho, envie uma captura de ecrã ao gestor do site.

**Posso apagar um artigo?**
Sim, dentro do artigo clique no botão de menu e selecione "Delete". O artigo é removido do blog após o próximo rebuild.

**O URL do artigo é definido automaticamente?**
Sim. O URL é gerado a partir do título — por exemplo, um artigo com o título "Quando vale a pena comprar um SUV" terá o URL `/quando-vale-a-pena-comprar-um-suv.html`.
