export class SlugUtils {
  /**
   * Generate a URL-friendly slug from a title
   * @param title - The title to convert to slug
   * @returns The generated slug
   */
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      // Replace special characters and spaces with hyphens
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s-]+/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '');
  }

  /**
   * Generate a unique slug by appending a random suffix if needed
   * @param title - The title to convert to slug
   * @returns The generated unique slug
   */
  static generateUniqueSlug(title: string): string {
    const baseSlug = this.generateSlug(title);

    // Add random suffix to make it unique
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    return `${baseSlug}-${randomSuffix}`;
  }
}
