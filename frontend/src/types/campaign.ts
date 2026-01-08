export interface Campaign {
    slug: string
    name: string
    logo: string
    description: string
    banner: string
    banner_portrait: string
    image: string
    banner_form: string
    severity: 'info' | 'warning' | 'danger' | 'success' | 'primary' | 'secondary'
}
