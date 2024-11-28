export default interface compilationResponse
{
    lexical: any[],
    syntactic: any,
    semantic: any,
    errors?: string[],
    warnings?: string[]
}