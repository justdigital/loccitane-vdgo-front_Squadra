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
            <td style="padding-top: 30px"> 
                <table align="center" width="700" cellpadding="0" cellspacing="0" style="background-color: #FFF4F2; overflow: hidden;">
                    <!-- Banner -->
                    <tr>
                        <td align="center">
                            <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/logofundo_vermelho.png?sv=2025-05-05&se=2125-04-02T12%3A59%3A49Z&sr=b&sp=r&sig=c54U3HkGp1qGIWyq%2F1lmnJP6fAWgqLP78Y717ntG%2B6E%3D" alt="Banner" width="98" height="98" style="display: block; max-width: 100%;">

                        </td>
                    </tr>

                    <!-- Texto -->
                    <tr style="background-color: #FFF4F2">
                        <td align="center" style="padding-top: 30px">
                            <p style="font-size: 32px; padding-left: 200px; padding-right: 200px; line-height: 1.2; color: #C02031; "><strong> Seu cadastro não foi aprovado.</strong></p>
                        </td>
                    </tr>


                    <tr>
                        <td align="center" style="padding-top: 30px">
                            <table>
                                <tr class="desktop-only">
                                    <td align="left" style="padding-left: 10px; padding-right: 50px; height: 415px; vertical-align: top;">
                                        <table height="100%" style="width: 330px; border-collapse: collapse;">
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Olá, ${nome}!</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Infelizmente o seu documento não atendeu aos requisitos necessários para aprovação do seu cadastro.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Os principais motivos podem ser:</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>❌ Dados divergentes ou incorretos<br> ❌ Documento ilegível ou cortado<br> ❌ Tipo de documento inválido para cadastro</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Mas não se preocupe! Você pode regularizar sua situação e tentar novamente.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: bottom;">
                                                    <p>Siga o passo a passo para reenviar seu documento:</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="center">
                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/BANNER_CADASTRO_NAO_AUTORIZADO.png?sv=2025-05-05&se=2125-04-02T15%3A02%3A40Z&sr=b&sp=r&sig=R3DfUs7mePje8%2BT2nwnOI98aekbE3KJSkdlgr74F%2B5E%3D" width="249" height="415" style="display: block; max-width: 100%;">
                                    </td>
                                </tr>
                                <tr class="mobile-only">
                                    <td align="left" style="height: 150px; vertical-align: top;">
                                        <table height="100%" style="width: 330px; border-collapse: collapse;">
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Olá, {{Nome}}!</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Infelizmente o seu documento não atendeu aos requisitos necessários para aprovação do seu cadastro.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Os principais motivos podem ser:</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="center">
                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/BANNER_CADASTRO_NAO_AUTORIZADO.png?sv=2025-05-05&se=2125-04-02T15%3A02%3A40Z&sr=b&sp=r&sig=R3DfUs7mePje8%2BT2nwnOI98aekbE3KJSkdlgr74F%2B5E%3D" width="121" height="150" style="display: block; max-width: 100%;">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr class="mobile-only">
                        <td style="width: 330px; padding-left: 125px;" align="left">
                            <p>❌ Dados divergentes ou incorretos<br> ❌ Documento ilegível ou cortado<br> ❌ Tipo de documento inválido para cadastro</p>
                        </td>
                    </tr>
                    <tr class="mobile-only">
                        <td style="width: 330px; padding-left: 125px;" align="left">
                            <p>Mas não se preocupe! Você pode regularizar sua situação e tentar novamente.</p>
                        </td>
                    </tr>
                    <tr class="mobile-only">
                        <td style="width: 330px; padding-left: 125px;" align="left">
                            <p>Siga o passo a passo para reenviar seu documento:</p>
                        </td>
                    </tr>

                    <tr class="desktop-only">
                        <td style="padding-top: 30px">
                            <table>
                                <tr style="padding-top: 20px">
                                    <td align="left" style="padding-left: 35px; width: 25px">
                                        <table width="21" height="19" bgcolor="#C02031" style="border-radius: 50%; text-align: center;">
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/1.png?sv=2025-05-05&se=2125-04-02T15%3A38%3A09Z&sr=b&sp=r&sig=1SM8L%2F6bspNP1ZiQyVJkx4r7gUHJpBgWhhaYAC%2BhLr8%3D" width="10" height="10">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="left">
                                        <span>Clique no botão para acessar a página de cadastro</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-left: 35px; width: 25px">
                                        <table width="21" height="19" bgcolor="#C02031" style="border-radius: 50%; text-align: center;">
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/2.png?sv=2025-05-05&se=2125-04-02T15%3A38%3A25Z&sr=b&sp=r&sig=ONqVhoV09saiETfQ%2BApupejUu2S9hoyy%2BvY7FUbnVAE%3D" width="10" height="10">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="left">
                                        <span>Escolha um documento oficial válido (RG ou CNH)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-left: 35px; width: 25px">
                                        <table width="21" height="19" bgcolor="#C02031" style="border-radius: 50%; text-align: center;">
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/3.png?sv=2025-05-05&se=2125-04-02T15%3A38%3A36Z&sr=b&sp=r&sig=JqkFQUG4zG8JKtoQYHrcBbxekdLmrFNAptHo7VyPN88%3D" width="10" height="10">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="left">
                                        <span>Garanta que a foto esteja legível, sem cortes ou reflexos</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-left: 35px; width: 25px">
                                        <table width="21" height="19" bgcolor="#C02031" style="border-radius: 50%; text-align: center;">
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/4.png?sv=2025-05-05&se=2125-04-02T15%3A38%3A46Z&sr=b&sp=r&sig=EH36%2BUP8Fk5zQ4%2BO5UKxMYF6YjBG7oPGWJgdEPXYHiI%3D" width="10" height="10">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="left">
                                        <span>Envie o documento atualizado</span>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr class="mobile-only">
                        <td style="padding-top: 30px">
                            <table>
                                <tr style="padding-top: 20px">
                                    <td align="left" style="padding-left: 125px; width: 25px">
                                        <table width="21" height="19" bgcolor="#C02031" style="border-radius: 50%; text-align: center;">
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/1.png?sv=2025-05-05&se=2125-04-02T15%3A38%3A09Z&sr=b&sp=r&sig=1SM8L%2F6bspNP1ZiQyVJkx4r7gUHJpBgWhhaYAC%2BhLr8%3D" width="10" height="10">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="left">
                                        <span>Clique no botão para acessar a página de cadastro</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-left: 125px; width: 25px">
                                        <table width="21" height="19" bgcolor="#C02031" style="border-radius: 50%; text-align: center;">
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/2.png?sv=2025-05-05&se=2125-04-02T15%3A38%3A25Z&sr=b&sp=r&sig=ONqVhoV09saiETfQ%2BApupejUu2S9hoyy%2BvY7FUbnVAE%3D" width="10" height="10">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="left">
                                        <span>Escolha um documento oficial válido (RG ou CNH)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-left: 125px; width: 25px">
                                        <table width="21" height="19" bgcolor="#C02031" style="border-radius: 50%; text-align: center;">
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/3.png?sv=2025-05-05&se=2125-04-02T15%3A38%3A36Z&sr=b&sp=r&sig=JqkFQUG4zG8JKtoQYHrcBbxekdLmrFNAptHo7VyPN88%3D" width="10" height="10">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="left">
                                        <span>Garanta que a foto esteja legível, sem cortes ou reflexos</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="left" style="padding-left: 125px; width: 25px">
                                        <table width="21" height="19" bgcolor="#C02031" style="border-radius: 50%; text-align: center;">
                                            <tr>
                                                <td align="center" valign="middle">
                                                    <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/4.png?sv=2025-05-05&se=2125-04-02T15%3A38%3A46Z&sr=b&sp=r&sig=EH36%2BUP8Fk5zQ4%2BO5UKxMYF6YjBG7oPGWJgdEPXYHiI%3D" width="10" height="10">
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="left">
                                        <span>Envie o documento atualizado</span>
                                    </td>
                                </tr>
                            </table>

                        </td>
                    </tr>

                    <tr style="background-color: #FFF4F2" class="desktop-only">
                        <td align="center" style="padding-top: 30px">
                            <p style="font-size: 16px; padding-left: 50px; padding-right: 50px;">Reenvie agora e finalize seu cadastro! Estamos esperando por você.<span style="color: red">❤<span></p>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-left: 50px; padding-right: 50px;">
                            <a href="https://revendedor.loccitaneaubresil.com/#!/" target="_blank"
                               style="text-decoration: none; color: inherit; display: block; padding-top:20px;padding-bottom:40px">
                                <table width="232" height="49" cellpadding="0" cellspacing="0" border="0"
                                       style="background-color: #C02031; color: #ffffff; text-align: center; height: 59px;">
                                    <tr>
                                        <td align="center" valign="middle" style="font-size: 16px; line-height: 1.1;">
                                            Quero me cadastrar
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
                                                                <a href="https://revendedor.loccitaneaubresil.com" style="display: inline-block;">
                                                                    <div style="display: flex; align-items: center;">
                                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/portalReve.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=3joXVZogSKiQtBQ0NfCKZygjIZG4Ts1pYEJUqxbxnVw%3D" width="26">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">ESCRITÓRIO<BR>VIRTUAL</span>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <a href="https://viewer.ipaper.io/loccitane-en-provence/au-bresil-2425/vd/revista-digital/receitas-de-beleza-loccitane-au-bresil-ciclo-05-25/" style="display: inline-block;">
                                                                    <div style="display: flex; align-items: center;">
																		<img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/revistaDigital.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=1X7ZQKEhxhITVw3cXRS6uK%2F1Dcyn9m3nsvkIiZdCU10%3D" width="26">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">REVISTA<BR>DIGITAL</span>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <a href="https://api.whatsapp.com/send?phone=5511975743863" style="display: inline-block;">
                                                                    <div style="display: flex; align-items: center;">
                                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/whatsapp.png?sv=2025-05-05&se=2125-03-27T14%3A23%3A53Z&sr=b&sp=r&sig=0ay2iUshuemzFG0XH7%2Bg1hvYAskRX9N8TTZzesxFP7k%3D" width="24">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">FALE<BR>CONOSCO</span>
                                                                    </div>
                                                                </a>
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
                                                                <a href="https://revendedor.loccitaneaubresil.com" style="display: inline-block;">
                                                                    <div style="display: flex; align-items: center;">
                                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/portalReve.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=3joXVZogSKiQtBQ0NfCKZygjIZG4Ts1pYEJUqxbxnVw%3D" width="26">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">ESCRITÓRIO<BR>VIRTUAL</span>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <a href="https://viewer.ipaper.io/loccitane-en-provence/au-bresil-2425/vd/revista-digital/receitas-de-beleza-loccitane-au-bresil-ciclo-05-25/" style="display: inline-block;">
                                                                    <div style="display: flex; align-items: center;">
																		<img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/revistaDigital.png?sv=2025-05-05&se=2125-03-27T18%3A45%3A16Z&sr=b&sp=r&sig=1X7ZQKEhxhITVw3cXRS6uK%2F1Dcyn9m3nsvkIiZdCU10%3D" width="26">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">REVISTA<BR>DIGITAL</span>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <a href="https://api.whatsapp.com/send?phone=5511975743863" style="display: inline-block;">
                                                                    <div style="display: flex; align-items: center;">
                                                                        <img src="https://bsnonprodvdgobrsa.blob.core.windows.net/uploads/Imagens/whatsapp.png?sv=2025-05-05&se=2125-03-27T14%3A23%3A53Z&sr=b&sp=r&sig=0ay2iUshuemzFG0XH7%2Bg1hvYAskRX9N8TTZzesxFP7k%3D" width="24">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">FALE<BR>CONOSCO</span>
                                                                    </div>
                                                                </a>
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