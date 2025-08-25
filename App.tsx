
import React, { useState, useCallback, useMemo } from 'react';
import { SignatureData } from './types';
import { INITIAL_SIGNATURE_DATA, SIGNATURE_ICONS } from './constants';
import SignatureForm from './components/SignatureForm';
import SignaturePreview from './components/SignaturePreview';
import { Card } from './components/ui/Card';

function App() {
  const [data, setData] = useState<SignatureData>(INITIAL_SIGNATURE_DATA);

  const handleDataChange = useCallback((changes: Partial<SignatureData>) => {
    setData(prevData => ({ ...prevData, ...changes }));
  }, []);

  const generatedHtml = useMemo(() => {
    const escapeHtml = (unsafe: string): string => {
      if(typeof unsafe !== 'string') return '';
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const createContactRow = (icon: string, content: string) => {
      if (!content || !content.trim()) return '';
      const cleanContent = content.replace(/<a\s/,'<a style="color: #374151; text-decoration: none;" ').replace(/<a\s.*href="http:\/\/undefined"/, '');
      if (cleanContent.includes('href="http://undefined"')) return '';

      return `
        <tr>
          <td width="22" style="padding-bottom: 4px; vertical-align: middle;">
            <img src="${icon}" alt="" width="14" height="14" style="display: block;" />
          </td>
          <td style="padding-bottom: 4px; font-size: ${data.contactFontSize}px; color: #374151; font-family: Arial, sans-serif; vertical-align: middle;">
            ${content}
          </td>
        </tr>
      `;
    };
    
    const logoHtml = data.logoType === 'svg'
      ? data.logoContent
      : `<img src="${escapeHtml(data.logoContent)}" alt="Logo" style="width: ${data.width}px; max-width: ${data.width}px; height: auto; display: block; border: 0;" />`;

    return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Signature Email</title>
</head>
<body style="margin: 0; padding: 0;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px;">
    <tr>
      <td>
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #ffffff; border-radius: 8px; border-collapse: collapse;">
          <!-- Top Padding -->
          <tr><td height="16" style="font-size: 16px; line-height: 16px;">&nbsp;</td></tr>
          <!-- Content -->
          <tr>
            <td style="padding: 0 24px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <!-- Logo -->
                  <td width="${data.width}" style="vertical-align: middle; padding-right: 20px;">
                    ${logoHtml}
                  </td>
                  <!-- Separator -->
                  <td width="1" style="background-color: #005442; font-size: 0; line-height: 0;">&nbsp;</td>
                  <!-- Details -->
                  <td style="vertical-align: middle; padding-left: 20px; font-family: Arial, sans-serif;">
                    <p style="margin: 0; font-size: ${data.nameFontSize}px; font-weight: bold; color: #005442; text-transform: uppercase;">${escapeHtml(data.name)}</p>
                    <p style="margin: 4px 0 10px 0; font-size: ${data.roleFontSize}px; color: #5A6572; font-style: italic;">${escapeHtml(data.role)}</p>
                    <div style="height: 1px; width: 50px; background-color: #005442; margin-bottom: 10px; font-size: 1px; line-height: 1px;">&nbsp;</div>
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                      ${createContactRow(SIGNATURE_ICONS.email, data.email ? `<a href="mailto:${escapeHtml(data.email)}" style="color: #374151; text-decoration: none;">${escapeHtml(data.email)}</a>` : '')}
                      ${createContactRow(SIGNATURE_ICONS.mobile, escapeHtml(data.mobile))}
                      ${createContactRow(SIGNATURE_ICONS.phone, escapeHtml(data.phoneFixe))}
                      ${createContactRow(SIGNATURE_ICONS.website, data.website ? `<a href="https://${escapeHtml(data.website.replace(/^(https?:\/\/)?/,''))}" target="_blank" style="color: #374151; text-decoration: none;">${escapeHtml(data.website)}</a>` : '')}
                      ${createContactRow(SIGNATURE_ICONS.address, escapeHtml(data.address))}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Bottom Padding -->
          <tr><td height="16" style="font-size: 16px; line-height: 16px;">&nbsp;</td></tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }, [data]);

  return (
    <div className="min-h-screen font-sans">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#005442]">
            Générateur de Signature d'Email
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Créez votre signature professionnelle.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <Card>
              <Card.Header>
                <Card.Title>1. Vos informations</Card.Title>
                <Card.Description>Entrez vos détails pour la signature.</Card.Description>
              </Card.Header>
              <Card.Content>
                <SignatureForm data={data} onDataChange={handleDataChange} />
              </Card.Content>
            </Card>
          </div>

          <div className="w-full lg:w-1/2 lg:sticky lg:top-8">
             <Card>
              <Card.Header>
                 <Card.Title>2. Aperçu et Export</Card.Title>
                <Card.Description>Visualisez votre signature et copiez ou téléchargez le code HTML.</Card.Description>
              </Card.Header>
              <Card.Content>
                <SignaturePreview data={data} generatedHtml={generatedHtml} />
              </Card.Content>
            </Card>
          </div>
        </div>

        <footer className="text-center mt-12 py-4 border-t border-gray-200">
            <p className="text-gray-500">copyright © LAPOSTE CI</p>
        </footer>
      </main>
    </div>
  );
}

export default App;