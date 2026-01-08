import dayjs from 'dayjs'
import 'dayjs/locale/id'; // Import lokal Bahasa Indonesia
dayjs.locale('id'); // Set bahasa lokal ke Bahasa Indonesia
import relativeTime from 'dayjs/plugin/relativeTime'; // Import plugin relativeTime
dayjs.extend(relativeTime); // Gunakan plugin relativeTime
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export function formatDate(dateString: string, format: string = 'DD MMMM YYYY'): string {
    return dayjs(dateString).format(format)
}