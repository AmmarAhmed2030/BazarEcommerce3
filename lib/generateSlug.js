export function generateSlug(title) {
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
  return slug;
}
