// Add Google Analytics types
interface Window {
  gtag: (
    command: string,
    action: string,
    params?: {
      [key: string]: any
      method?: string
      content_type?: string
      item_id?: string
      page_path?: string
      send_page_view?: boolean
    },
  ) => void
  dataLayer: any[]
}
