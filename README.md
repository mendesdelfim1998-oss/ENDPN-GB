# EMDPN-GB - Website de Apoio à Naturalização

Este é o website oficial do **EMDPN-GB** (Escritório de Movimentação de Documentos de Pedido de Naturalização na Guiné-Bissau), reescrito em **React** com **Tailwind CSS**.

## Funcionalidades
- **Portal Informativo**: Detalhes sobre requisitos, processos e serviços de cidadania.
- **Fluxo de Pedido**: Formulário inteligente para iniciar pedidos de naturalização por descendência, casamento ou residência.
- **Design Profissional**: UI institucional baseada em tons de esmeralda e ouro, com animações fluidas.
- **Gestão de Documentos**: Modelos de formulários oficiais para descarga.
- **Integração WhatsApp**: Contacto direto para consultoria.

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

O script configura leitura pública das publicações e imagens e permite alterações apenas a contas autenticadas com `app_metadata.role = 'admin'`. As imagens carregadas são guardadas no bucket público `site-images` (máximo de 5 MB). Nunca coloque uma chave `service_role` ou `SUPABASE_SECRET_KEY` no frontend ou nas variáveis `VITE_*`.

Se o site usar outro projeto Supabase, configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` nas variáveis de ambiente da Vercel e publique novamente.
