import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const LIMITE_VAGAS = 50; // Trava rígida no backend

export default async function handler(req, res) {
  try {
    // 1. TRAVA DESATIVADA: O sistema volta a contar as vagas reais no banco.
    // 2. CORREÇÃO: Lendo da tabela 'participantes' (que é a tabela atual)
    const { count, error } = await supabase
      .from('participantes')
      .select('*', { count: 'exact', head: true })
      .eq('pago', true); // Conta apenas quem já está com status pago = true

    if (error) throw error;

    // O total agora é o número real que vem do banco de dados
    const totalOcupadas = count || 0; 
    const esgotado = totalOcupadas >= LIMITE_VAGAS;

    res.status(200).json({ 
        total: totalOcupadas,
        esgotado: esgotado,
        limite: LIMITE_VAGAS
    });
  } catch (error) {
    console.error("Erro ao buscar vagas:", error);
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
}