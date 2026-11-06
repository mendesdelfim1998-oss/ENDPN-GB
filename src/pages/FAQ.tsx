import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function FAQ() {
  const { t, language } = useLanguage();

  const faqs = language === 'fr' ? [
    {
      q: "1. L’EMDPN-GB est-il un organisme d’État ?",
      a: "Non. L’EMDPN-GB est un cabinet de conseil juridique et de facilitation documentaire. Il intervient comme Partenaire d’État pour accélérer vos formalités auprès du Ministère de la Justice et des Conservatoires compétents."
    },
    {
      q: "2. Comment fonctionne la prise de rendez-vous pour visa de voyage / démarches auprès des ambassades ?",
      a: "La prise de rendez-vous pour visa de voyage / démarches auprès des ambassades est un service prioritaire destiné à qui possède un voyage urgent ou un vol confirmé. Le cabinet accélère l'obtention en urgence de l'extrait d'acte de naissance, de la carte d'identité et du passeport."
    },
    {
      q: "3. Quels sont les documents traités par le cabinet ?",
      a: "Nous assurons la constitution complète : extrait d’acte de naissance (cédula), casier judiciaire, carte d’identité nationale (BI), copie de passeport, certificat ADN et historique généalogique, ainsi que l’instruction de naturalisation."
    },
    {
      q: "4. Comment s’effectue le règlement des taxes légales ?",
      a: "Le demandeur s’acquitte de la taxe officielle fixée par le Trésor Public de la Justice (Cofre da Justiça) et des honoraires du cabinet. Un reçu officiel de l’État est remis pour chaque paiement souverain."
    },
    {
      q: "5. Les membres de la diaspora doivent-ils se déplacer à Bissau ?",
      a: "Pour le dépôt et l’instruction du dossier, non. Nous intervenons sous mandat de représentation. Votre présence physique n’est requise que pour la prise d’empreintes biométriques (BI et Passeport)."
    },
    {
      q: "6. Quel est le délai moyen de délivrance ?",
      a: "Le délai se situe entre 1 et 12 mois selon le type de demande, les vérifications d’état civil et le calendrier des ministères régaliens."
    },
    {
      q: "7. Comment initier ma démarche dès aujourd’hui ?",
      a: "Il vous suffit de nous envoyer les photos de vos pièces d’identité sur WhatsApp (+245 957000555) ou de réserver une consultation sur notre portail en ligne."
    }
  ] : language === 'en' ? [
    {
      q: "1. Is EMDPN-GB a government state agency?",
      a: "No. EMDPN-GB is a specialized legal facilitation and civil documentation bureau. We operate as an official State Partner facilitating and expediting procedures with the Ministry of Justice and central registry directorates."
    },
    {
      q: "2. How does the Travel Visa Appointment Booking / embassy consultation work?",
      a: "The Travel Visa Appointment Booking / embassy consultation is an expedited priority service for applicants with urgent travel deadlines or booked flights. Our bureau facilitates the urgent acquisition of birth certificates, national identity cards, and biometric passports."
    },
    {
      q: "3. What types of records does the bureau process?",
      a: "We process primary birth records (cédula pessoal), criminal clearance certificates, national identity cards (BI), verified passport copies, ancestral DNA affidavits, and full nationality files."
    },
    {
      q: "4. How are statutory fees paid?",
      a: "Applicants pay statutory court fees directly into the sovereign General Justice Treasury (Cofre Geral da Justiça) alongside bureau service fees. Official government receipts are provided for all treasury disbursements."
    },
    {
      q: "5. Do diaspora applicants have to travel to Bissau immediately?",
      a: "No. File preparation, translation, submission, and initial processing can be carried out through statutory power of attorney. Physical presence is only required for biometric capture upon ID card and passport issuance."
    },
    {
      q: "6. What is the statutory processing timeline?",
      a: "Timelines range between 1 to 12 months, depending on the applicant's origin category, archive searches, and sovereign gazette publication cycles."
    },
    {
      q: "7. How do I initiate my file?",
      a: "Simply send copies of your documents via our official WhatsApp (+245 957000555) or schedule a consultation through our online appointment portal."
    }
  ] : language === 'es' ? [
    {
      q: "1. ¿Es el EMDPN-GB un organismo del Estado?",
      a: "No. El EMDPN-GB es un gabinete especializado de consultoría y gestión documental. Actúa como Socio de Estado para agilizar trámites ante el Ministerio de Justicia y la Dirección General competente."
    },
    {
      q: "2. ¿Cómo funciona la cita para solicitud de visado de viaje / consulta en embajadas?",
      a: "La cita para solicitud de visado de viaje / consulta en embajadas es un servicio prioritario destinado a quien posee viaje urgente o vuelo confirmado. El despacho agiliza la obtención urgente de partida de nacimiento, carnet de identidad y pasaporte."
    },
    {
      q: "3. ¿Qué documentos tramita el gabinete?",
      a: "Organizamos cédula personal de nacimiento, antecedentes penales, carnet de identidad (BI), copia de pasaporte, certificados de ADN y genealogía ancestral, además de la naturalización completa."
    },
    {
      q: "4. ¿Cómo se pagan las tasas oficiales?",
      a: "El solicitante abona la tasa oficial fijada por el Tesoro General de Justicia y los honorarios del despacho. Se entrega el comprobante oficial de cada tasa abonada al Estado."
    },
    {
      q: "5. ¿Debe la Diáspora viajar a Bissau para iniciar?",
      a: "Para la preparación y radicación del expediente, no. Actuamos mediante poder notarial. La presencia física solo se requiere para la toma biométrica del carnet de identidad y pasaporte."
    },
    {
      q: "6. ¿Cuál es el tiempo promedio del trámite?",
      a: "El plazo varía entre 1 y 12 meses, dependiendo de los certificados de origen y los tiempos de tramitación ministerial en Bissau."
    },
    {
      q: "7. ¿Cómo puedo comenzar mi expediente hoy?",
      a: "Envíe fotos de sus documentos por WhatsApp (+245 957000555) o agende una consulta en nuestro portal oficial en línea."
    }
  ] : [
    {
      q: "1. O EMDPN-GB é um órgão do Estado?",
      a: "Não. O EMDPN-GB é um escritório de consultoria e movimentação documental. Atua como Parceiro de Estado e facilitador legal para agilizar os processos junto de Ministérios e Direções competentes."
    },
    {
      q: "2. Como funciona o Agendamento de pedido de visto de Viagem por consulta nas embaixadas?",
      a: "O Agendamento de pedido de visto de Viagem por consulta nas embaixadas é um serviço prioritário destinado a quem possui viagem urgente ou voo marcado. O escritório agiliza a obtenção urgente de certidão de nascimento, bilhete de identidade e passaporte."
    },
    {
      q: "3. Quais os documentos e processos que o escritório pode tratar?",
      a: "Trata da organização de cédula pessoal, registo criminal, bilhete de identidade (BI), passaporte, certificado de DNA e histórico ancestral, certidão de nascimento / segunda via de certidão de bilhete de identidade (BI), certidão de casamento, certidão de óbito, transcrição de nascimento, transcrição de casamento, transcrição de óbito, capacidade matrimonial, certidão negativa de casamento, certificado de nacionalidade, cópia de livro, processo de alteração de nome, processo de nacionalidade por casamento, processo de nacionalidade por naturalização, ratificação de nome, além do processo completo de nacionalidade e naturalização."
    },
    {
      q: "4. Como é feito o pagamento das taxas?",
      a: "O requerente paga a taxa oficial do Cofre Geral da Justiça (conforme tabela legal do Estado) e o honorário de serviço do escritório. É emitido comprovativo de todo o pagamento feito ao Estado e do escritório."
    },
    {
      q: "5. A Diáspora precisa de viajar para Bissau?",
      a: "Para a fase de submissão e acompanhamento do dossiê, não. O escritório pode tratar do processo mediante procuração. A presença física é exigida apenas no momento da recolha biométrica para o BI e o Passaporte."
    },
    {
      q: "6. Qual é o tempo de espera para a conclusão do processo?",
      a: "O tempo de espera situa-se entre 1 a 12 meses. A duração depende do andamento das certidões e dos despachos do Estado e da Conservatória dos Registos Centrais de Bissau."
    },
    {
      q: "7. Como posso iniciar o meu processo?",
      a: "O primeiro passo é enviar foto do documento pelo WhatsApp ou agendar no portal. É realizada uma triagem com indicação dos passos seguintes."
    }
  ];

  return (
    <div className="bg-neutral-50 min-h-screen">
      <PageHeader 
        title={t.faq.title} 
        subtitle={t.faq.subtitle} 
      />
      
      <section className="py-20">
        <div className="max-w-[860px] mx-auto px-7">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <details className="group bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
                  <summary className="list-none cursor-pointer p-6 font-bold text-primary-900 text-lg flex items-center justify-between select-none">
                    <span className="pr-4">{faq.q}</span>
                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center transition-transform group-open:rotate-180 group-open:bg-accent-100">
                      <ChevronDown size={18} className="text-primary-700" strokeWidth={3} />
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-neutral-600 leading-relaxed border-t border-neutral-100 pt-5 text-[1rem]">
                      {faq.a}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
          
          <Reveal delay={0.4} className="mt-16 text-center">
            <div className="bg-white p-10 rounded-2xl border-2 border-primary-50 shadow-xl inline-block w-full max-w-2xl">
              <HelpCircle className="w-12 h-12 text-accent-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary-950 mb-3">{t.faq.helpTitle}</h3>
              <p className="text-neutral-500 mb-8">{t.faq.helpDesc}</p>
              <a href="https://wa.me/245957000555" className="btn btn-whatsapp px-10 py-4 text-base">
                {t.faq.btnSpeakTeam}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
