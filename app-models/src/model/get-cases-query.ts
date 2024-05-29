export class GetCasesQuery {

    constructor(
        public city?: string[],
        public start?: number,
        public end?: number,
        public from?: number,
        public to?: number
    ) { }

    static fromJSON(getCasesQueryObject: any): GetCasesQuery | null {
        let getCasesQuery: GetCasesQuery | null = null;
        if (getCasesQueryObject) {
            getCasesQuery = new GetCasesQuery();
            getCasesQuery.city = Array.isArray(getCasesQueryObject?.city) ? getCasesQueryObject.city : []
            getCasesQuery.start = getCasesQueryObject.start || 0
            getCasesQuery.end = getCasesQueryObject.end || 0
            getCasesQuery.from = getCasesQueryObject.from || 0
            getCasesQuery.to = getCasesQueryObject.to || 0
        }
        return getCasesQuery;
    }
}