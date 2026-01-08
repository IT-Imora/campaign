export const publicStorage = ( path:string ) => {
    const baseUrl = import.meta.env.VITE_PUBLIC_STORAGE_URL
    return `${baseUrl}${path}`
}