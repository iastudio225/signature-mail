import React, { useState } from 'react';
import { SignatureData } from '../types';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { UploadIcon } from './icons/UploadIcon';
import { LinkIcon } from './icons/LinkIcon';

interface LogoUploaderProps {
  logoType: 'svg' | 'url';
  logoContent: string;
  onDataChange: (changes: Partial<SignatureData>) => void;
}

type Tab = 'upload' | 'url';

const TabButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 p-3 text-sm font-medium border-b-2 transition-all duration-200 ${
      isActive
        ? 'border-[#005442] text-[#005442]'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const LogoUploader: React.FC<LogoUploaderProps> = ({ logoType, logoContent, onDataChange }) => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (typeof result === 'string') {
          if (file.type === "image/svg+xml") {
              onDataChange({ logoType: 'svg', logoContent: result });
          } else {
              onDataChange({ logoType: 'url', logoContent: result });
          }
        }
      };
      if (file.type === "image/svg+xml") {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex border-b border-gray-200">
        <TabButton icon={<UploadIcon className="w-5 h-5" />} label="Uploader" isActive={activeTab === 'upload'} onClick={() => setActiveTab('upload')} />
        <TabButton icon={<LinkIcon className="w-5 h-5" />} label="URL" isActive={activeTab === 'url'} onClick={() => setActiveTab('url')} />
      </div>

      <div className="pt-4">
        {activeTab === 'upload' && (
          <div>
            <Label htmlFor="logo-upload">Uploader une image ou un SVG</Label>
            <Input id="logo-upload" type="file" accept="image/*,.svg" onChange={handleFileChange} className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#005442] file:text-white hover:file:bg-[#004a3b]" />
          </div>
        )}
        
        {activeTab === 'url' && (
          <div>
            <Label htmlFor="logo-url">URL de l'image</Label>
            <Input id="logo-url" type="text" value={logoType === 'url' ? logoContent : ''} onChange={(e) => onDataChange({ logoType: 'url', logoContent: e.target.value })} placeholder="https://example.com/logo.png" />
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoUploader;