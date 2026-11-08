# EMDPN-GB - Website de Apoio à Naturalização

Este é o website oficial do **EMDPN-GB** (Escritório de Movimentação de Documentos de Pedido de Naturalização na Guiné-Bissau), reescrito em **React** com **Tailwind CSS**.

## Funcionalidades
- **Portal Informativo**: Detalhes sobre requisitos, processos e serviços de cidadania.
- **Multilingue**: Interface disponível em português, francês, inglês e espanhol; a preferência de idioma é guardada no navegador.
- **Fluxo de Pedido**: Formulário inteligente para iniciar pedidos de naturalização por descendência, casamento ou residência.
- **Design Profissional**: UI institucional baseada em tons de esmeralda e ouro, com animações fluidas.
- **Gestão de Documentos**: Modelos de formulários oficiais para descarga.
- **Integração WhatsApp**: Contacto direto para consultoria.

As transcrições e os modelos de documentos oficiais são apresentados no idioma do documento de origem para preservar a sua fidelidade. Os textos fixos da interface, os controlos e as instruções acompanham o idioma selecionado; publicações inseridas pelos administradores permanecem no idioma em que foram escritas.

## Tecnologias
- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Animações**: Framer Motion
- **Ícones**: Lucide React

## Desenvolvimento
```bash
npm run dev
```

## Build
```bash
npm run build
```

## Publicações e imagens partilhadas

Publicações e imagens do painel são guardadas no Supabase, para que todos os visitantes vejam as mesmas alterações.

1. No projeto Supabase usado pelo site, abra **SQL Editor** e execute o conteúdo de `supabase_schema.sql`.
2. Em **Authentication → Users**, crie a conta do administrador. Não use as antigas credenciais de teste do site.
3. No SQL Editor, atribua a função de administrador à conta criada, substituindo o e-mail:

   ```sql
   UPDATE auth.users
   SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
   WHERE email = 'admin@example.com';
   ```

4. Termine e inicie novamente a sessão no site. A conta deve usar o e-mail e a palavra-passe definidos no Supabase.

O script configura leitura pública das publicações e imagens. Administradores podem gerir publicações; a Secretaria pode criar novas publicações e carregar as respetivas imagens, sem editar ou apagar publicações existentes. As imagens carregadas são guardadas no bucket público `site-images` (máximo de 5 MB). Nunca coloque uma chave `service_role` ou `SUPABASE_SECRET_KEY` no frontend ou nas variáveis `VITE_*`.

Se o site usar outro projeto Supabase, configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas variáveis de ambiente da Vercel e publique novamente.
O `vercel.json` inclui o fallback SPA necessário para que atualizar diretamente páginas como `/contactos`, `/noticias` ou `/admin` não devolva um 404 da Vercel.

### Contador de visitantes, contas e pontos de restauro

Para atualizar um projeto Supabase já configurado, execute novamente `supabase_migration.sql` no SQL Editor. O script é repetível e acrescenta o contador global, os pontos de restauro, preços de serviço partilhados e a gestão de agendamentos. Administradores podem restaurar ou apagar pontos de restauro individuais e personalizar os preços da tabela de serviços; as alterações de preço também são usadas nos novos pedidos. Agendamentos novos começam como `pendente`; contas `admin` e `secretaria` podem alterar somente o estado, e apenas `admin` pode apagar agendamentos. Contas `secretaria` podem publicar novas notícias e carregar imagens, mas não editar/apagar publicações existentes nem aceder à área do desenvolvedor. O acompanhamento público aceita o protocolo ou o telefone registado no pedido e devolve apenas os dados básicos do atendimento. Os dados de requerentes não são incluídos nos pontos de restauro.

Depois, publique a Edge Function `clever-function` que cria contas administrativas:

```bash
supabase functions deploy clever-function
```

A função usa os segredos `SUPABASE_URL`, `SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` do ambiente Supabase; nunca os configure no frontend. Crie inicialmente uma conta no Supabase Auth e atribua-lhe `app_metadata.role = 'admin'` usando o procedimento acima. A partir da área autenticada do administrador, pode criar outras contas (incluindo `admin@emdpn.gw`) e alterar a própria palavra-passe. Cada conta deve ter uma palavra-passe individual com pelo menos 12 caracteres, maiúscula, minúscula, número e símbolo; não existe uma palavra-passe partilhada predefinida.

O contador global pode ser reiniciado no painel administrativo. As publicações e imagens são copiadas automaticamente antes de cada alteração, e os pontos de restauro também podem ser criados ou restaurados no painel. O gestor mostra o uso do bucket `site-images` contra um limite interno de 100 MB, comprime imagens JPG/PNG/WEBP para WEBP antes do envio e oferece a remoção de ficheiros sem referências em publicações, definições e pontos de restauro. Vídeos e outros formatos não são aceites.
