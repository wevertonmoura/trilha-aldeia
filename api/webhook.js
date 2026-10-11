import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Método não permitido');

  try {
    const paymentId = req.body?.data?.id || req.query?.id || req.query['data.id'];
    
    if (!paymentId) {
      console.log("⚠️ Notificação recebida sem ID de pagamento.");
      return res.status(200).send('OK');
    }

    console.log(`🔍 Processando pagamento ID: ${paymentId}`);

    const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    });
    
    if (!mpResponse.ok) {
        console.error("❌ Erro ao consultar Mercado Pago");
        return res.status(200).send('Erro na API do MP');
    }

    const mpData = await mpResponse.json();

    if (mpData.status === 'approved') {
      const emailPrincipal = mpData.external_reference;
      const idDoPagamentoString = paymentId.toString(); 
      
      console.log(`✅ Pagamento APROVADO para: ${emailPrincipal}`);

      if (idDoPagamentoString) {
        // CORREÇÃO: Atualizado de 'participantes' para 'inscricao_trilha'
        const { data: inscricoes, error: erroBusca } = await supabase
          .from('inscricao_trilha')
          .select('*')
          .eq('payment_id', idDoPagamentoString);

        if (!erroBusca && inscricoes && inscricoes.length > 0) {
          
          if (!inscricoes[0].pago) {
            
            console.log(`📝 Atualizando ${inscricoes.length} inscritos deste pagamento...`);

            // CORREÇÃO: Atualizado de 'participantes' para 'inscricao_trilha'
            const { error: erroUpdate } = await supabase
              .from('participantes')
              .update({ pago: true })
              .eq('payment_id', idDoPagamentoString);

            if (erroUpdate) {
              console.error("❌ Erro ao atualizar Supabase:", erroUpdate.message);
            } else {
              console.log("🚀 Banco de dados atualizado com SUCESSO!");
              
              const nomesParticipantes = inscricoes.map(p => `<li style="margin-bottom: 8px;">🎟️ <strong>${p.nome}</strong> ${p.transporte ? `<span style="font-size: 13px; color: #6b7280;">(${p.transporte})</span>` : ''}</li>`).join('');

              const mailOptions = {
                from: `"Vem Para Trilha" <${process.env.EMAIL_USER}>`, 
                to: emailPrincipal,
                subject: '🎉 Compra Confirmada: Sua vaga na trilha está garantida!', 
                html: `
                  <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                    <div style="background-color: #10b981; padding: 30px 20px; text-align: center;">
                      <h1 style="color: white; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Compra Confirmada com Sucesso!</h1>
                    </div>
                    <div style="padding: 30px; background-color: #ffffff; color: #374151; line-height: 1.6;">
                      <p style="font-size: 16px; margin-top: 0;">Olá! Que excelente notícia, o seu pagamento foi aprovado e a sua vaga na nossa próxima aventura está 100% garantida.</p>
                      
                      <div style="background-color: #f3f4f6; border-left: 4px solid #10b981; padding: 15px; margin: 25px 0;">
                        <p style="margin: 0; font-size: 15px; color: #4b5563;">
                          <strong>📱 Fique atento(a):</strong> Na semana da trilha, vamos criar um grupo exclusivo no WhatsApp com todos os participantes para passarmos as instruções finais, horários exatos e combinarmos tudo!
                        </p>
                      </div>

                      <h3 style="color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">Aventureiros Confirmados:</h3>
                      <ul style="font-size: 16px; list-style-type: none; padding: 0; margin-bottom: 25px;">
                        ${nomesParticipantes}
                      </ul>
                      
                      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
                        <h3 style="margin-top: 0; color: #111827; margin-bottom: 15px;">Resumo do Evento</h3>
                        <p style="margin: 8px 0;">📅 <strong>Data:</strong> 29/11</p>
                        <p style="margin: 8px 0;">📍 <strong>Local:</strong> Engenho Amparo, Itamaracá - PE</p>
                        <p style="margin: 8px 0;">🚌 <strong>Saída:</strong> Derby (Detalhes no grupo)</p>
                      </div>

                      <div style="margin-top: 30px; text-align: center;">
                        <p style="font-size: 15px;">Qualquer dúvida, é só perguntar! Pode nos chamar diretamente no WhatsApp:</p>
                        <a href="https://wa.me/5581988227739" style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">Falar no WhatsApp</a>
                      </div>

                      <p style="margin-top: 35px; text-align: center; color: #6b7280; font-size: 14px;">
                        Prepare-se para viver momentos incríveis.<br>
                        <strong>Equipe Vem Para Trilha</strong>
                      </p>
                    </div>
                  </div>
                `
              };

              try {
                  await transporter.sendMail(mailOptions);
                  console.log("📧 E-mail enviado com sucesso.");
              } catch (eMailError) {
                  console.error("⚠️ Erro ao enviar e-mail:", eMailError);
              }
            }
          } else {
              console.log("ℹ️ Esta transação já estava marcada como paga.");
          }
        }
      }
    }
    
    return res.status(200).send('Webhook processado');

  } catch (error) { 
    console.error("❌ Erro crítico no Webhook:", error); 
    return res.status(500).send('Erro interno');
  }
}