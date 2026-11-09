import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { 
  Download, 
  FileText, 
  FileCheck, 
  Eye, 
  BookOpen, 
  Check, 
  Landmark, 
  ExternalLink,
  Copy,
  CheckCircle2,
  CalendarCheck,
  X,
  Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { getCustomImages, DEFAULT_IMAGES } from '../services/imageService';

export function Downloads() {
  const { t, language } = useLanguage();
  const { showToast, success } = useToast();
  const [activeTab, setActiveTab] = useState<'leitura' | 'imagem' | 'modelos'>('modelos');
  const [copied, setCopied] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<any | null>(null);
  const [customImages, setCustomImages] = useState(getCustomImages());

  React.useEffect(() => {
    const handleUpdate = () => setCustomImages(getCustomImages());
    window.addEventListener('emdpn_images_updated', handleUpdate);
    return () => window.removeEventListener('emdpn_images_updated', handleUpdate);
  }, []);

  // Modelos em ordem estritamente crescente com conteúdo de pré-visualização oficial
  const rawTemplates = [
    {
      step: '01',
      title: 'Requerimento de Cédula Pessoal / Assento de Nascimento',
      filename: 'Cedula_Pessoal_EMDPN-GB.txt',
      url: '/downloads/Cedula_Pessoal_EMDPN-GB.txt',
      size: 'Modelo Oficial (.TXT)',
      tag: '1º Passo Crescente',
      desc: 'Formulário oficial de busca, transcrição e emissão de 1ª via ou certidão narrativa de nascimento na Conservatória dos Registos Centrais.',
      previewContent: `REPÚBLICA DA GUINÉ-BISSAU
MINISTÉRIO DA JUSTIÇA
DIRECÇÃO GERAL DE IDENTIFICAÇÃO CIVIL, DOS REGISTOS E DO NOTARIADO
CONSERVATÓRIA DOS REGISTOS CENTRAIS DE BISSAU

REQUERIMENTO DE EMISSÃO DE CÉDULA PESSOAL / ASSENTO DE NASCIMENTO

Exmo.(a) Senhor(a) Conservador(a) dos Registos Centrais de Bissau,

1. DADOS DO REQUERENTE:
Nome e Apelido completo: __________________________________________________
Filiação (Pai): ___________________________________________________________
Filiação (Mãe): ___________________________________________________________
Naturalidade (Local e País): ________________________________________________
Data de Nascimento: ____ / ____ / ________
Nacionalidade Atual: ______________________________________________________
Morada Atual de Residência: _______________________________________________
Contacto Telefónico / WhatsApp: ___________________________________________
E-mail: __________________________________________________________________

2. OBJETO DO PEDIDO:
O(a) requerente vem, por este meio, solicitar a emissão de:
[  ] 1ª Via de Cédula Pessoal / Assento de Nascimento de Origem
[  ] Transcrição e Atualização de Assento de Nascimento
[  ] Busca de Registo de Nascimento Antigo na Conservatória

3. DOCUMENTOS ANEXOS:
- Cópia do Passaporte ou BI / Cédula Estrangeira
- Declaração de Filiação ou Prova de Residência

Nestes termos,
Pede Deferimento.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Requerente:
__________________________________________________`
    },
    {
      step: '02',
      title: 'Requerimento de Certificado de Registo Criminal',
      filename: 'Registo_Criminal_EMDPN-GB.txt',
      url: '/downloads/Registo_Criminal_EMDPN-GB.txt',
      size: 'Modelo Oficial (.TXT)',
      tag: '2º Passo Crescente',
      desc: 'Modelo de petição para emissão de registo criminal da Guiné-Bissau e comprovação de idoneidade cívica e judicial.',
      previewContent: `REPÚBLICA DA GUINÉ-BISSAU
MINISTÉRIO DA JUSTIÇA
DIRECÇÃO GERAL DE IDENTIFICAÇÃO CIVIL, DOS REGISTOS E DO NOTARIADO
SERVIÇO DE IDENTIFICAÇÃO CRIMINAL E JUDICIAL

REQUERIMENTO DE CERTIFICADO DE REGISTO CRIMINAL

Exmo.(a) Senhor(a) Diretor(a) dos Serviços de Registo Criminal,

1. IDENTIFICAÇÃO DO REQUERENTE:
Nome e Apelido completo: __________________________________________________
Filiação (Pai): ___________________________________________________________
Filiação (Mãe): ___________________________________________________________
Data de Nascimento: ____ / ____ / ________  |  Natural de: ___________________
Bilhete de Identidade / Passaporte nº: _____________________________________
Emitido em: ____ / ____ / ________ por: ____________________________________
Residente em: ___________________________________________________________

2. FINALIDADE DO PEDIDO:
O presente certificado destina-se a instruir processo de:
[  ] Pedido de Nacionalidade / Naturalização na Guiné-Bissau
[  ] Fins Profissionais e Concurso Público
[  ] Apresentação a Entidades Oficiais e Consulares

Declara, sob compromisso de honra, que não se encontra inibido(a) judicialmente nem possui antecedentes penais impeditivos nos termos da lei da Guiné-Bissau.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Requerente:
__________________________________________________`
    },
    {
      step: '03',
      title: 'Ficha de Pedido de Bilhete de Identidade (BI)',
      filename: 'Bilhete_de_Identidade_BI_EMDPN-GB.txt',
      url: '/downloads/Bilhete_de_Identidade_BI_EMDPN-GB.txt',
      size: 'Modelo Oficial (.TXT)',
      tag: '3º Passo Crescente',
      desc: 'Ficha de inscrição de identificação civil guineense para agendamento de recolha de dados e emissão de Bilhete de Identidade.',
      previewContent: `REPÚBLICA DA GUINÉ-BISSAU
DIRECÇÃO-GERAL DE IDENTIFICAÇÃO CIVIL E DOS REGISTOS
ARQUIVO DE IDENTIFICAÇÃO CIVIL DE BISSAU

FICHA DE INSCRIÇÃO PARA EMISSÃO DE BILHETE DE IDENTIDADE (BI)

1. DADOS PESSOAIS:
Nome Completo: __________________________________________________________
Nome do Pai: _____________________________________________________________
Nome da Mãe: ____________________________________________________________
Estado Civil: [  ] Solteiro(a)  [  ] Casado(a)  [  ] Divorciado(a)  [  ] Viúvo(a)
Data de Nascimento: ____ / ____ / ________  |  Sexo: [  ] M  [  ] F
Naturalidade (Freguesia / Setor / País): ____________________________________
Profissão: _______________________________________________________________

2. RESIDÊNCIA E CONTACTOS:
Morada Atual: ____________________________________________________________
Setor / Cidade: ___________________________ País: __________________________
Telefone / WhatsApp: _____________________________________________________

3. DOCUMENTOS APRESENTADOS:
- Cédula Pessoal / Assento de Nascimento nº: ______________ de ____/____/______
- Certificado de Registo Criminal nº: ____________________ de ____/____/______

Termos em que requer a emissão do Bilhete de Identidade da República da Guiné-Bissau.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Requerente:
__________________________________________________`
    },
    {
      step: '04',
      title: 'Termo de Apresentação e Validação de Cópia de Passaporte',
      filename: 'Copia_de_Passaporte_EMDPN-GB.txt',
      url: '/downloads/Copia_de_Passaporte_EMDPN-GB.txt',
      size: 'Modelo Oficial (.TXT)',
      tag: '4º Passo Crescente',
      desc: 'Ficha de conferência, tradução e autenticação notarial de cópia de passaporte internacional, vistos e carimbos de entrada.',
      previewContent: `REPÚBLICA DA GUINÉ-BISSAU
MINISTÉRIO DA JUSTIÇA E DOS NEGÓCIOS ESTRANGEIROS
GABINETE NOTARIAL DE APOIO À CIDADANIA

TERMO DE APRESENTAÇÃO E CONFERÊNCIA DE PASSAPORTE

1. IDENTIFICAÇÃO DO TITULAR:
Nome e Apelido completo: __________________________________________________
Nacionalidade: ___________________________________________________________
Passaporte Internacional nº: ______________________________________________
País Emissor: _____________________ Data de Emissão: ____ / ____ / ________
Data de Validade: ____ / ____ / ________

2. REGISTO DE ENTRADA E VISTOS:
[  ] Visto Consular / Autorização de Residência verificada
[  ] Carimbos de fronteira e entradas conferidos pelo EMDPN-GB

O(A) abaixo assinado(a) apresenta cópia integral do seu passaporte para efeitos de validação no processo de naturalização e emissão de documentação guineense.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Requerente:                        O(A) Oficial Verificador(a):
_______________________                _______________________`
    },
    {
      step: '05',
      title: 'Declaração de Apresentação de Certificado de DNA',
      filename: 'Certificado_de_DNA_EMDPN-GB.txt',
      url: '/downloads/Certificado_de_DNA_EMDPN-GB.txt',
      size: 'Modelo Oficial (.TXT)',
      tag: '5º Passo Crescente',
      desc: 'Termo de submissão de laudo genético de ancestralidade e vinculação biológica para processos de retorno da diáspora africana.',
      previewContent: `REPÚBLICA DA GUINÉ-BISSAU
PROGRAMA NACIONAL DE RETORNO DA DIÁSPORA E CIDADANIA
GABINETE TÉCNICO DE APOIO ANCESTRAL (EMDPN-GB)

DECLARAÇÃO DE SUBMISSÃO DE LAUDO GENÉTICO DE DNA

1. IDENTIFICAÇÃO DO REQUERENTE DA DIÁSPORA:
Nome e Apelido completo: __________________________________________________
País de Residência (Ex: Brasil, França, Portugal, etc.): ___________________________
Passaporte / Documento Estrangeiro nº: ____________________________________

2. DADOS DO EXAME DE ANCESTRALIDADE / DNA:
Laboratório Realizador do Teste Genético: ___________________________________
Percentagem de Linhagem Genética com Raízes na África Ocidental / Guiné-Bissau: ____ %
Código de Identificação do Perfil Genético / Haplogrupo: ______________________

O requerente submete o presente laudo de DNA para atestar a vinculação biológica ancestral com as comunidades originárias da Guiné-Bissau, ao abrigo das diretrizes de facilitação de nacionalidade para os membros da diáspora guineense.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Requerente:                        O(A) Consultor(a) Jurídico(a):
_______________________                _______________________`
    },
    {
      step: '06',
      title: 'Dossiê de Histórico Ancestral e Árvore Genealógica',
      filename: 'Historico_Ancestral_EMDPN-GB.txt',
      url: '/downloads/Historico_Ancestral_EMDPN-GB.txt',
      size: 'Modelo Oficial (.TXT)',
      tag: '6º Passo Crescente',
      desc: 'Formulário completo de linhagem familiar, comprovação de ascendência guineense e fundamentação do pedido de nacionalidade.',
      previewContent: `REPÚBLICA DA GUINÉ-BISSAU
MINISTÉRIO DA JUSTIÇA
DIRECÇÃO GERAL DE REGISTOS E DO NOTARIADO

DOSSIÊ DE HISTÓRICO ANCESTRAL E LINHAGEM FAMILIAR

1. DADOS DO SOLICITANTE:
Nome e Apelido completo: __________________________________________________
Local e País de Nascimento: _______________________________________________

2. LINHAGEM ANCESTRAL (ASCENDÊNCIA GUINEENSE):
Nome do Pai (ou Avô/Avó originário(a) da Guiné-Bissau): ________________________
Natural de (Região / Setor na Guiné-Bissau): _________________________________
Época aproximada de emigração / partida da Guiné-Bissau: ____________________

3. FUNDAMENTAÇÃO DO PEDIDO:
O(A) requerente fundamenta o seu direito à nacionalidade guineense por origem e sangue (Jus Sanguinis), juntando testemunhos, documentos de registo paroquial ou civil antigos e laudos de ancestralidade.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Requerente:
__________________________________________________`
    },
    {
      step: '07',
      title: 'Formulário Oficial de Pedido de Naturalização',
      filename: 'Formulario_de_Pedido_EMDPN-GB.docx',
      url: '/downloads/Formulario_de_Pedido_EMDPN-GB.docx',
      size: 'Microsoft Word (.docx)',
      tag: 'Processo Geral',
      desc: 'Formulário completo de identificação e requerimento do processo junto das autoridades guineenses.',
      previewContent: `[MODELO OFICIAL EM FORMATO MICROSOFT WORD - .DOCX]

REPÚBLICA DA GUINÉ-BISSAU
MINISTÉRIO DA JUSTIÇA
DIRECÇÃO GERAL DE REGISTOS E DO NOTARIADO

FORMULÁRIO OFICIAL DE PEDIDO DE CONCESSÃO DE NACIONALIDADE / NATURALIZAÇÃO

1. IDENTIFICAÇÃO COMPLETA:
- Nome e Apelido completo: ________________________________________________
- Filiação: _______________________________________________________________
- Data e Local de Nascimento: _____________________________________________
- Nacionalidade de Origem: ________________________________________________
- Estado Civil: __________________ Profissão: ______________________________
- Morada e Contacto: _____________________________________________________

2. MOTIVO DO PEDIDO DE NACIONALIDADE:
[  ] Vinculação Ancestral / Retorno da Diáspora
[  ] Residência Legal Prolongada na Guiné-Bissau
[  ] Casamento com Cidadão(ã) Guineense
[  ] Prestação de Serviços Relevantes ao Estado da Guiné-Bissau

3. DECLARAÇÃO DE CONFORMIDADE COM AS TAXAS OFICIAIS DO COFRE DA JUSTIÇA:
Declaro conhecer e aceitar os emolumentos oficiais fixados para o processo, efetuando o pagamento através dos canais autorizados do Estado.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Requerente:
__________________________________________________`
    },
    {
      step: '08',
      title: 'Modelo de Carta de Petição ao Ministério da Justiça',
      filename: 'Modelo_de_Carta_de_Peticao_EMDPN-GB.docx',
      url: '/downloads/Modelo_de_Carta_de_Peticao_EMDPN-GB.docx',
      size: 'Microsoft Word (.docx)',
      tag: 'Petição Formal',
      desc: 'Petição formal com fundamentação jurídica ao Excelentíssimo Senhor Ministro da Justiça.',
      previewContent: `[MODELO DE PETIÇÃO JURÍDICA - .DOCX]

EXCELENTÍSSIMO SENHOR MINISTRO DA JUSTIÇA DA REPÚBLICA DA GUINÉ-BISSAU
EXCELENTÍSSIMO(A) SENHOR(A) CONSERVADOR(A)-GERAL DOS REGISTOS

REQUERENTE: [Nome e Apelido completo], portador(a) do Passaporte nº [número], residente em [País/Cidade], com domicílio escolhido no Escritório de Movimentação de Documentos (EMDPN-GB), em Safim, Guiné-Bissau.

Vem, muito respeitosamente, expor e requerer o seguinte:

1. O(A) requerente é descendente de cidadãos guineenses / requer a naturalização com base no enquadramento legal vigente na República da Guiné-Bissau.
2. Instruiu o seu processo com todos os documentos exigidos pela Conservatória dos Registos Centrais e Cofre Geral da Justiça.

Nestes termos,
Pede e espera deferimento.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Mandatário(a) / Requerente:
__________________________________________________`
    },
    {
      step: '09',
      title: 'Modelo de Procuração Forense e Administrativa',
      filename: 'Modelo_de_Procuracao_EMDPN-GB.docx',
      url: '/downloads/Modelo_de_Procuracao_EMDPN-GB.docx',
      size: 'Microsoft Word (.docx)',
      tag: 'Representação Legal',
      desc: 'Instrumento de representação legal para que a nossa equipa em Bissau possa tramitar o seu dossiê.',
      previewContent: `[MODELO DE INSTRUMENTO DE PROCURAÇÃO - .DOCX]

OUTORGANTE (CLIENTE):
Nome e Apelido completo: __________________________________________________
Nacionalidade: ___________________ Passaporte nº: _________________________
Residente em: ___________________________________________________________

OUTORGADO (MANDATÁRIO / EQUIPA EMDPN-GB):
Equipa Técnica Jurídica do Escritório de Movimentação de Documentos e Cidadania (EMDPN-GB), com sede em Safim Centro / Reino, Guiné-Bissau.

PODERES:
Por este instrumento particular de procuração, o(a) outorgante nomeia e constitui o outorgado seu bastante procurador para, junto dos Ministérios, Conservatórias de Registos Centrais, Cartórios Notariais, Direção de Migração e Fronteiras e Câmaras Municipais da República da Guiné-Bissau, requerer, assinar, acompanhar, dar e receber papéis, certidões, assentos de nascimento, bilhetes de identidade, passaportes e praticar todos os atos necessários à conclusão do processo de naturalização e nacionalidade.

Safim / Bissau, ____ de ________________ de 202____.

O(A) Outorgante (Assinatura Reconhecida):
__________________________________________________`
    }
  ];

  const dl = t.downloads;

  // Mesclar dados com traduções oficiais do idioma ativo
  const officialTemplates = rawTemplates.map((raw, idx) => {
    const loc = dl.templates?.[idx];
    return {
      step: loc?.step || raw.step,
      title: loc?.title || raw.title,
      tag: loc?.tag || raw.tag,
      size: loc?.size || raw.size,
      desc: loc?.desc || raw.desc,
      filename: raw.filename,
      url: raw.url,
      previewContent: raw.previewContent
    };
  });

  const handleCopyTranscription = () => {
    const text = document.getElementById('official-transcription')?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      success(dl.copiedToast || 'Transcrição copiada para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyPreview = () => {
    if (previewTemplate && previewTemplate.previewContent) {
      navigator.clipboard.writeText(previewTemplate.previewContent);
      success(dl.copiedToast || 'Conteúdo do modelo copiado para a área de transferência!');
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <PageHeader 
        title={dl.title} 
        subtitle={dl.subtitle} 
      />

      <div className="max-w-[1160px] mx-auto px-7 pt-10">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('leitura')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              activeTab === 'leitura'
                ? 'bg-primary-900 text-white shadow-md'
                : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            <BookOpen size={18} /> {dl.tabReading}
          </button>
          <button
            onClick={() => setActiveTab('imagem')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              activeTab === 'imagem'
                ? 'bg-primary-900 text-white shadow-md'
                : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            <Eye size={18} /> {dl.tabOriginalDoc}
          </button>
          <button
            onClick={() => setActiveTab('modelos')}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              activeTab === 'modelos'
                ? 'bg-primary-900 text-white shadow-md'
                : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
            }`}
          >
            <Download size={18} /> {dl.tabTemplates}
          </button>
        </div>

        {/* Tab 1: Full Reading Mode */}
        {activeTab === 'leitura' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                {dl.transcriptionBadge}
              </span>
              <button
                onClick={handleCopyTranscription}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-700 bg-white border border-neutral-300 hover:bg-neutral-50 px-3 py-1.5 rounded-lg shadow-sm"
              >
                {copied ? <CheckCircle2 size={14} className="text-success-600" /> : <Copy size={14} />}
                {copied ? dl.copiedToast : dl.btnCopyFull}
              </button>
            </div>

            <div 
              id="official-transcription"
              className="bg-white p-8 sm:p-12 rounded-2xl border border-neutral-300 shadow-xl font-serif text-neutral-900 leading-relaxed text-sm sm:text-base relative"
            >
              <p className="mb-5 text-xs font-sans text-neutral-600">{dl.transcription.transcriptionDisclaimer}</p>
              {/* Official Header */}
              <div className="text-center border-b-2 border-neutral-900/10 pb-6 mb-8">
                <div className="flex justify-between items-start text-xs font-sans text-neutral-500 mb-2">
                  <span>{dl.transcription.account} <strong>126999010444</strong></span>
                  <span>{dl.transcription.treasury}</span>
                </div>
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-3 flex-wrap">
                  <span className="font-serif italic font-bold text-base sm:text-2xl tracking-wide text-primary-950">
                    {t.hero.republicPrefix}
                  </span>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center drop-shadow-md bg-transparent">
                    <img 
                      src="/assets/aistudio/Emblema_Her_ldico_da_Luta_e_Progresso_f5f56753.png" 
                      alt={dl.transcription.emblemAlt}
                      className="w-full h-full object-contain filter drop-shadow"
                    />
                  </div>
                  <span className="font-serif italic font-bold text-base sm:text-2xl tracking-wide text-primary-950">
                    {t.hero.republicSuffix}
                  </span>
                </div>
                <h5 className="font-sans font-bold uppercase text-xs tracking-wider text-neutral-700">{dl.transcription.ministry}</h5>
                <p className="font-sans text-xs text-neutral-600 font-semibold mt-1">
                  {dl.transcription.directorate}
                </p>
                <p className="font-sans text-xs text-neutral-500 font-medium italic">
                  {dl.transcription.registry}
                </p>
              </div>

              {/* Part 1: Naturalizacao */}
              <div className="mb-10 font-sans">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-primary-900 pb-2 mb-4">
                  <h4 className="text-base sm:text-lg font-black text-primary-950 uppercase tracking-tight">
                    {dl.transcription.naturalization}
                  </h4>
                  <span className="bg-accent-100 text-accent-950 px-3 py-1 rounded-md font-mono font-extrabold text-sm border border-accent-300">
                    770.482 FCFA
                  </span>
                </div>

                <h5 className="text-xs font-black uppercase tracking-wider text-primary-800 mb-2">{dl.transcription.requiredDocuments}</h5>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-800 mb-4">
                  {dl.transcription.naturalizationOrigin.map((document: string) => <li key={document}>{document}</li>)}
                </ul>

                <div className="bg-neutral-50 p-3.5 rounded-lg border-l-4 border-accent-500 text-xs sm:text-sm text-neutral-700 italic mb-4">
                  {dl.transcription.naturalizationMarriageNote}
                </div>

                <h6 className="text-xs font-black uppercase tracking-wider text-neutral-700 mb-2">{dl.transcription.residenceCountry}</h6>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-800">
                  {dl.transcription.naturalizationResidence.map((document: string) => <li key={document}>{document}</li>)}
                </ul>
              </div>

              {/* Part 2: Casamento */}
              <div className="font-sans pt-6 border-t border-neutral-200">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-success-800 pb-2 mb-4">
                  <h4 className="text-base sm:text-lg font-black text-primary-950 uppercase tracking-tight">
                    {dl.transcription.marriage}
                  </h4>
                  <span className="bg-success-100 text-success-950 px-3 py-1 rounded-md font-mono font-extrabold text-sm border border-success-300">
                    155.097 FCFA
                  </span>
                </div>

                <h5 className="text-xs font-black uppercase tracking-wider text-success-900 mb-2">{dl.transcription.requiredDocuments}</h5>

                <h6 className="text-xs font-black uppercase tracking-wider text-neutral-700 mb-1">{dl.transcription.originCountry}</h6>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-800 mb-4">
                  {dl.transcription.marriageOrigin.map((document: string) => <li key={document}>{document}</li>)}
                </ul>

                <h6 className="text-xs font-black uppercase tracking-wider text-neutral-700 mb-1">{dl.transcription.residenceCountry}</h6>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-800 mb-4">
                  {dl.transcription.marriageResidence.map((document: string) => <li key={document}>{document}</li>)}
                </ul>

                <div className="bg-neutral-50 p-3.5 rounded-lg border-l-4 border-success-600 text-xs sm:text-sm text-neutral-700 italic">
                  {dl.transcription.marriageNote}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 text-center font-sans">
                <Link to="/agendamento" className="btn btn-primary px-8 py-3.5 text-sm">
                  <CalendarCheck size={18} /> {dl.transcription.scheduleDelivery}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Original Image Viewer */}
        {activeTab === 'imagem' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-neutral-300 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-primary-950 text-base">{dl.originalDocTitle}</h4>
                  <p className="text-neutral-500 text-xs">{dl.originalDocSubtitle}</p>
                </div>
                <a 
                  href="/assets/aistudio/WhatsApp_Image_2026-10-21_at_09.03.22_4befee8f.jpeg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline text-neutral-900 border-neutral-300 hover:bg-neutral-100 text-xs py-2 px-3.5"
                >
                  <ExternalLink size={14} /> {dl.btnOpenHD}
                </a>
              </div>

              <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-900 flex items-center justify-center">
                <img 
                  src="/assets/aistudio/WhatsApp_Image_2026-10-21_at_09.03.22_4befee8f.jpeg" 
                  alt={dl.transcription.originalDocumentAlt}
                  className="w-full max-h-[750px] object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="mt-4 p-4 bg-primary-50 rounded-xl text-xs text-primary-900 flex items-start gap-2.5">
                <FileCheck size={18} className="text-primary-700 shrink-0 mt-0.5" />
                <span>
                  <strong>{dl.notePrefix}</strong> {dl.noteContent}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Download Models in Ascending Order with Preview Option */}
        {activeTab === 'modelos' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-accent-700 font-extrabold text-xs tracking-widest uppercase block mb-1">
                {dl.seqBadge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary-950">
                {dl.seqTitle}
              </h3>
              <p className="text-neutral-500 text-sm mt-1 max-w-2xl mx-auto">
                {dl.seqSubtitle}
              </p>
            </div>

            <div className="grid gap-5">
              {officialTemplates.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:shadow-md hover:border-primary-300 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-13 h-13 rounded-xl bg-primary-100/70 text-primary-800 font-mono font-black text-lg flex items-center justify-center shrink-0 border border-primary-200">
                      {item.step}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-accent-700 bg-accent-100 px-2.5 py-0.5 rounded uppercase tracking-wider">
                          {item.tag}
                        </span>
                        <span className="text-[11px] font-semibold text-neutral-400">
                          {item.size}
                        </span>
                      </div>
                      <h4 className="font-bold text-primary-950 text-base mb-1">{item.title}</h4>
                      <p className="text-neutral-500 text-xs leading-relaxed max-w-xl">{item.desc}</p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2.5 w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => setPreviewTemplate(item)}
                      className="btn btn-outline border-neutral-300 text-neutral-800 hover:bg-neutral-100 py-2.5 px-4 text-xs whitespace-nowrap w-full justify-center shadow-xs"
                    >
                      <Eye size={15} /> {dl.btnPreview}
                    </button>
                    <a 
                      href={item.url}
                      download={item.filename}
                      onClick={() => success(dl.downloadSuccessToast || `Modelo descarregado!`)}
                      className="btn btn-institutional py-2.5 px-4 text-xs whitespace-nowrap w-full justify-center shadow-xs"
                    >
                      <Download size={15} /> {dl.btnDownload}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white p-8 rounded-2xl border border-neutral-200 text-center shadow-sm">
              <h4 className="font-bold text-primary-950 text-lg mb-2">{dl.helpTitle}</h4>
              <p className="text-neutral-500 text-sm max-w-xl mx-auto mb-6">
                {dl.helpDesc}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/agendamento" className="btn btn-primary text-sm py-3 px-6">
                  {dl.btnAssisted}
                </Link>
                <a href="https://wa.me/245957000555" className="btn btn-whatsapp text-sm py-3 px-6">
                  {dl.btnWhatsApp}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal for Official Templates */}
      {previewTemplate && (
        <div 
          className="fixed inset-0 z-[250] bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-primary-950 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-500 text-neutral-950 font-mono font-bold flex items-center justify-center text-sm">
                  {previewTemplate.step}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-accent-400 uppercase tracking-widest">
                    {previewTemplate.tag} · {previewTemplate.size}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                    {previewTemplate.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label={dl.modalClose}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body - Document Text Preview */}
            <p className="px-6 sm:px-8 pt-4 bg-neutral-50/70 text-xs text-neutral-600">
              {dl.transcription.templatePreviewDisclaimer}
            </p>
            <div className="p-6 sm:p-8 overflow-y-auto bg-neutral-50/70 flex-1 font-mono text-xs sm:text-sm text-neutral-900 leading-relaxed whitespace-pre-wrap select-text border-y border-neutral-200">
              {previewTemplate.previewContent}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPreview}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl font-bold text-xs transition-colors"
                >
                  <Copy size={15} /> {dl.btnCopyText}
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-neutral-600 hover:bg-neutral-100 transition-colors"
                >
                  {dl.modalClose}
                </button>
                <a
                  href={previewTemplate.url}
                  download={previewTemplate.filename}
                  onClick={() => {
                    success(dl.downloadSuccessToast || `Modelo de ${previewTemplate.title} descarregado!`);
                    setPreviewTemplate(null);
                  }}
                  className="btn btn-primary py-2.5 px-5 text-xs inline-flex items-center gap-1.5 shadow-md"
                >
                  <Download size={15} /> {dl.btnDownloadFile} ({previewTemplate.filename})
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
