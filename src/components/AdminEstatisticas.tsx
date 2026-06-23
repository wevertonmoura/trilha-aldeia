// src/components/AdminEstatisticas.tsx
import { UserCheck, Clock, DollarSign, Users } from 'lucide-react';

export default function AdminEstatisticas({ totalPagos, totalPendentes, formatarMoeda, arrecadado, totalGerado }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-6 rounded-[2rem] border border-zinc-800/50 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-2"><UserCheck size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Confirmados</p>
          <h3 className="text-3xl font-black text-emerald-500 tracking-tighter">{totalPagos}</h3>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-6 rounded-[2rem] border border-zinc-800/50 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-colors"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 border border-yellow-500/20 mb-2"><Clock size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Pendentes</p>
          <h3 className="text-3xl font-black text-yellow-500 tracking-tighter">{totalPendentes}</h3>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-6 rounded-[2rem] border border-zinc-800/50 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-2"><DollarSign size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Arrecadado</p>
          <h3 className="text-3xl font-black text-white tracking-tighter">{formatarMoeda(arrecadado)}</h3>
        </div>
      </div>

      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-6 rounded-[2rem] border border-zinc-800/50 shadow-xl relative overflow-hidden">
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-400 border border-zinc-700/50 mb-2"><Users size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total Gerado</p>
          <h3 className="text-3xl font-black text-zinc-300 tracking-tighter">{totalGerado}</h3>
        </div>
      </div>
    </div>
  );
}