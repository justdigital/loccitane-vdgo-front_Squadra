'use client';

import React from 'react';

const EmailCodigoValidacao = ({ searchParams }: { searchParams: { [key: string]: string } }) => {  
  const CodigoGera = searchParams.CodigoGera || 'N/A';
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
                <table align="center" width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; overflow: hidden;">
                    <!-- Banner -->
                    <tr>
                        <td align="center">
                            <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/BannerEmailCadastroConcluido.jpg?sv=2025-05-05&se=2125-03-29T19%3A13%3A40Z&sr=b&sp=r&sig=yGu6tn1ZiCs0U2ndiNutO10MbJyxsOP4GEN9PkX2bZg%3D" alt="Banner" width="700" style="display: block; max-width: 100%;">

                        </td>
                    </tr>

                    <!-- Texto -->
                    <tr style="background-color: #FFF4F2">
                        <td align="center" >
                            <p style="margin: 50px 0 8px; font-size: 32px; padding-left: 110px; padding-right: 110px; line-height: 1.2;"><strong>${nome} seu cadastro foi aprovado! Você já pode fazer o seu primeiro pedido!</strong></p>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top: 30px;">
                            <p style="font-size: 16px; padding-left: 100px; padding-right: 100px; line-height: 1.2;">É oficial: agora você faz parte do Programa de Revenda da L’Occitane au Brésil! Estou muito feliz em te receber e mal posso esperar para acompanhar suas conquistas.</p>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top: 30px;">
                            <p style="font-size: 16px; padding-left: 50px; padding-right: 50px; line-height: 1.2;">Tenho mais uma ótima notícia: <strong>seu primeiro pedido já está liberado!</strong></p>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top: 30px;">
                            <p style="font-size: 16px; padding-left: 50px; padding-right: 50px; line-height: 1.2;">Esses são os seus dados de acesso para o Portal Reve:</p>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2;">
                        <td align="center">
                            <table width="361px" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; text-align: center; height: 72px;">
                                <tr>
                                    <td style="font-size: 16px; padding-top: 10px; line-height: 1.1; vertical-align: middle;">Seus dados de acesso:</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 16px;  line-height: 1.1; vertical-align: middle;"><strong>ID/LOGIN:</strong> ${CodigoGera}</td>
                                </tr>
                                <tr>
                                    <td style="font-size: 16px; padding-bottom: 8px; line-height: 1.1; vertical-align: middle;"><strong>Senha:</strong> Locci@123</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2;">
                        <td align="center">
                            <a href="https://revendedor.loccitaneaubresil.com/#!/" target="_blank"
                               style="text-decoration: none; color: inherit; display: block;">
                                <table width="361px" cellpadding="0" cellspacing="0" border="0"
                                       style="background-color: #C02031; color: #ffffff; text-align: center; height: 59px;">
                                    <tr>
                                        <td align="center" valign="middle" style="font-size: 16px; line-height: 1.1;">
                                            Acesse o Portal Reve
                                        </td>
                                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>


                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top: 30px;">
                            <p style="font-size: 16px; padding-left: 50px; padding-right: 50px; line-height: 1.2;">Boas vendas e bem-vindo(a) à nossa comunidade! <span style="color: red;">❤</span></p>
                        </td>
                    </tr>


                    <tr style="background-color: #FFF4F2;">
                        <td align="center" style="padding-top: 30px;">
                            <a href="https://www.youtube.com/@revendedoresloccitaneaubresil" target="_blank"
                               style="text-decoration: none; color: inherit; display: block;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td>
                                            <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/MINI_BANNER_CADASTRO_SUCESSO_CAJU.png?sv=2025-05-05&se=2125-03-31T16%3A46%3A06Z&sr=b&sp=r&sig=j45gqVsxSGqS8MjfykPHsVep2jBuU02L%2BCB7jBg33GQ%3D" width="294" height="152" style="border-radius: 10px; display: block; padding-top: 15px; padding-bottom: 20px">
                                        </td>
                                        <td width="10"></td> <!-- Espaçamento entre as imagens -->
                                        <td>
                                            <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/MINI_BANNER_CADASTRO_SUCESSO_ROMA.png?sv=2025-05-05&se=2125-03-31T16%3A45%3A43Z&sr=b&sp=r&sig=1W7w%2FK8s%2Fdry7IjSM3dJbWOj%2FIAdsxzWQMzbeccXP5k%3D" width="294" height="152" style="border-radius: 10px; display: block; padding-top: 15px; padding-bottom: 20px">
                                        </td>
                                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>


                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top: 30px;">
                            <p style="font-size: 16px; padding-left: 100px; padding-right: 100px; line-height: 1.2; margin-bottom: 5px;">Precisa de alguma ajuda?</p>
                            <p style="font-size: 16px; padding-left: 100px; padding-right: 100px; line-height: 1.2; margin-top: 5px;">Minha equipe está prontinha para te apoiar.</p>
                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2;">
                        <td align="center" style="padding-top: 30px;">
                            <a href="http://wa.me/5511975743863" target="_blank"
                               style="text-decoration: none; color: inherit; display: block;">
                                <table width="338px" cellpadding="0" cellspacing="0" border="0"
                                       style="background-color: #FFFFFF; text-align: center; height: 55px; color: #552E0D; border: 2px solid #C02031;">
                                    <tr>
                                        <td align="center" valign="middle" style="font-size: 16px; line-height: 1.1; height: 55px;">
                                            Falar com o suporte
                                        </td>
                                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>



                    <tr style="background-color: #FFF4F2;">
                        <td align="center" style="padding-top: 30px; padding-bottom: 30px; padding-top: 30px;">
                            <a href="https://www.youtube.com/@revendedoresloccitaneaubresil" target="_blank"
                               style="text-decoration: none; color: inherit; display: block;">
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td style="width: 203px; vertical-align: middle; text-align: left;">
                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                                <tr>
                                                    <td align="left">
                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/56653d49-cb6b-4ace-b6ae-76b85cfff384/mylinkcom.png?sv=2025-05-05&se=2125-04-01T19%3A58%3A26Z&sr=b&sp=r&sig=k3374eEHWUMy%2FguQj7o5Db7RSkf4YiVgnLEwSbAotmc%3D" style="display: block; margin-bottom: 5px;">
                                                    </td>
                                                    <td align="left">
                                                        <span style="color: #552E0D; font-size: 20px; font-weight: bold;">Fique por dentro</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td align="left" colspan="2">
                                                        <p style="font-size: 14px; color: #552E0D; margin-top: 5px; margin-bottom: 0;">Acompanhe as lives mensais pelo canal do Youtube.</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="padding-left: 40px; vertical-align: middle;">
                                            <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/56653d49-cb6b-4ace-b6ae-76b85cfff384/image18.png?sv=2025-05-05&se=2125-04-01T19%3A58%3A43Z&sr=b&sp=r&sig=O4hpdgqlCAxa6ViAsG9M%2BtfwvTRWLRPLViy%2FRtxOHtI%3D" width="226" height="128" style="border-radius: 10px; display: block;">
                                        </td>
                                    </tr>
                                </table>
                            </a>
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
                                                                    <a href="https://viewer.ipaper.io/loccitane-en-provence/au-bresil-2425/vd/revista-digital/receitas-de-beleza-loccitane-au-bresil-ciclo-04-25/?page=1" style="display: inline-block;">
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
                                                                     <a href="https://viewer.ipaper.io/loccitane-en-provence/au-bresil-2425/vd/revista-digital/receitas-de-beleza-loccitane-au-bresil-ciclo-04-25/?page=1" style="display: inline-block;">
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