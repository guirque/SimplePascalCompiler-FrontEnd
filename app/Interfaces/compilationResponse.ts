export default interface compilationResponse
{
    lexical: any[],
    syntactic: any,
    semantic: any,
    intermediaryCode?: any,
    errors?: string[],
    warnings?: string[],
    console?: string[]
}