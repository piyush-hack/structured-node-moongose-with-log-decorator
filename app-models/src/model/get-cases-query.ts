export class GetCasesQuery {

    constructor(
        public city?: string[],
        public from?: number,
        public to?: number,
        public bankName?: string,
        public propertyName?: string,
        public borrowerName?: string
    ) { }

    static fromJSON(getCasesQueryObject: any): GetCasesQuery | null {
        let getCasesQuery: GetCasesQuery | null = null;
        if (getCasesQueryObject) {
            getCasesQuery = new GetCasesQuery();
            getCasesQuery.city = Array.isArray(getCasesQueryObject?.city) ? getCasesQueryObject.city : []
            getCasesQuery.from = getCasesQueryObject.from || 0
            getCasesQuery.to = getCasesQueryObject.to || 0
            getCasesQuery.bankName = getCasesQueryObject.bankName || ''
            getCasesQuery.propertyName = getCasesQueryObject.propertyName || ''
            getCasesQuery.borrowerName = getCasesQueryObject.borrowerName || ''
        }
        return getCasesQuery;
    }
}