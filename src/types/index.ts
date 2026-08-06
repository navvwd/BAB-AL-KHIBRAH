import { MaterialGrade } from '../data/catalog';
import { ProcessingService } from '../data/services';

export interface RFQFormInput {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  whatsAppNumber?: string;
  country: string;
  deliveryLocation: string;
  materialFamily: string;
  grade: string;
  equivalentGrade?: string;
  form: 'Round bars' | 'Plates' | 'Pipes' | 'Rods' | 'Blocks' | 'Cut pieces' | 'Other requested sections';
  diameter?: string;
  thickness?: string;
  width?: string;
  length?: string;
  quantity: string;
  unit: 'pcs' | 'kgs' | 'tons';
  supplyCondition: string;
  cuttingRequirement: string;
  tolerance?: string;
  certificateRequirement: 'MTC 3.1' | 'Third-Party' | 'None';
  inspectionRequirement?: string;
  requiredDeliveryDate?: string;
  additionalNotes?: string;
  files?: File[];
}

export interface ContactFormInput {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface GraphNode {
  id: string;
  label: string;
  group: 'root' | 'family' | 'grade' | 'form' | 'application';
  size: number;
  color: string;
  summary?: string;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export type { MaterialGrade, ProcessingService };
