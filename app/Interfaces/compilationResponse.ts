export default interface compilationResponse
{
    lexical: any[],
    syntatic: any,
    semantic: any,
    errors?: string[],
    warnings?: string[]
}