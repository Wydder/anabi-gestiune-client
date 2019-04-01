import * as moment from 'moment';
import { SolutionDetailsResponse } from './solution-details-response.interface';

export class SolutionDetails {
  source: string = '';
  sentOnEmail: boolean = false;
  fileNumber: string = '';
  fileNumberParquet: string = '';
  receivingDate: moment.Moment;
  isDefinitive: boolean = false;
  definitiveDate: moment.Moment;
  sentToAuthoritiesDate: moment.Moment;
  crimeTypeId: number = null;
  legalBasis: string = '';

  constructor(aData?: SolutionDetailsResponse) {
    if (aData) {
      this.fromJson(aData);
    }
  }

  fromJson(aJson: SolutionDetailsResponse) {
    this.source = aJson.source;
    this.sentOnEmail = aJson.sentOnEmail;
    this.fileNumber = aJson.fileNumber;
    this.fileNumberParquet = aJson.fileNumberParquet;
    this.receivingDate = moment(aJson.receivingDate, moment.ISO_8601);
    this.isDefinitive = aJson.isDefinitive;
    this.definitiveDate = moment(aJson.definitiveDate, moment.ISO_8601);
    this.sentToAuthoritiesDate = moment(aJson.sentToAuthoritiesDate, moment.ISO_8601);
    this.crimeTypeId = aJson.crimeTypeId;
    this.legalBasis = aJson.legalBasis;
  }

  toJson(): SolutionDetailsResponse {
    return {
      source: this.source,
      sentOnEmail: this.sentOnEmail,
      fileNumber: this.fileNumber,
      fileNumberParquet: this.fileNumberParquet,
      receivingDate: this.receivingDate ? this.receivingDate.format() : '',
      isDefinitive: this.isDefinitive,
      definitiveDate: this.definitiveDate ? this.definitiveDate.format() : '',
      sentToAuthoritiesDate: this.sentToAuthoritiesDate ? this.sentToAuthoritiesDate.format() : '',
      crimeTypeId: this.crimeTypeId,
      legalBasis: this.legalBasis,
    } as SolutionDetailsResponse;
  }
}
