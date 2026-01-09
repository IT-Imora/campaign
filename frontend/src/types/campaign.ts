export interface Campaign {
    slug: string
    name: string
    logo: string
    description: string
    banner: string
    banner_portrait: string
    text: string
    image: string
    image_portrait: string
    banner_form: string
    severity: 'info' | 'warning' | 'danger' | 'success' | 'primary' | 'secondary'
}
