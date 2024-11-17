export interface Criminal {
    id: number;
    name: string;
    gender: string;
    nationality: string;
    dateOfBirth: Date;
    placeOfBirth?: string;
    height?: number;
    colourOfEyes?: string;
    colourOfHair?: string;
    characteristics?: string;
    charges: string;
}

export interface CriminalRegister {
    name: string;
    gender: string;
    nationality: string;
    dateOfBirth: Date;
    placeOfBirth?: string;
    height?: number;
    colourOfEyes?: string;
    colourOfHair?: string;
    characteristics?: string;
    charges: string;
}