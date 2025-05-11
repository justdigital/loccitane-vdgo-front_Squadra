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
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
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
                <table align="center" width="100%" style="max-width: 700px;" cellpadding="0" cellspacing="0" style="background-color: #FFF4F2; overflow: hidden;">
                    <!-- Banner -->
                    <tr>
                        <td align="center">
                            <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/logofundo_vermelho.png?sv=2025-05-05&se=2125-05-06T14%3A26%3A31Z&sr=b&sp=r&sig=hh3Le6KvqbCvfkDZskrFGjxqvR2rgHMFd82rxeyo9hI%3D" alt="Banner" width="98" height="98" style="display: block; max-width: 100%;">

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
                                                    <p>Não se preocupe, você ainda pode fazer parte do meu time de revendedores: <br/>
                                                        <strong>Regularize o seu CPF</strong> o mais breve possível para se cadastrar com sucesso.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Espero você em breve. <br/>
                                                        Até lá!</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="center">
                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/BANNER_CADASTRO_NAO_AUTORIZADO.png?sv=2025-05-05&se=2125-05-06T14%3A24%3A49Z&sr=b&sp=r&sig=hbfObotGG9piMXcudUE5gb7yuooiV2JJzGiskYkjLNA%3D" width="249" height="343" style="display: block; max-width: 100%;">
                                    </td>
                                </tr>
                                <tr class="mobile-only" style="display: none; width: 100%; max-width: 100%;">
                                    <td align="left" style="height: 150px; vertical-align: top;">
                                        <table height="100%" style="width: 330px; border-collapse: collapse;">
                                            <tr>
                                                <td style="vertical-align: top;">
                                                    <p>Olá, {{Nome}}!</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="vertical-align: top; padding-right: 17px;">
                                                    <p>Infelizmente o seu documento não atendeu aos requisitos necessários para aprovação do seu cadastro.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td align="center">
                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/BANNER_CADASTRO_NAO_AUTORIZADO.png?sv=2025-05-05&se=2125-05-06T14%3A24%3A49Z&sr=b&sp=r&sig=hbfObotGG9piMXcudUE5gb7yuooiV2JJzGiskYkjLNA%3D" width="121" height="150" style="display: block; max-width: 100%;">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr class="mobile-only" style="display: none; width: 100%; max-width: 100%;">
                        <td style="width: 95%; padding-left: 50px;" align="left">
                            <p>Não se preocupe, você ainda pode fazer parte do meu time de revendedores: Regularize o seu CPF o mais breve possível para se cadastrar com sucesso.</p>
                        </td>
                    </tr>
                    <tr class="mobile-only" style="display: none; width: 100%; max-width: 100%;">
                        <td style="width: 95%; padding-left: 50px;" align="left">
                            <p>Espero você em breve. <br/>
                                Até lá!</p>
                        </td>
                    </tr>
                    <tr class="mobile-only" style="display: none; width: 100%; max-width: 100%;">
                        <td style="padding-top: 30px">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr style="background-color: #ffffff">
			<td>
				<table align="center" width="100%" style="max-width: 700px;" cellpadding="0" cellspacing="0" style="background-color: #ffffff; overflow: hidden;">
					<!-- Seção de Logos e Links -->
					<tr>
						<td align="center" style="padding: 10px;">
							<table width="100%" cellpadding="0" cellspacing="0">
								<tr class="desktop-only">
									<td align="center" style="padding: 10px; white-space: nowrap;">
                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/LOGO_VD_REVENDA-OFF_WHITE_2_3.png?sv=2025-05-05&se=2125-05-06T14%3A12%3A08Z&sr=b&sp=r&sig=yKbUfmKUx%2Fbicph3352cAUDmBbbQUxR%2BkYaKkZaQ4%2FI%3D" 
                                            alt="Logo" width="90" style="display: inline-block; vertical-align: middle;">
                                        
                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/empressacertificadalogo.png?sv=2025-05-05&se=2125-05-06T14%3A07%3A09Z&sr=b&sp=r&sig=25qnJ6CLX66iCll0vskFTJwbDhtb5suoSwE9JuUEHf0%3D" 
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
                                                                <a href="https://revendedor.loccitaneaubresil.com" style="display: inline-block; text-decoration: none;">
                                                                    <div style="display: flex; align-items: center;">
                                                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/portalReve.png?sv=2025-05-05&se=2125-05-06T14%3A08%3A07Z&sr=b&sp=r&sig=6P4rDjBG2g4FPtOR4RbATA4EDFGOS6EuCgb8CZFZGsw%3D" width="26">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">ESCRITÓRIO<BR>VIRTUAL</span>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <a href="https://viewer.ipaper.io/loccitane-en-provence/au-bresil-2425/vd/revista-digital/receitas-de-beleza-loccitane-au-bresil-ciclo-06-25/" style="display: inline-block; text-decoration: none;">
                                                                    <div style="display: flex; align-items: center;">
																		<img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/revistaDigital.png?sv=2025-05-05&se=2125-05-06T14%3A09%3A01Z&sr=b&sp=r&sig=UEP2PVrB7jUoG7gxCVnp10VaHpo0orhIYFXi6zberO4%3D" width="26">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">REVISTA<BR>DIGITAL</span>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <a href="https://api.whatsapp.com/send?phone=5511975743863" style="display: inline-block; text-decoration: none;">
                                                                    <div style="display: flex; align-items: center;">
                                                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/whatsapp.png?sv=2025-05-05&se=2125-05-06T14%3A09%3A51Z&sr=b&sp=r&sig=IrJCyngz13wGC1W0jBcbPzSdE6%2F3BmeIaCSNqUIYsOc%3D" width="24">
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
                                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/ICON_TIKTOK.png?sv=2025-05-05&se=2125-05-06T14%3A10%3A44Z&sr=b&sp=r&sig=ycHgNgY0%2FbJ9oUvl2v7eSCCBY245tfMz1dSbbjrucF0%3D" width="24">
                                                    </a>
                                                    <a href="https://www.instagram.com/loccitaneaubresil/" style="display: inline-block; padding-left: 10px;">
                                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/ICON_INSTAGRAM.png?sv=2025-05-05&se=2125-05-06T14%3A11%3A26Z&sr=b&sp=r&sig=O3Ndf2wxOw8zzkeIP%2BAInWgYhqWRqAw6j6dxN3LDFhE%3D" width="24">
                                                    </a>
                                                </td>
                                            </tr>

										</table>
									</td>
								</tr>

								<tr class="mobile-only" align="center" style="display: none; width: 100%; max-width: 100%;">
									<td align="center" style="padding: 10px; white-space: nowrap;">
                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/LOGO_VD_REVENDA-OFF_WHITE_2_3.png?sv=2025-05-05&se=2125-05-06T14%3A12%3A08Z&sr=b&sp=r&sig=yKbUfmKUx%2Fbicph3352cAUDmBbbQUxR%2BkYaKkZaQ4%2FI%3D" 
                                            alt="Logo" width="90" style="display: inline-block; vertical-align: middle;">
                                        
                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/empressacertificadalogo.png?sv=2025-05-05&se=2125-05-06T14%3A07%3A09Z&sr=b&sp=r&sig=25qnJ6CLX66iCll0vskFTJwbDhtb5suoSwE9JuUEHf0%3D" 
                                            alt="Certificado" width="43" height="71" 
                                            style="display: inline-block; padding-left: 3px; vertical-align: middle;">
                                    </td>
								</tr>
								<tr class="mobile-only" align="center" style="display: none; width: 100%; max-width: 100%;">
									<td>
										<table>
											<tr>
												<td align="center" style="padding-top: 10px;">
													<table>
                                                        <tr>
                                                            <td align="center">
                                                                <a href="https://revendedor.loccitaneaubresil.com" style="display: inline-block; text-decoration: none;">
                                                                    <div style="display: flex; align-items: center;">
                                                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/portalReve.png?sv=2025-05-05&se=2125-05-06T14%3A08%3A07Z&sr=b&sp=r&sig=6P4rDjBG2g4FPtOR4RbATA4EDFGOS6EuCgb8CZFZGsw%3D" width="26">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">ESCRITÓRIO<BR>VIRTUAL</span>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <a href="https://viewer.ipaper.io/loccitane-en-provence/au-bresil-2425/vd/revista-digital/receitas-de-beleza-loccitane-au-bresil-ciclo-06-25/" style="display: inline-block; text-decoration: none;">
                                                                    <div style="display: flex; align-items: center;">
																		<img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/revistaDigital.png?sv=2025-05-05&se=2125-05-06T14%3A09%3A01Z&sr=b&sp=r&sig=UEP2PVrB7jUoG7gxCVnp10VaHpo0orhIYFXi6zberO4%3D" width="26">
                                                                        <span style="font-size: 11px; text-align: left; font-weight: bold; color: #C02031; margin-left: 5px;">REVISTA<BR>DIGITAL</span>
                                                                    </div>
                                                                </a>
                                                            </td>
                                                            <td align="center" style="padding-left: 30px;">
                                                                <a href="https://api.whatsapp.com/send?phone=5511975743863" style="display: inline-block; text-decoration: none;">
                                                                    <div style="display: flex; align-items: center;">
                                                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/whatsapp.png?sv=2025-05-05&se=2125-05-06T14%3A09%3A51Z&sr=b&sp=r&sig=IrJCyngz13wGC1W0jBcbPzSdE6%2F3BmeIaCSNqUIYsOc%3D" width="24">
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
                                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/ICON_TIKTOK.png?sv=2025-05-05&se=2125-05-06T14%3A10%3A44Z&sr=b&sp=r&sig=ycHgNgY0%2FbJ9oUvl2v7eSCCBY245tfMz1dSbbjrucF0%3D" width="24">
                                                    </a>
                                                    <a href="https://www.instagram.com/loccitaneaubresil/" style="display: inline-block; padding-left: 10px;">
                                                        <img src="https://stbrazilsouthloccitane.blob.core.windows.net/images/ICON_INSTAGRAM.png?sv=2025-05-05&se=2125-05-06T14%3A11%3A26Z&sr=b&sp=r&sig=O3Ndf2wxOw8zzkeIP%2BAInWgYhqWRqAw6j6dxN3LDFhE%3D" width="24">
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