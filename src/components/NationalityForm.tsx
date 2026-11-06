import React, { useState } from 'react';
import { Send, Download, Mail, ChevronLeft, Check } from 'lucide-react';
import { Reveal } from './Reveal';
import { clsx } from 'clsx';
import { useToast } from '../context/ToastContext';
import { OFFICIAL_EMAILS_MAILTO } from '../services/appointmentService';

type FormType = 'naturalizacao' | 'casamento' | 'descendencia';

interface FormDefinition {
  label: string;
  number: string;
  description: string;
  fields: { name: string; label: string; type: string; placeholder: string; required?: boolean }[];
}

const formDefinitions: Record<FormType, FormDefinition> = {
  naturalizacao: {
    label: 'Nacionalidade por Naturalização',
    number: '01',
    description: 'Para residentes legais com mais de cinco anos de residência contínua.',
    fields: [
      { name: 'nome', label: 'Nome e Apelido Completo', type: 'text', placeholder: 'Nome e Apelido Completo', required: true },
      { name: 'email', label: 'E-mail', type: 'email', placeholder: 'nome@email.com', required: true },
      { name: 'telefone', label: 'Telefone / WhatsApp', type: 'tel', placeholder: '+245 ...', required: true },
      { name: 'documento', label: 'Número do documento', type: 'text', placeholder: 'Passaporte ou BI', required: true },
      { name: 'residencia', label: 'País de residência', type: 'text', placeholder: 'País onde reside', required: true },
      { name: 'motivoPedido', label: 'Motivo do Pedido de Nacionalidade', type: 'textarea', placeholder: 'Indique o motivo pelo qual requer a nacionalidade (ex: residência prolongada, integração na comunidade, laços culturais)', required: true },
      { name: 'observacoes', label: 'Observações ou Caso Específico', type: 'textarea', placeholder: 'Ex: Filho de mãe ou pai guineense nascido no estrangeiro' }
    ]
  },
  casamento: {
    label: 'Nacionalidade por Casamento',
    number: '02',
    description: 'Para cônjuges de cidadãos guineenses, com um processo simplificado.',
    fields: [
      { name: 'nome', label: 'Nome e Apelido Completo', type: 'text', placeholder: 'Nome e Apelido Completo', required: true },
      { name: 'email', label: 'E-mail', type: 'email', placeholder: 'nome@email.com', required: true },
      { name: 'telefone', label: 'Telefone / WhatsApp', type: 'tel', placeholder: '+245 ...', required: true },
      { name: 'conjuge', label: 'Nome do cônjuge guineense', type: 'text', placeholder: 'Nome completo do cônjuge', required: true },
      { name: 'dataCasamento', label: 'Data do casamento', type: 'date', placeholder: '', required: true },
      { name: 'motivoPedido', label: 'Motivo do Pedido de Nacionalidade', type: 'textarea', placeholder: 'Indique o motivo da solicitação de nacionalidade pelo vínculo matrimonial', required: true },
      { name: 'observacoes', label: 'Observações ou Caso Específico', type: 'textarea', placeholder: 'Ex: Filho de mãe ou pai guineense nascido no estrangeiro' }
    ]
  },
  descendencia: {
    label: 'Nacionalidade por Descendência',
    number: '03',
    description: 'Para descendentes de guineenses nascidos no estrangeiro.',
    fields: [
      { name: 'nome', label: 'Nome e Apelido Completo', type: 'text', placeholder: 'Nome e Apelido Completo', required: true },
      { name: 'email', label: 'E-mail', type: 'email', placeholder: 'nome@email.com', required: true },
      { name: 'telefone', label: 'Telefone / WhatsApp', type: 'tel', placeholder: '+245 ...', required: true },
      { name: 'ascendente', label: 'Nome do ascendente guineense', type: 'text', placeholder: 'Pai, mãe, avô ou avó', required: true },
      { name: 'parentesco', label: 'Grau de parentesco', type: 'text', placeholder: 'Ex.: avô materno', required: true },
      { name: 'motivoPedido', label: 'Motivo do Pedido de Nacionalidade', type: 'textarea', placeholder: 'Indique o motivo do pedido (ex: resgate ancestral, reconhecimento de filiação, retorno às origens)', required: true },
      { name: 'observacoes', label: 'Observações ou Caso Específico', type: 'textarea', placeholder: 'Ex: Filho de mãe ou pai guineense nascido no estrangeiro' }
    ]
  }
};

export function NationalityForm({ type, onBack }: { type: FormType; onBack: () => void }) {
  const definition = formDefinitions[type];
  const { showToast, success, error } = useToast();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getMessageText = () => {
    const lines = [
      'PEDIDO OFICIAL DE NACIONALIDADE',
      'EMDPN-GB (ESCRITÓRIO DE MOVIMENTAÇÃO DOCUMENTAL)',
      '',
      `Modalidade: ${definition.label}`
    ];
    Object.entries(formData).forEach(([key, value]) => {
      if (value) lines.push(`${key}: ${value}`);
    });
    lines.push(
      '',
      'E-mail oficial destinatário: infor.ciesemdpngb@gmail.com',
      '',
      'Enviado através do portal oficial EMDPN-GB.'
    );
    return lines.join('\n');
  };

  const handleAction = (action: 'whatsapp' | 'email' | 'download') => {
    if (!formData.nome || !formData.nome.trim()) {
      error('Por favor, preencha o seu Nome e Apelido completo antes de submeter.');
      return;
    }
    if (!formData.motivoPedido || !formData.motivoPedido.trim()) {
      error('Por favor, indique o Motivo do Pedido de Nacionalidade.');
      return;
    }

    const text = getMessageText();
    const subject = `${definition.label} - ${formData.nome} - EMDPN-GB`;

    if (action === 'download') {
      const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(file);
      link.download = `formulario-nacionalidade-${type}.txt`;
      link.click();
      URL.revokeObjectURL(link.href);
      setStatus('Pedido guardado e formulário descarregado.');
      success('Formulário descarregado com sucesso (.TXT)!');
    } else if (action === 'whatsapp') {
      window.open(`https://wa.me/245957000555?text=${encodeURIComponent(text)}`, '_blank');
      setStatus('Pedido preparado. A abrir o WhatsApp...');
      success('Pedido encaminhado para o WhatsApp oficial com sucesso!');
    } else if (action === 'email') {
      window.location.href = `mailto:${OFFICIAL_EMAILS_MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
      setStatus('Pedido preparado. A abrir o seu e-mail...');
      success('Encaminhado para o e-mail oficial (infor.ciesemdpngb@gmail.com)!');
    }
  };

  return (
    <Reveal className="max-w-3xl mx-auto">
      <div className="bg-white p-6 md:p-12 border border-primary-100 rounded-xl shadow-xl">
        <div className="flex items-center justify-between gap-4 pb-5 border-b border-neutral-200 mb-8">
          <button onClick={onBack} className="flex items-center gap-1.5 text-primary-700 font-bold text-sm hover:text-primary-900">
            <ChevronLeft size={18} /> Voltar
          </button>
          <span className="text-neutral-500 text-[0.72rem] font-bold tracking-widest uppercase">Passo 2 de 2</span>
        </div>

        <div className="flex items-start gap-4 md:gap-6 mb-8">
          <div className="shrink-0 w-12 h-12 md:w-13 md:h-13 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center font-black text-lg shadow-sm">
            {definition.number}
          </div>
          <div>
            <span className="text-accent-700 font-extrabold text-[0.78rem] tracking-widest uppercase block mb-1">Iniciando Pedido</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-900 m-0">{definition.label}</h2>
            <p className="text-neutral-600 mt-2 text-sm md:text-base leading-relaxed">{definition.description} Preencha os dados abaixo para continuar.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={e => e.preventDefault()}>
          <div className="grid gap-4 sm:grid-cols-2">
            {definition.fields.map(field => (
              <div key={field.name} className={clsx(field.type === 'textarea' && "sm:col-span-2")}>
                <label className="block text-primary-900 text-[0.78rem] font-extrabold uppercase mb-1.5">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm min-h-[100px]"
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-neutral-200 rounded-sm focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-sm"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <button 
              type="button" 
              onClick={() => handleAction('whatsapp')}
              className="btn btn-whatsapp flex-1 min-w-[200px]"
            >
              <Send size={16} /> Enviar via WhatsApp
            </button>
            <button 
              type="button" 
              onClick={() => handleAction('email')}
              className="btn btn-institutional flex-1 min-w-[200px]"
            >
              <Mail size={16} /> Enviar via E-mail
            </button>
            <button 
              type="button" 
              onClick={() => handleAction('download')}
              className="btn bg-neutral-100 text-neutral-700 hover:bg-neutral-200 flex-1 min-w-[200px]"
            >
              <Download size={16} /> Descarregar .TXT
            </button>
          </div>

          {status && (
            <div className="mt-4 text-center text-success-700 text-sm font-bold animate-fade-in">
              {status}
            </div>
          )}
        </form>
      </div>
    </Reveal>
  );
}
