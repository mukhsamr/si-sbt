export default defineAppConfig({
    icon: {
        size: '18',
        customize: (content: string, name: string, prefix: string, provider: string) => {
            return content
                .replace(/stroke-width="[^"]*"/g, `stroke-width="1"`) // Change stroke width to 1
                .replace(/animation-duration="[^"]*"/g, `animation-duration="1s"`) // Change animation duration to 1s (for animated icons)
        },
    }
})