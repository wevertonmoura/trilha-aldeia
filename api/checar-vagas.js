import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const LIMITE_VAGAS = 50; // Trava rígida no backend

export default async function handler(req, res) {
  try {
    // 🚨 TRAVA DE EMERGÊNCIA ATIVADA
    // Consulta ao banco temporariamente desativada para forçar o esgotamento
    /*
    const { count, error } = await supabase
      .from('inscricao_trilha')
      .select('*', { count: 'exact', head: true })
      .eq('pago', true);

    if (error) throw error;
    */

    // Forçando os valores de bloqueio:
    const totalOcupadas = LIMITE_VAGAS; 
    const esgotado = true;

    res.status(200).json({ 
        total: totalOcupadas,
        esgotado: esgotado,
        limite: LIMITE_VAGAS
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
}