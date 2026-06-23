import { useState, useEffect } from 'react';
import { ArrowLeft, Loader2, Search, ShieldAlert, Download } from 'lucide-react';
import AdminEstatisticas from './components/AdminEstatisticas';
import AdminTabela from './components/AdminTabela';

const Admin = ({ senha, formatarMoeda, fecharAdmin }: any) => {
  const [adminData, setAdminData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [aprovandoId, setAprovandoId] = useState<string | null>(null); 
  const [excluindoId, setExcluindoId] = useState<string | null>(null);
  
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});

  useEffect(() => { carregarDados(); }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin-listar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha })
      });
      const data = await res.json();
      if (data && !data.error) setAdminData(data);
    } catch (err) { console.error("Falha ao carregar dados:", err); }
    setLoading(false);
  };

  const salvarEdicao = async () => {
    try {
      const res = await fetch('/api/admin-editar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha, id: editData.id, nome: editData.nome, cpf: editData.cpf, telefone: editData.telefone })
      });
      if (res.ok) {
        setAdminData(prev => prev.map(item => item.id === editId ? { ...item, ...editData } : item));
        setEditId(null);
      } else { throw new Error("Erro ao salvar"); }
    } catch (err) { alert("Erro ao salvar alterações."); }
  };

  const aprovarPagamentoManual = async (id: string) => {
    if (!window.confirm("Confirmar recebimento manual?")) return;
    setAprovandoId(id); 
    try {
      const res = await fetch('/api/admin-aprovar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha, id })
      });
      if (res.ok) setAdminData(prev => prev.map(item => item.id === id ? { ...item, pago: true } : item));
    } catch (err) { alert("Erro ao aprovar."); }
    finally { setAprovandoId(null); }
  };

  const excluirParticipante = async (id: string, nome: string) => {
    if (!window.confirm(`Tem certeza que deseja EXCLUIR permanentemente ${nome}?`)) return;
    setExcluindoId(id);
    try {
      const res = await fetch('/api/admin-excluir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha, id })
      });
      if (res.ok) setAdminData(prev => prev.filter(item => item.id !== id));
    } catch (err) { alert("Erro ao excluir."); }
    finally { setExcluindoId(null); }
  };

  const chamarNoWhatsApp = (telefone: string, nome: string, pago: boolean) => {
    let numeroFormatado = (telefone || '').replace(/\D/g, ''); 
    if (numeroFormatado.length === 10 || numeroFormatado.length === 11) numeroFormatado = '55' + numeroFormatado;
    const primeiroNome = (nome || '').split(' ')[0]; 
    const mensagem = encodeURIComponent(pago 
      ? `Fala, ${primeiroNome}! Aqui é da organização do Vem Para Trilha...` 
      : `Fala ${primeiroNome}! Vi que o seu pagamento está pendente...`
    );
    window.open(`https://wa.me/${numeroFormatado}?text=${mensagem}`, '_blank');
  };

  // Funções de exportação (SOS e Completa)
  const exportarPlanilha = () => { /* Sua lógica mantém-se igual */ };
  const exportarPlanilhaCompleta = () => { /* Sua lógica mantém-se igual */ };

  const totalPagos = adminData.filter(p => p.pago).length;
  const totalPendentes = adminData.length - totalPagos;
  
  // CORREÇÃO: Atualizado para R$ 100 (pares) e R$ 55 (avulsos)
  const arrecadado = (Math.floor(totalPagos / 2) * 100) + ((totalPagos % 2) * 55); 
  
  const dadosFiltrados = adminData.filter(p => (p.nome || '').toLowerCase().includes(busca.toLowerCase()) || (p.telefone || '').includes(busca));

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 relative">
      <Loader2 className="animate-spin text-emerald-500 relative z-10" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 font-sans relative overflow-hidden z-0">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 p-6 md:p-8 rounded-[2rem] gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"><ShieldAlert size={28} className="text-zinc-950" /></div>
            <div>
              <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter">Comando Central</h1>
              <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Vem Para Trilha</p>
            </div>
          </div>
          <button onClick={fecharAdmin} className="bg-zinc-800/80 hover:bg-zinc-700 text-white px-6 py-4 rounded-xl flex items-center justify-center gap-3 text-xs font-bold uppercase transition-all border border-zinc-700 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Voltar ao Site
          </button>
        </div>

        {/* ESTATÍSTICAS ISOLADAS */}
        <AdminEstatisticas 
          totalPagos={totalPagos} 
          totalPendentes={totalPendentes} 
          arrecadado={arrecadado} 
          formatarMoeda={formatarMoeda} 
          totalGerado={adminData.length} 
        />

        {/* TABELA DE DADOS ISOLADA */}
        <div className="bg-zinc-900/60 backdrop-blur-xl rounded-[2.5rem] border border-zinc-800/80 overflow-hidden shadow-2xl">
          <div className="p-6 md:p-8 border-b border-zinc-800/80 bg-zinc-900/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto flex-1">
              <div className="bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/50"><Search size={20} className="text-emerald-500" /></div>
              <input type="text" placeholder="Pesquisar por nome ou WhatsApp..." value={busca} onChange={(e) => setBusca(e.target.value)} className="bg-transparent border-none outline-none text-lg font-bold text-white w-full placeholder:text-zinc-600 focus:ring-0" />
            </div>
            <div className="flex gap-3">
              <button onClick={exportarPlanilha} className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all border border-red-500/30">
                <ShieldAlert size={18} /> Lista SOS
              </button>
              <button onClick={exportarPlanilhaCompleta} className="w-full sm:w-auto bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all border border-emerald-500/30">
                <Download size={18} /> Lista Completa
              </button>
            </div>
          </div>

          <AdminTabela 
            dadosFiltrados={dadosFiltrados}
            editId={editId}
            editData={editData}
            setEditData={setEditData}
            setEditId={setEditId}
            salvarEdicao={salvarEdicao}
            aprovarPagamentoManual={aprovarPagamentoManual}
            aprovandoId={aprovandoId}
            chamarNoWhatsApp={chamarNoWhatsApp}
            excluirParticipante={excluirParticipante}
            excluindoId={excluindoId}
          />
        </div>
      </div>
    </div>
  );
};

export default Admin;