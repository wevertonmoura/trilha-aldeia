import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const LIMITE_VAGAS = 50; // Trava rígida no backend

export default async function handler(req, res) {
  try {
    const { count, error } = await supabase
      .from('inscricao_trilha')
      .select('*', { count: 'exact', head: true })
      .eq('pago', true);

    if (error) throw error;

    const totalOcupadas = count || 0;
    const esgotado = totalOcupadas >= LIMITE_VAGAS;

    res.status(200).json({ 
        total: totalOcupadas,
        esgotado: esgotado,
        limite: LIMITE_VAGAS
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
}