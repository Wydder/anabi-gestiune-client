import * as moment from 'moment';

import { EvaluationCommittee } from './evaluation-committee.model';
import { RecoveryCommittee } from './recovery-committee.model';
import { RecoveryDetailsResponse } from './recovery-details-response.interface';

export class RecoveryDetails {
  actualAmount: number = null;
  actualAmountCurrency: string = '';
  estimatedAmount: number = null;
  estimatedAmountCurrency: string = '';
  recoveryState: string = '';
  evaluationCommittee: EvaluationCommittee;
  recoveryCommittee: RecoveryCommittee;
  lastActivity: moment.Moment;
  personResponsible: string = '';

  constructor(aData?: RecoveryDetailsResponse) {
    if (aData) {
      this.fromJson(aData);
    }
  }

  fromJson(aJson: RecoveryDetailsResponse) {
    this.actualAmount = aJson.actualAmount;
    this.actualAmountCurrency = aJson.actualAmountCurrency;
    this.estimatedAmount = aJson.estimatedAmount;
    this.estimatedAmountCurrency = aJson.estimatedAmountCurrency;
    this.recoveryState = aJson.recoveryState;
    this.evaluationCommittee = new EvaluationCommittee(aJson.evaluationCommittee);
    this.recoveryCommittee = new RecoveryCommittee(aJson.recoveryCommittee);
    this.lastActivity = aJson.lastActivity ? moment(aJson.lastActivity, moment.ISO_8601) : moment();
    this.personResponsible = aJson.personResponsible;
  }

  toJson(): RecoveryDetailsResponse {
    return {
      actualAmount: this.actualAmount,
      actualAmountCurrency: this.actualAmountCurrency,
      estimatedAmount: this.estimatedAmount,
      estimatedAmountCurrency: this.estimatedAmountCurrency,
      recoveryState: this.recoveryState,
      evaluationCommittee: this.evaluationCommittee ? this.evaluationCommittee.toJson() : {},
      recoveryCommittee: this.recoveryCommittee ? this.recoveryCommittee.toJson() : {},
      lastActivity: this.lastActivity ? this.lastActivity.format() : '',
      personResponsible: this.personResponsible,
    } as RecoveryDetailsResponse;
  }
}
