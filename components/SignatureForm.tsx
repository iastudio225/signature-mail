
import React from 'react';
import { SignatureData } from '../types';
import { Input } from './ui/Input';
import { Label } from './ui/Label';

interface SignatureFormProps {
  data: SignatureData;
  onDataChange: (changes: Partial<SignatureData>) => void;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ data, onDataChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ [e.target.name]: e.target.value });
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    onDataChange({ [e.target.name]: isNaN(value) ? 0 : value });
  };

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="name">Nom complet</Label>
        <Input type="text" id="name" name="name" value={data.name} onChange={handleChange} placeholder="Jean Dupont" />
      </div>
      <div>
        <Label htmlFor="role">Rôle / Fonction</Label>
        <Input type="text" id="role" name="role" value={data.role} onChange={handleChange} placeholder="Développeur Frontend" />
      </div>
       <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" value={data.email} onChange={handleChange} placeholder="jean.dupont@example.com" />
      </div>
      <div>
        <Label htmlFor="mobile">Téléphone mobile</Label>
        <Input type="tel" id="mobile" name="mobile" value={data.mobile} onChange={handleChange} placeholder="06 98 76 54 32" />
      </div>
      <div>
        <Label htmlFor="phoneFixe">Téléphone fixe (optionnel)</Label>
        <Input type="tel" id="phoneFixe" name="phoneFixe" value={data.phoneFixe} onChange={handleChange} placeholder="01 23 45 67 89" />
      </div>
       <div>
        <Label htmlFor="website">Site web</Label>
        <Input type="text" id="website" name="website" value={data.website} onChange={handleChange} placeholder="www.example.com" />
      </div>
       <div>
        <Label htmlFor="address">Adresse</Label>
        <Input type="text" id="address" name="address" value={data.address} onChange={handleChange} placeholder="123 Rue de Paris, 75001 Paris" />
      </div>
      <div>
        <Label htmlFor="width">Largeur du logo (px)</Label>
        <Input type="number" id="width" name="width" value={data.width} onChange={handleNumberChange} min="50" max="400" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
            <Label htmlFor="nameFontSize">Police Nom</Label>
            <Input type="number" id="nameFontSize" name="nameFontSize" value={data.nameFontSize} onChange={handleNumberChange} />
        </div>
        <div>
            <Label htmlFor="roleFontSize">Police Rôle</Label>
            <Input type="number" id="roleFontSize" name="roleFontSize" value={data.roleFontSize} onChange={handleNumberChange} />
        </div>
        <div>
            <Label htmlFor="contactFontSize">Police Contact</Label>
            <Input type="number" id="contactFontSize" name="contactFontSize" value={data.contactFontSize} onChange={handleNumberChange} />
        </div>
      </div>
    </form>
  );
};

export default SignatureForm;