'use client';

import React from 'react';

const EmailCodigoValidacao = ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const nome = searchParams.Nome || 'Usuário';  

  return (
    <div dangerouslySetInnerHTML={{
      __html: `
       <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validação de Cadastro</title>
    <style>
        @media only screen and (max-width: 600px) {
            .desktop-only {
                display: none !important;
            }

            .mobile-only {
                display: block !important;
                width: 100% !important;
            }
        }

        @media only screen and (min-width: 601px) {
            .desktop-only {
                display: table !important;
                width: 100% !important;
            }

            .mobile-only {
                display: none !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <table style="width: 100%">
        <tr style="background-color: #FFF4F2;">
            <td>
                <table align="center" width="700" cellpadding="0" cellspacing="0" style="background-color: #FFF4F2; overflow: hidden;">
                    <!-- Banner -->
                    <tr>
                        <td align="center" style="padding-top:20px">
                            <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/logofundo_vermelho.png?sv=2025-05-05&se=2125-04-02T12%3A59%3A49Z&sr=b&sp=r&sig=c54U3HkGp1qGIWyq%2F1lmnJP6fAWgqLP78Y717ntG%2B6E%3D" alt="Banner" width="98" height="98" style="display: block; max-width: 100%;">

                        </td>
                    </tr>

                    <!-- Texto -->
                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top:40px">
                            <p style="font-size: 32px; padding-left: 160px; padding-right: 160px; line-height: 1.2; color: #C02031"><strong>Seu cadastro ainda não foi finalizado, mas estamos quase lá!</strong></p>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top:30px">
                            <p style="font-size: 16px; padding-left: 100px; padding-right: 100px; line-height: 1.2;">Olá, <strong>${nome}!</strong></p>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top:30px; padding-bottom: 30px;">
                            <p style="font-size: 16px; padding-left: 70px; padding-right: 50px; line-height: 1.2;">Estou muito feliz com seu interesse em fazer parte do meu time de revendedores. Falta apenas um pequeno ajuste para finalizer o seu cadastro!</p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center">
                            <table>
                                <tr class="desktop-only">
                                    <td align="left" style="padding-left: 10px; padding-right: 50px;">
                                        <p style="font-size: 16px; width: 246px">Verifiquei alguma inconsistência no documento enviado. Para garantir a aprovação, peço que você o reenvie  de forma legível.</p>
                                        <a href="${process.env.NEXT_LINK_PORTAL_TSHIELD}" target="_blank"
                                           style="text-decoration: none; color: inherit; display: block; padding-top:40px;padding-bottom:40px">
                                            <table width="232" height="49" cellpadding="0" cellspacing="0" border="0"
                                                   style="background-color: #C02031; color: #ffffff; text-align: center; height: 59px;">
                                                <tr>
                                                    <td align="center" valign="middle" style="font-size: 16px; line-height: 1.1;">
                                                        Reenviar documento
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                        <p style="width: 246px; font-size: 16px; "><strong>Dica:</strong> Certifique-se de que a imagem está nítida, sem cortes ou reflexos para que o processo seja aprovado rapidamente.</p>
                                    </td>
                                    <td align="center">
                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/image24.png?sv=2025-05-05&se=2125-04-02T13%3A10%3A40Z&sr=b&sp=r&sig=zdza%2F490XRrhdzLZbZBzzuLsUQXPqlffOJkNAV68uOc%3D" width="264" height="348" style="display: block; max-width: 100%;">
                                    </td>
                                </tr>

                                <tr class="mobile-only">
                                    <td align="left" style="padding-left: 10px; padding-right: 50px;">
                                        <p style="width: 246px">Verifiquei alguma inconsistência no documento enviado. Para garantir a aprovação, peço que você o reenvie  de forma legível.</p>
                                        <a href="${process.env.NEXT_LINK_PORTAL_TSHIELD}" target="_blank"
                                           style="text-decoration: none; color: inherit; display: block; padding-top:40px;padding-bottom:40px">
                                            <table width="232" height="49" cellpadding="0" cellspacing="0" border="0"
                                                   style="background-color: #C02031; color: #ffffff; text-align: center; height: 59px;">
                                                <tr>
                                                    <td align="center" valign="middle" style="font-size: 16px; line-height: 1.1;">
                                                        Reenviar documento
                                                    </td>
                                                </tr>
                                            </table>
                                        </a>
                                    </td>
                                    <td align="center">
                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/image24.png?sv=2025-05-05&se=2125-04-02T13%3A10%3A40Z&sr=b&sp=r&sig=zdza%2F490XRrhdzLZbZBzzuLsUQXPqlffOJkNAV68uOc%3D" width="152" height="202" style="display: block; max-width: 100%;">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr class="mobile-only" style="background-color: #FFF4F2">
                        <td align="center">
                            <p style="font-size: 16px; padding-left: 40px; padding-right: 50px; line-height: 1.2;"><strong>Dica:</strong> Certifique-se de que a imagem está nítida, sem cortes ou reflexos para que o processo seja aprovado rapidamente.</p>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2">
                        <td align="center"  style="padding-top: 30px; padding-bottom: 30px;">
                            <p style="font-size: 16px; padding-left: 40px; padding-right: 50px; line-height: 1.2;">A nossa comunidade de revendedores está animada em ter você em breve!</p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>

        <tr style="background-color: #ffffff">
			<td>
				<table align="center" width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; overflow: hidden;">
					<!-- Seção de Logos e Links -->
					<tr>
						<td align="center" style="padding: 10px;">
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr class="desktop-only">
									<td align="center" style="padding: 10px; white-space: nowrap;">
                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/LOGO_VD_REVENDA-OFF_WHITE_2_3.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=Dr7AjTR7fcx2HIFr9ZjlpeLp%2B8dsRQrRcou9XjvZh%2B0%3D" 
                                            alt="Logo" width="90" style="display: inline-block; vertical-align: middle;">
                                        
                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/empressacertificadalogo.png?sv=2025-05-05&se=2125-03-27T14%3A21%3A02Z&sr=b&sp=r&sig=Hub%2BOgYR1%2BCgS2tvtvUvgy%2FL6ReFCF7LWUsdK70whoQ%3D" 
                                            alt="Certificado" width="43" height="71" 
                                            style="display: inline-block; padding-left: 3px; vertical-align: middle;">
                                    </td>

									<td>
										<table>
											<tr>
												<td align="center" style="padding-top: 10px;">
                                                    <table>
                                                        <tr>
                                                            <td align="center">
                                                                <div style="display: flex; align-items: center;">
                                                                    <a href="https://revendedor.loccitaneaubresil.com" style="display: inline-block;">
                                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/portalReve.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=3joXVZogSKiQtBQ0NfCKZygjIZG4Ts1pYEJUqxbxnVw%3D" width="26">
                                                                    </a>
                                                                    <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">PORTAL<BR>REVE</span>
                                                                </div>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <div style="display: flex; align-items: center;">
                                                                    <a href="https://viewer.ipaper.io/loccitane-en-provence/au-bresil-2425/vd/revista-digital/receitas-de-beleza-loccitane-au-bresil-ciclo-05-25/" style="display: inline-block;">
																		<img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/revistaDigital.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=1X7ZQKEhxhITVw3cXRS6uK%2F1Dcyn9m3nsvkIiZdCU10%3D" width="26">
																	</a>
                                                                    <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">REVISTA<BR>DIGITAL</span>
                                                                </div>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <div style="display: flex; align-items: center;">
                                                                    <a href="https://api.whatsapp.com/send?phone=5511975743863" style="display: inline-block;">
                                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/whatsapp.png?sv=2025-05-05&se=2125-03-27T14%3A23%3A53Z&sr=b&sp=r&sig=0ay2iUshuemzFG0XH7%2Bg1hvYAskRX9N8TTZzesxFP7k%3D" width="24">
                                                                    </a>
                                                                    <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">FALE<BR>CONOSCO</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>

												</td>
											</tr>
											<tr>
												<td align="center">
													<hr style="border: none; border-top: 1px solid #C02031; width: 100%; margin-top: 0px;"> <!-- Remover ou diminuir o margin-top -->
													<p style="font-size: 9px; font-weight: bold; margin-top: 2px; color: #C02031;">Nos siga nas redes e fique por dentro</p> <!-- Diminuir o margin-top para reduzir o espaçamento -->
												</td>
											</tr>
											<tr>
                                                <td align="center" style="padding-top: 0px; white-space: nowrap;">
                                                    <a href="https://www.tiktok.com/@revendaloccitaneaubresil" style="display: inline-block;">
                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/ICON_TIKTOK.png?sv=2025-05-05&se=2125-03-27T14%3A27%3A50Z&sr=b&sp=r&sig=Ke7YWB%2BJmhLoL%2BGsRbhPGw7q6k60UZBMvbcN8Hwzb1Q%3D" width="24">
                                                    </a>
                                                    <a href="https://www.instagram.com/loccitaneaubresil/" style="display: inline-block; padding-left: 10px;">
                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/ICON_INSTAGRAM.png?sv=2025-05-05&se=2125-03-27T14%3A28%3A13Z&sr=b&sp=r&sig=oYI5Eb3vUtAt%2F6cDgXD34T02ev%2BA%2BFzVGqoY%2FvAsggg%3D" width="24">
                                                    </a>
                                                </td>
                                            </tr>

										</table>
									</td>
								</tr>

								<tr class="mobile-only" align="center">
									<td align="center" style="padding: 10px; white-space: nowrap;">
                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/LOGO_VD_REVENDA-OFF_WHITE_2_3.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=Dr7AjTR7fcx2HIFr9ZjlpeLp%2B8dsRQrRcou9XjvZh%2B0%3D" 
                                            alt="Logo" width="90" style="display: inline-block; vertical-align: middle;">
                                        
                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/empressacertificadalogo.png?sv=2025-05-05&se=2125-03-27T14%3A21%3A02Z&sr=b&sp=r&sig=Hub%2BOgYR1%2BCgS2tvtvUvgy%2FL6ReFCF7LWUsdK70whoQ%3D" 
                                            alt="Certificado" width="43" height="71" 
                                            style="display: inline-block; padding-left: 3px; vertical-align: middle;">
                                    </td>
								</tr>
								<tr class="mobile-only" align="center">
									<td>
										<table>
											<tr>
												<td align="center" style="padding-top: 10px;">
													<table>
                                                        <tr>
                                                            <td align="center">
                                                                <div style="display: flex; align-items: center;">
                                                                    <a href="https://revendedor.loccitaneaubresil.com" style="display: inline-block;">
                                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/portalReve.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=3joXVZogSKiQtBQ0NfCKZygjIZG4Ts1pYEJUqxbxnVw%3D" width="26">
                                                                    </a>
                                                                    <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">PORTAL<BR>REVE</span>
                                                                </div>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <div style="display: flex; align-items: center;">
                                                                     <a href="https://viewer.ipaper.io/loccitane-en-provence/au-bresil-2425/vd/revista-digital/receitas-de-beleza-loccitane-au-bresil-ciclo-05-25/" style="display: inline-block;">
																		<img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/revistaDigital.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=1X7ZQKEhxhITVw3cXRS6uK%2F1Dcyn9m3nsvkIiZdCU10%3D" width="26">
																	</a>
                                                                    <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">REVISTA<BR>DIGITAL</span>
                                                                </div>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <div style="display: flex; align-items: center;">
                                                                    <a href="https://api.whatsapp.com/send?phone=5511975743863" style="display: inline-block;">
                                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/whatsapp.png?sv=2025-05-05&se=2125-03-27T14%3A23%3A53Z&sr=b&sp=r&sig=0ay2iUshuemzFG0XH7%2Bg1hvYAskRX9N8TTZzesxFP7k%3D" width="24">
                                                                    </a>
                                                                    <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">FALE<BR>CONOSCO</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
												</td>
											</tr>
											<tr>
												<td align="center">
													<hr style="border: none; border-top: 1px solid #C02031; width: 100%; margin-top: 0px;">
													<p style="font-size: 9px; font-weight: bold; margin-top: 2px; color: #C02031;">Nos siga nas redes e fique por dentro</p>
												</td>
											</tr>
											<tr>
												<td align="center" style="padding-top: 0px; white-space: nowrap;">
                                                    <a href="https://www.tiktok.com/@revendaloccitaneaubresil" style="display: inline-block;">
                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/ICON_TIKTOK.png?sv=2025-05-05&se=2125-03-27T14%3A27%3A50Z&sr=b&sp=r&sig=Ke7YWB%2BJmhLoL%2BGsRbhPGw7q6k60UZBMvbcN8Hwzb1Q%3D" width="24">
                                                    </a>
                                                    <a href="https://www.instagram.com/loccitaneaubresil/" style="display: inline-block; padding-left: 10px;">
                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/ICON_INSTAGRAM.png?sv=2025-05-05&se=2125-03-27T14%3A28%3A13Z&sr=b&sp=r&sig=oYI5Eb3vUtAt%2F6cDgXD34T02ev%2BA%2BFzVGqoY%2FvAsggg%3D" width="24">
                                                    </a>
                                                </td>
											</tr>

										</table>
									</td>
								</tr>

							</table>
						</td>
					</tr>
					<tr>
						<td align="center" style="padding-top: 30px">
							<hr style="border: none; border-top: 1px solid #97979780; width: 90%; margin-top: 0px;">
						</td>
					</tr>
					<!-- Rodapé -->
					<tr>
						<td align="center" style="padding: 20px; font-size: 12px; color: #888;">
							<p style="margin: 0px 0; font-size: 12px; font-weight: bold;">L'OCCITANE AU BRÉSIL © COPYRIGHT 2024</p>
							<p style="margin: 0px 0; font-size: 12px;">ESPAÇO DO BANHO E AROMAS LTDA | AV. ODILA CHAVES RODRIGUES, 1277 | GLEBA A1 - GALPÃO 3 E 4. DISTRITO INDUSTRIAL | JUNDIAÍ, SÃO PAULO P. CNPJ: 01.512.104/0060-06</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
    </table>
</body>
</html>

      `
    }} />
  );
};

export default EmailCodigoValidacao;