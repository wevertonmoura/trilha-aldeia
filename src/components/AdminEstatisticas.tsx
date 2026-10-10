// src/components/AdminEstatisticas.tsx
import { UserCheck, Clock, DollarSign, Users, Bus, Car } from 'lucide-react';

export default function AdminEstatisticas({ 
  totalPagos, 
  totalPendentes, 
  formatarMoeda, 
  arrecadado, 
  totalGerado,
  totalComTransporte,
  totalSemTransporte
}: any) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* 1. Confirmados */}
      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-5 rounded-3xl border border-zinc-800/50 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-1"><UserCheck size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-tight">Confirmados</p>
          <h3 className="text-3xl font-black text-emerald-500 tracking-tighter">{totalPagos}</h3>
        </div>
      </div>

      {/* 2. Pendentes */}
      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-5 rounded-3xl border border-zinc-800/50 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-colors"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500 border border-yellow-500/20 mb-1"><Clock size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-tight">Pendentes</p>
          <h3 className="text-3xl font-black text-yellow-500 tracking-tighter">{totalPendentes}</h3>
        </div>
      </div>

      {/* 3. No Ônibus (Novo) */}
      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-5 rounded-3xl border border-zinc-800/50 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20 mb-1"><Bus size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-tight">No Ônibus</p>
          <h3 className="text-3xl font-black text-blue-500 tracking-tighter">{totalComTransporte}</h3>
        </div>
      </div>

      {/* 4. De Carro (Novo) */}
      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-5 rounded-3xl border border-zinc-800/50 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 border border-purple-500/20 mb-1"><Car size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-tight">De Carro</p>
          <h3 className="text-3xl font-black text-purple-500 tracking-tighter">{totalSemTransporte}</h3>
        </div>
      </div>

      {/* 5. Arrecadado */}
      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-5 rounded-3xl border border-zinc-800/50 shadow-xl relative overflow-hidden group col-span-2 md:col-span-1">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-1"><DollarSign size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-tight">Arrecadado</p>
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tighter pt-1">{formatarMoeda(arrecadado)}</h3>
        </div>
      </div>

      {/* 6. Total Gerado */}
      <div className="bg-gradient-to-br from-zinc-900/90 to-zinc-900/50 backdrop-blur-md p-5 rounded-3xl border border-zinc-800/50 shadow-xl relative overflow-hidden col-span-2 md:col-span-1">
        <div className="flex flex-col gap-2 relative z-10">
          <div className="w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-400 border border-zinc-700/50 mb-1"><Users size={20}/></div>
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-tight">Inscrições (Geral)</p>
          <h3 className="text-3xl font-black text-zinc-300 tracking-tighter">{totalGerado}</h3>
        </div>
      </div>
    </div>
  );
}