import React, { useState } from 'react';
import { SignatureData } from '../types';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { DownloadIcon } from './icons/DownloadIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { EnvelopeIcon } from './icons/EnvelopeIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { GlobeIcon } from './icons/GlobeIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { MobileIcon } from './icons/MobileIcon';

interface SignaturePreviewProps {
  data: SignatureData;
  generatedHtml: string;
}

const SignaturePreview: React.FC<SignaturePreviewProps> = ({ data, generatedHtml }) => {
  const [copyButtonText, setCopyButtonText] = useState('Copier le HTML');

  const downloadHtmlFile = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.name.replace(/\s+/g, '_').toLowerCase()}_signature.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const copyHtmlToClipboard = async () => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      alert("Impossible de copier automatiquement sur ce navigateur. Veuillez copier manuellement le contenu dans Code HTML généré.");
      return;
    }
    try {
      await navigator.clipboard.writeText(generatedHtml);
      alert("Signature copiée !");
    } catch (err) {
      alert("Échec de la copie : " + err);
    }
  };
  
  const logoElement =
    data.logoType === 'svg' ? (
      <div
        style={{ width: data.width, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: data.logoContent }}
      />
    ) : ( // Assumes 'url'
      <div style={{ width: data.width, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={data.logoContent}
          alt="Logo"
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    );


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Aperçu en direct</h3>
        <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-white min-h-[120px] font-sans">
            {/* Content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '10px' }}>
                {logoElement}
                <div style={{ width: '1px', backgroundColor: '#005442', alignSelf: 'stretch' }} />
                <div style={{ color: '#374151' }}>
                    <p style={{ margin: 0, fontSize: `${data.nameFontSize}px`, fontWeight: 'bold', color: '#005442', textTransform: 'uppercase' }}>{data.name}</p>
                    <p style={{ margin: '4px 0 10px 0', fontSize: `${data.roleFontSize}px`, color: '#5A6572', fontStyle: 'italic' }}>{data.role}</p>
                    <div style={{ height: '1px', width: '50px', backgroundColor: '#005442', marginBottom: '10px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: `${data.contactFontSize}px` }}>
                        {data.email && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <EnvelopeIcon className="w-[14px] h-[14px]" style={{ color: '#005442' }} />
                            <a href={`mailto:${data.email}`} style={{ color: '#374151', textDecoration: 'none' }}>{data.email}</a>
                        </div>}
                        {data.mobile && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MobileIcon className="w-[14px] h-[14px]" style={{ color: '#005442' }} />
                            <span>{data.mobile}</span>
                        </div>}
                         {data.phoneFixe && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <PhoneIcon className="w-[14px] h-[14px]" style={{ color: '#005442' }} />
                            <span>{data.phoneFixe}</span>
                        </div>}
                        {data.website && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <GlobeIcon className="w-[14px] h-[14px]" style={{ color: '#005442' }} />
                            <a href={`http://${data.website}`} target="_blank" rel="noopener noreferrer" style={{ color: '#374151', textDecoration: 'none' }}>{data.website}</a>
                        </div>}
                        {data.address && <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MapPinIcon className="w-[14px] h-[14px]" style={{ color: '#005442' }} />
                            <span>{data.address}</span>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={copyHtmlToClipboard} variant="secondary" className="w-full">
            <ClipboardIcon className="w-5 h-5 mr-2"/>
            {copyButtonText}
        </Button>
        <Button onClick={downloadHtmlFile} variant="primary" className="w-full">
            <DownloadIcon className="w-5 h-5 mr-2"/>
            Télécharger .html
        </Button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Code HTML généré</h3>
        <Textarea
          value={generatedHtml}
          readOnly
          rows={10}
          className="font-mono text-sm w-full bg-gray-900 border-gray-700 text-gray-300"
        />
      </div>
    </div>
  );
};

export default SignaturePreview;