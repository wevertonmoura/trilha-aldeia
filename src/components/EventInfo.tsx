import {
  Calendar,
  MapPin,
  Clock,
  Mountain,
  Droplets,
  Info,
  Trash2,
  ShieldCheck,
  Waves,
  Maximize2,
  Ticket,
  VolumeX,
  QrCode,
  Coffee,
  Footprints,
  Bus,
  Car,
  Medal,
} from 'lucide-react';
import { motion } from 'framer-motion';

const InfoRow = ({ icon, title, text }: any) => (
  <div className="flex items-start gap-5">
    <div className="text-emerald-500 mt-1">{icon}</div>
    <div>
      <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">
        {title}
      </h4>
      <p className="text-white font-bold text-xl leading-tight">{text}</p>
    </div>
  </div>
);

const CheckItem = ({ text, icon }: any) => (
  <div className="flex items-center gap-3 bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 shadow-sm">
    <span className="text-emerald-500 shrink-0">{icon}</span>
    <span className="text-xs font-bold text-zinc-300">{text}</span>
  </div>
);

interface EventInfoProps {
  videos: string[];
  setSelectedMedia: (vid: string) => void;
}

export default function EventInfo({
  videos,
  setSelectedMedia,
}: EventInfoProps) {
  return (
    <div className="lg:col-span-2 space-y-16">

      <section>
        <h2 className="text-2xl font-black uppercase italic mb-6 border-b border-zinc-900 pb-2 text-zinc-500">
          Descrição do evento
        </h2>

        <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
          <p className="text-white font-bold italic text-xl">
            Trilha Engenho Amparo - Itamaracá
          </p>

          <p>
            Uma fuga perfeita da cidade. A equipe{' '}
            <span className="text-white font-bold text-emerald-500">
              VEM PARA TRILHA
            </span>{' '}
            convida você para uma imersão total na natureza da Ilha de
            Itamaracá.
          </p>

          <p>
            Venha dar uma pausa na rotina acelerada, respirar ar puro e
            recarregar as energias em uma experiência especial no Engenho
            Amparo.
          </p>

          <p>
            O percurso de <strong className="text-white">12 km</strong> possui
            nível <strong className="text-emerald-500">moderado</strong> e
            conta com{' '}
            <strong className="text-white">
              3 pontos de banho refrescantes
            </strong>{' '}
            ao longo da trilha.
          </p>

          <p>
            E para tornar o momento ainda mais especial,{' '}
            <strong className="text-emerald-500">
              todos os participantes receberão medalha
            </strong>{' '}
            pela participação.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-black uppercase italic mb-6 text-zinc-500 tracking-widest">
            Explore o Cenário
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {videos.map((midia, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group shadow-lg border border-zinc-900 bg-zinc-800"
                onClick={() => setSelectedMedia(midia)}
              >
                {/* SOLUÇÃO: Adicionado toLowerCase() para ignorar maiúsculas/minúsculas */}
                {midia.toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={midia}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <img
                    src={midia}
                    alt={`Imagem da Trilha ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                  <Maximize2 className="text-white" size={24} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="col-span-full">
          <h2 className="text-2xl font-black uppercase italic mb-6 border-b border-zinc-900 pb-2 text-zinc-500">
            Sobre o evento
          </h2>
        </div>

        <InfoRow icon={<Calendar />} title="Data" text="29 de Novembro" />
        <InfoRow icon={<Clock />} title="Horário" text="05h00 (Saída Derby) • 07h00 (Início da Trilha)" />

        <a href="https://www.google.com/maps/search/?api=1&query=Engenho+Amparo+Itamaracá+PE" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
          <InfoRow icon={<MapPin />} title="Localização" text="Engenho Amparo, Itamaracá - PE" />
        </a>

        <InfoRow icon={<Footprints />} title="Percurso" text="12 km • Nível Moderado" />
        <InfoRow icon={<Waves />} title="Atrativos" text="3 pontos de banho" />
        <InfoRow icon={<Medal />} title="Premiação" text="Medalha para todos" />
      </section>

      <section>
        <h2 className="text-2xl font-black uppercase italic mb-6 border-b border-zinc-900 pb-2 text-zinc-500">
          Investimento - 1º Lote
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-700/50">
            <div className="flex items-center gap-4 mb-5">
              <Bus className="text-emerald-500" size={32} />
              <div>
                <h4 className="font-bold text-white uppercase text-sm tracking-widest">Com Transporte</h4>
                <p className="text-xs text-zinc-500">Saída do Derby</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-zinc-700 pb-3">
                <span className="text-zinc-400 text-sm font-bold">Individual</span>
                <span className="text-emerald-500 font-black text-xl">R$ 95,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm font-bold">Casadinha</span>
                <div className="text-right">
                  <span className="text-emerald-500 font-black text-xl">R$ 90,00</span>
                  <p className="text-[10px] text-zinc-500">por pessoa • R$ 180,00 o par</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-700/50">
            <div className="flex items-center gap-4 mb-5">
              <Car className="text-emerald-500" size={32} />
              <div>
                <h4 className="font-bold text-white uppercase text-sm tracking-widest">Transporte Próprio</h4>
                <p className="text-xs text-zinc-500">Vá por conta própria</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-zinc-700 pb-3">
                <span className="text-zinc-400 text-sm font-bold">Individual</span>
                <span className="text-emerald-500 font-black text-xl">R$ 65,00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400 text-sm font-bold">Casadinha</span>
                <div className="text-right">
                  <span className="text-emerald-500 font-black text-xl">R$ 60,00</span>
                  <p className="text-[10px] text-zinc-500">por pessoa • R$ 120,00 o par</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-black uppercase italic mb-6 border-b border-zinc-900 pb-2 text-zinc-500">
          O QUE LEVAR? (RECOMENDAÇÕES)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CheckItem icon={<Droplets />} text="Água (pelo menos 1,5 litro)" />
          <CheckItem icon={<ShieldCheck />} text="Protetor solar e repelente" />
          <CheckItem icon={<Waves />} text="Roupa de banho e toalha (teremos 3 pontos de banho!)" />
          <CheckItem icon={<Info />} text="Boné ou chapéu" />
          <CheckItem icon={<Mountain />} text="Calçado confortável apropriado para trilha" />
          <CheckItem icon={<Trash2 />} text="Saco para recolher o seu lixo" />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-black uppercase italic mb-6 text-emerald-500 tracking-tighter">
          INFORMAÇÕES IMPORTANTES
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-500/10 p-6 rounded-2xl border border-red-500/20 flex gap-5 col-span-1 md:col-span-2 shadow-inner">
            <ShieldCheck className="text-red-500 shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-red-500 uppercase text-sm mb-2 tracking-widest">Acesso e Transporte</h4>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Somente pessoas com o nome na <strong className="text-white">lista oficial de pagantes</strong> terão acesso ao evento e ao transporte fretado.
              </p>
            </div>
          </div>

          <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-700/50 flex gap-5">
            <Ticket className="text-emerald-500 shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-white uppercase text-sm mb-2 tracking-widest">Investimento</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                <strong className="text-white">Com transporte:</strong> R$ 95,00 individual ou R$ 90,00 por pessoa na casadinha.<br /><br />
                <strong className="text-white">Transporte próprio:</strong> R$ 65,00 individual ou R$ 60,00 por pessoa na casadinha.
              </p>
            </div>
          </div>

          <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-700/50 flex gap-5">
            <VolumeX className="text-emerald-500 shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-white uppercase text-sm mb-2 tracking-widest">Som e Natureza</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Não é permitido o uso de caixas de som em volume alto. Vamos apreciar os sons da natureza!
              </p>
            </div>
          </div>

          <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-700/50 flex gap-5">
            <QrCode className="text-emerald-500 shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-white uppercase text-sm mb-2 tracking-widest">Pagamento via PIX</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Confirmação automática via PIX. Existe um acréscimo de taxa de <strong className="text-emerald-500">R$ 1,00</strong>.
              </p>
            </div>
          </div>

          <div className="bg-zinc-800/40 p-6 rounded-2xl border border-zinc-700/50 flex gap-5">
            <Coffee className="text-emerald-500 shrink-0" size={32} />
            <div>
              <h4 className="font-bold text-white uppercase text-sm mb-2 tracking-widest">Café Coletivo</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Pedimos que cada participante leve um item para partilharmos antes de iniciar a trilha.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}