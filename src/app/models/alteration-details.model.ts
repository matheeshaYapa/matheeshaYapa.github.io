export interface AlterationDetailsModel {
  dateRequired: Date;
  alterations: Array<AlterationRemarksModel>;
}

export interface AlterationRemarksModel {
  alterationType: string;
  isSelected: boolean;
  remarks: string;
  iddType?: 'activation' | 'deactivation';
  isRoamingSMS?: boolean;
  isRoamingVoice?: boolean;
  simOption?: string;
  simNumber?: string;
  newPackage?: string;
  reason?: string;
}
