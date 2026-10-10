SAFETY - CONTROLE DE EQUIPAMENTOS
V1 DEFINITIVA — pacote consolidado após homologação
Data do pacote: 10/10/2026

OBJETIVO
Aplicativo web/PWA para substituir progressivamente os controles manuais da Safety Equipamentos em:
- solicitações de locação;
- clientes;
- equipamentos próprios;
- locações;
- assistência técnica particular e garantia;
- empréstimos e substituições;
- testes técnicos;
- cobranças;
- documentos e assinaturas eletrônicas;
- usuários, permissões e auditoria.

ARQUIVOS PRINCIPAIS
- index.html
- styles.css
- app.js
- firebase-config.js
- firestore.rules
- manifest.webmanifest
- sw.js
- assets/

PASSOS PARA PUBLICAÇÃO
1. Faça uma cópia do repositório/versão atualmente publicada antes de substituir os arquivos.
2. Substitua os arquivos do GitHub Pages pelos arquivos deste pacote.
3. No Firebase Console > Firestore Database > Rules, substitua as regras atuais pelo conteúdo de firestore.rules e publique.
4. Abra o aplicativo com o usuário administrativo já existente.
5. Vá em Usuários e complete Matrícula e Função do usuário administrador e dos demais usuários.
6. ANTES DE CADASTRAR DADOS REAIS, vá em Configurações > Dados de homologação e execute “Arquivar dados atuais de teste”. A ação exige a frase ARQUIVAR TESTES e não exclui os registros.
7. Confirme que Dashboard, listas e disponibilidade ficaram sem os dados de homologação.
8. Configure o webhook de aviso externo em Configurações > Notificação de nova solicitação, caso já possua um endpoint HTTPS (Apps Script, Power Automate ou serviço equivalente).
9. Cadastre a base real manualmente, registro por registro, conforme decisão de implantação.
10. Após a carga e conferência, altere Configurações > Status da base para Base operacional.

PERFIS
ADMINISTRATIVO
- acesso completo;
- visualiza Locações, Cobranças, Auditoria, Usuários e Configurações;
- publica versões de modelos de documentos;
- vê indicadores financeiros.

TÉCNICO / OPERACIONAL
- Dashboard somente operacional;
- Clientes necessários à assistência;
- Equipamentos;
- Assistência Técnica;
- Documentos técnicos não financeiros;
- não visualiza Locações, Cobranças, Auditoria, Usuários, Configurações nem indicadores financeiros.

IMPORTANTE: as restrições também estão nas regras Firestore; não dependem apenas de ocultar menus.

PROTOCOLOS
Processos ganham identificação legível:
- LOC-AAAA-000001 para locações;
- AT-AAAA-000001 para assistências;
- DOC-AAAA-000001 para documentos.
O número de série continua sendo o identificador operacional do equipamento físico.

DADOS DE HOMOLOGAÇÃO
Os dados criados nos testes não são apagados.
Ao arquivar, recebem origem=homologacao_v1, arquivado=true e ativo=false.
Eles deixam de aparecer na operação normal e podem ser reativados futuramente em ambiente de testes/V2.
Categorias, fabricantes, configurações e usuários não são arquivados automaticamente pelo comando, para evitar perda da estrutura do sistema.

CLIENTES
- cadastro completo para locações;
- cadastro rápido/avulso para assistência (nome + telefone obrigatórios);
- cliente rápido pode ser completado posteriormente;
- CPF/CNPJ duplicado é bloqueado no cadastro completo;
- telefone repetido em cliente rápido gera aviso.

EQUIPAMENTOS
- identificação por número de série;
- formato de exibição padronizado: Categoria · Modelo · Fabricante · Série · Tensão;
- seletores possuem busca;
- status de compromisso (Reservado/Alugado/Emprestado) é controlado pelo fluxo operacional;
- devolução não libera diretamente: vai para Aguardando teste.

TESTES TÉCNICOS
O salvamento foi refeito para gravar teste e atualização do equipamento em lote.
Registra técnico, matrícula, função, situação anterior e posterior.
Equipamento com compromisso ativo não pode ser liberado por um teste isolado.

LOCAÇÕES
- múltiplos equipamentos na mesma negociação quando as condições forem iguais;
- equipamentos com períodos/condições diferentes devem ficar em locações separadas;
- conflito de agenda e disponibilidade são verificados;
- cancelamento de reserva libera o equipamento;
- devolução de locação ativa coloca equipamento em Aguardando teste;
- prorrogação cria movimentação;
- alteração de responsável preserva o contrato e cria histórico/aditivo, sem abrir outra locação para o mesmo CPF/CNPJ;
- substituição não força assinatura imediatamente.

COBRANÇAS
Campos separados:
- Valor da locação (contratual);
- Valor atualizado do boleto (opcional);
- Valor pago.
Classificação automática:
- A vencer;
- Pago antes do vencimento;
- Pago no vencimento;
- Pago após vencimento;
- Inadimplente.
Integração automática com Itaú permanece para V2.

ASSISTÊNCIA TÉCNICA
- protocolo AT;
- cliente completo ou rápido;
- histórico permanente por número de série;
- campos obrigatórios marcados com *;
- comprovante de entrada;
- particular e garantia;
- garantia registra NF, fabricante, contato, protocolo, data e autorização;
- garantia não avança para execução sem autorização registrada;
- empréstimo de equipamento Safety e retorno para Aguardando teste.

MODELOS DE DOCUMENTOS
Módulo administrativo versionado.
Status:
- Rascunho;
- Ativo;
- Arquivado.
Uma versão ativa/arquivada não deve ser editada: crie nova versão.
Contratos/documentos já emitidos continuam vinculados à versão original.
O modelo inicial do Contrato de Locação contém a redação revisada durante o projeto, mas a Safety pretende submetê-la à revisão final de advogado brasileiro regularmente inscrito na OAB. O advogado poderá criar/publicar nova versão sem alteração de código.

ASSINATURAS E PDFs
- assinatura continua armazenada em formato vetorial no Firestore;
- para geração do PDF, os traços são renderizados localmente em imagem temporária, sem armazenar a imagem;
- correção destinada a uniformizar assinatura em PDF no celular e computador;
- técnico é identificado por Nome, Matrícula e Função;
- documentos podem ser gerados sem assinatura quando o fluxo permitir;
- documentos com assinatura obrigatória permanecem em Pendências até concluir as assinaturas;
- PDF não é armazenado no Firebase.

DOCUMENTOS
Abas:
- Pendências: apenas documentos que ainda precisam de assinatura;
- Histórico: documentos assinados/preparados/emitidos.
Busca por protocolo, data, cliente, série, técnico, tipo e status.

EXPORTAÇÃO
A V1 possui exportação CSV administrativa somente leitura para conferência/contingência.
A importação em massa foi retirada do fluxo operacional da V1. A base real será cadastrada manualmente.

CONECTIVIDADE
A V1 é oficialmente online.
Operações de gravação são bloqueadas quando navigator.onLine indica ausência de conexão.
Não há sincronização offline complexa nesta versão.

NOTIFICAÇÃO EXTERNA
O aplicativo suporta webhook HTTPS configurável sem alteração de código.
O endpoint externo propriamente dito não faz parte deste pacote e precisa ser fornecido/configurado (Apps Script, Power Automate ou serviço equivalente).
A solicitação continua sendo gravada no Firestore mesmo que o webhook externo falhe.

SEGURANÇA ANTES DA PRODUÇÃO
- publique firestore.rules deste pacote;
- mantenha somente APIs necessárias na chave Web;
- restrinja a chave aos domínios reais do aplicativo após homologação final;
- confirme que usuário Técnico não consegue acessar Locações/Cobranças/Auditoria mesmo tentando URLs/console;
- depois de confirmar que a nova chave é a utilizada, desative credenciais antigas não usadas.

FORA DA V1 / V2
- integração automática com Itaú;
- Cloud Storage para fotos/anexos;
- armazenamento de PDFs;
- provedor externo avançado de assinatura;
- estoque completo de peças;
- métricas avançadas de rentabilidade;
- outras automações e integrações.

HOMOLOGAÇÃO RECOMENDADA APÓS PUBLICAÇÃO
Cenário Locação:
Solicitação > Cliente > Equipamento > Reserva > Locação > Documento > Assinaturas > Cobrança > Pagamento > Prorrogação/Substituição > Devolução > Teste > Disponível.

Cenário Assistência:
Cliente rápido > Entrada > Comprovante > Diagnóstico > Orçamento > Aprovação/garantia > Empréstimo > Manutenção > Teste > Liberação > Entrega > Histórico por série.

NÃO APAGUE A VERSÃO ANTERIOR ATÉ CONCLUIR A HOMOLOGAÇÃO DA V1 DEFINITIVA.
