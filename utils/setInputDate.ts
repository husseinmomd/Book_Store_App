export function setInputDate(date?: string | null) {
    if (!date) return;
    return new Date(date.substring(0, 10)).toISOString().substring(0, 10);
  }