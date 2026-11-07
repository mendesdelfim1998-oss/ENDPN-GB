import { supabase } from '../lib/supabase';
import { authService } from './authService';

export type ServiceFeeOverrides = Record<string, string>;

const SERVICE_FEES_UPDATED_EVENT = 'emdpn_service_fees_updated';
const MANAGED_SERVICE_IDS = new Set([
  'naturalizacao_residencia',
  'nacionalidade_casamento',
  'nacionalidade_descendencia',
  'alteracao_ratificacao_nome',
  'passaporte_biometrico',
  'bilhete_identidade',
  'registo_criminal',
  'cedula_nascimento'
]);

export async function getServiceFeeOverrides(): Promise<ServiceFeeOverrides> {
  const { data, error } = await supabase
    .from('service_fees')
    .select('service_id, fee');
  if (error) {
    console.error('Could not load service fee overrides:', error);
    throw new Error('Não foi possível carregar os preços personalizados.');
  }
  return Object.fromEntries(data.map(row => [row.service_id, row.fee]));
}

export async function saveServiceFeeOverride(serviceId: string, fee: string): Promise<void> {
  if (!authService.isAdmin()) {
    throw new Error('Apenas um administrador pode alterar os preços dos serviços.');
  }
  const normalizedFee = fee.trim();
  if (!MANAGED_SERVICE_IDS.has(serviceId) || !normalizedFee || normalizedFee.length > 160) {
    throw new Error('Introduza um preço ou taxa com até 160 caracteres.');
  }
  const { error } = await supabase
    .from('service_fees')
    .upsert({
      service_id: serviceId,
      fee: normalizedFee,
      updated_at: new Date().toISOString()
    }, { onConflict: 'service_id' });
  if (error) {
    console.error('Could not save service fee override:', error);
    throw new Error('Não foi possível guardar o preço personalizado.');
  }
  window.dispatchEvent(new Event(SERVICE_FEES_UPDATED_EVENT));
}

export async function resetServiceFeeOverride(serviceId: string): Promise<void> {
  if (!authService.isAdmin()) {
    throw new Error('Apenas um administrador pode restaurar os preços dos serviços.');
  }
  const { error } = await supabase.from('service_fees').delete().eq('service_id', serviceId);
  if (error) {
    console.error('Could not reset service fee override:', error);
    throw new Error('Não foi possível restaurar o preço padrão.');
  }
  window.dispatchEvent(new Event(SERVICE_FEES_UPDATED_EVENT));
}

export { SERVICE_FEES_UPDATED_EVENT };
