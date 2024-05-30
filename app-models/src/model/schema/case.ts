import { Schema } from 'mongoose';

export enum CaseOptions {
    bankName = "bankName",
    city = "city",
    propertyName = "propertyName",
    borrowerName = "borrowerName",
    createdAt = "createdAt",
    modifiedAt = "modifiedAt"
}

export class Case {
    constructor(
        public bankName: string,
        public propertyName: string,
        public borrowerName: string,
        public city: string,
        public createdAt: number,
        public modifiedAt: number,
    ) {
    }

}

const CaseSchema = new Schema<Case>({
    [CaseOptions.bankName]: { type: String, default: '' },
    [CaseOptions.propertyName]: { type: String, default: '' },
    [CaseOptions.borrowerName]: { type: String, default: '' },
    [CaseOptions.city]: { type: String, default: '' },
    [CaseOptions.createdAt]: { type: Number, default: 0 },
    [CaseOptions.modifiedAt]: { type: Number, default: 0 },
});

CaseSchema.loadClass(Case);

export { CaseSchema }